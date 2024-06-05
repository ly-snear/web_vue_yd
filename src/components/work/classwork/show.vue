<style lang="less" scoped>
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Row :space="20">
        <Cell :width='4'>
          <Select v-model="year.now" :datas="year.selects" @change="changeYear" :deletable="false"></Select>
        </Cell>
        <Cell :width='4'>
          <Select v-model="step.now" :datas="step.selects" @change="changeStep" placeholder="选择学期"></Select>
        </Cell>
        <Cell :width='4'>
          <Select v-model="clss.now" :datas="clss.selects" @change="changeClss" placeholder="选择班级"></Select>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel">
    <div class="h-panel-body">
      <Table :datas="table.datas">
        <TableItem title="学生" prop="exStudent" :width="100"></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="作业名称" prop="exWork"></TableItem>
        <TableItem title="完成时间" prop="created"></TableItem>
        <TableItem title="作品" :width="160">
          <template slot-scope="{data}">
            <ImagePreview :distance="0" :datas="data.product" @click="preview"/>
          </template>
        </TableItem>
        <!-- <TableItem title="批改" :width="160">
          <template slot-scope="{data}">
            <ImagePreview :distance="0" :datas="data.correct" @click="preview"/>
          </template>
        </TableItem> -->
        <TableItem title="评语" prop="comment"></TableItem>
        <TableItem title="得分" prop="score"></TableItem>
        <TableItem title="操作" :width="200">
          <template slot-scope="{data}">
            <Button noBorder transparent text-color="primary" size="xs" @click="update(data)" :disabled="disabled">批改</Button>
          </template>
        </TableItem>
        <div slot="empty">暂时无数据</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
    </div>
  </div>
  <Modal v-model="modal.opened" type="drawer-right">
    <div class="model-right">
      <div class="title">批改作业</div>
      <Form ref="form" labelPosition="left" :model="form" :rules="form.rules" showErrorTip>
        <FormItem label="学生" readonly>
          {{modal.data.exStudent}}
        </FormItem>
        <FormItem label="得分" prop="score">
          <input type="text" v-model="form.score"/>
        </FormItem>
        <FormItem label="评语" prop="comment">
          <textarea v-autosize rows="4" placeholder="输入内容" v-model="form.comment"></textarea>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="modal.loading">提 交</Button>
          <Button circle @click="modal.opened = false">取 消</Button>
        </FormItem>
      </Form>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  data () {
    return {
      year: {
        selects: [],
        now: 0
      },
      step: {
        selects: [],
        now: 0
      },
      clss: {
        selects: [],
        now: 0
      },
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        datas: [],
      },
      modal: {
        opened: false,
        loading: false,
        data: {},
      },
      form: {
        rules: {
          number: ['score'],
          required: ['score', 'comment']
        },
        score: null,
        comment: null,
      },
      disabled: false,
    };
  },
  created() {
    if (G.get('user').level > 100) {
      this.disabled = true;
    }

    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/stu/work/page', {
        page: this.table.pagination.page - 1,
        semester: this.step.now,
        idYear: this.year.now,
        idClass: this.clss.now,
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      body.content.forEach(e => {
        e.class = Utils.getNameClss(e.idClass);
        e.serial = '第 ' + e.serial + ' 节';

        if (e.value == 0) {
          e.value = '出勤';
          e.name = '全员';
        } else {
          e.value = e.value == 1 ? '请假' : (e.value == 2 ? '迟到' : '旷课');
        }
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    changeYear() {
      this.clss = Utils.getClss(this.year.now);
      this.step.now = 0;
    },
    changeStep() {
      this.init();
    },
    changeClss() {
      this.init();
    },
    remove(data) {
      this.modal.id = data.id;
      this.modal.opened = true;
    },
    confirm() {
      Ajax.post('/stu/work/delete', {
        id: this.modal.data.id,
      }).then(resp => {
        this.modal.opened = false;
        if (resp.ok) {
          HeyUI.$Message.success('删除成功');
          this.init();
        }
      });
    },
    preview(data) {
      this.$ImagePreview(data);
    },
    update(data) {
      this.modal.data = data;
      this.modal.opened = true;
    },
    save() {
      let ok = this.$refs.form.valid();
      if (!ok) return;

      Ajax.post('/stu/work/update', {
        id: this.modal.data.id,
        score: this.form.score,
        comment: this.form.comment
      }).then(resp => {
        this.modal.opened = false;
        if (resp.ok) {
          HeyUI.$Message.success('更新成功');
          this.init();
        }
      });
    },
  }
};
</script>
