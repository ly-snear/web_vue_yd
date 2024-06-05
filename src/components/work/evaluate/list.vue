<style lang="less" scoped>
.cert-image {
  margin-top: 20px;
}
.model-right {
  width: 600px;
}
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Row type="flex" :space="20">
        <Cell :width='4'>
          <Select v-model="year.now" :datas="year.selects" @change="changeYear" :deletable="false"></Select>
        </Cell>
        <!-- <Cell :width='4'>
          <Select v-model="step.now" :datas="step.selects" @change="changeStep" placeholder="选择学期"></Select>
        </Cell> -->
        <Cell :width='4'>
          <Select v-model="clss.now" :datas="clss.selects" @change="changeClss" placeholder="选择班级"></Select>
        </Cell>
        <Cell :width='4'>
          <input type="text" v-model="name" placeholder="输入学生"/>
        </Cell>
        <Cell :flex='1'>
          <Button color="primary" circle size="l" @click="init">搜索</Button>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel">
    <div class="h-panel-body">
      <Table :datas="table.datas">
        <TableItem title="学生" prop="name" :width="140"></TableItem>
        <TableItem title="班级" prop="class" :width="180"></TableItem>
        <TableItem title="综合评价" prop="eval"></TableItem>
        <TableItem title="操作" :width="260">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="update(data)">修改</Button>
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="remove(data)">删除</Button>
          </template>
        </TableItem>
        <div slot="empty">{{searched ? '无数据' : '未搜索'}}</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">修改评语</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="姓名" readonly>
          {{form.name}}
        </FormItem>
        <FormItem label="修改评价" class="eval-radio">
          <textarea v-autosize rows="4" placeholder="输入评价" v-model="form.eval"></textarea>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">选 择</Button>
          <Button circle @click="opened = false">取 消</Button>
        </FormItem>
      </Form>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
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
      opened: false,
      loading: false,
      searched: false,
      name: null,
      form: {},
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

    let str = Utils.getCookie('quicks');
    if (str) {
      let quicks = JSON.parse(str);
      quicks.forEach(e => {
        this.selects.push(e);
      });
    }

    this.init();
  },
  methods: {
    init() {
      this.searched = true;
      Ajax.get('/student/page', {
        page: this.table.pagination.page - 1,
        idYear: this.year.now,
        idClass: this.clss.now,
        name: this.name
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      body.content.forEach(e => {
        e.class = Utils.getNameClss(e.idClass);
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    changeYear() {
      this.clss = Utils.getClss(this.year.now);
      this.step.now = 0;
    },
    changeStep() {
      this.table.pagination.page = 1;
      this.init();
    },
    changeClss() {
      this.table.pagination.page = 1;
      this.init();
    },
    update(data) {
      this.opened = true;
      this.form = Utils.copy(data);
    },
    save() {
      Utils.confirm(this, '确定修改该记录 ？', modal => {
        this.loading = true;
        modal.close();

        let idStudent = [this.form.id];
        Ajax.post('/student/eval/create', {
          eval: this.form.eval,
          idStudentList: idStudent.join(),
        }).then(resp => {
          this.opened = false;
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('修改成功');
            this.init();
          }
        });
      });
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/student/eval/delete', {
          id: data.id
        }).then(resp => {
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.init();
          }
        });
      });
    },
  }
};
</script>
