<style lang="less" scoped>
.model-right {
  width: 700px;
}
.check {
  text-align: center;
  cursor: pointer;
}
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
        <TableItem title="作业" prop="name" :width="200">></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="作业总分" prop="total"></TableItem>
        <TableItem title="截止日期" prop="end"></TableItem>
        <TableItem title="完成人数" prop="percent"></TableItem>
        <TableItem title="操作" :width="200">
          <template slot-scope="{data}">
            <Button noBorder transparent text-color="primary" size="xs" :disabled="disabled" @click="create(data)">上传作业</Button>
            <Button noBorder transparent text-color="primary" size="xs" :disabled="disabled" @click="remove(data)">删除</Button>
          </template>
        </TableItem>
        <div slot="empty">暂时无数据</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">上传作业</div>
      <Form ref="form" labelPosition="left">
        <div class="">选择学生</div>
        <br/>
        <Row :space="10" v-for="sub in radio.array" :key="sub.key">
          <Cell :width='4' v-for="it in sub.list" :key="it.id" :value="it">
            <div @click="select(it)" class="item">
              <Radio v-model="radio.value" :value="it" class="check" :style="{color: it.color}">{{it.name}}</Radio>
            </div>
          </Cell>
        </Row>
        <br/>
        <Qiniu :options="upload.options" type="image" data-type="url" v-model="upload.file" v-show="radio.value"></Qiniu>
        <br/>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">提 交</Button>
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
      modal: {},
      radio: {
        array: [],
        value: null,
        old: null,
      },
      upload: {
        options: {
          max_file_size: '1mb'
        },
        file: null
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
    select(it) {
      if (this.radio.old) {
        this.radio.old.color = '#666666';
      }

      it.color = '#00C15E';
      this.radio.old = it;
    },
    init() {
      Ajax.get('/work/page', {
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
        e.percent = e.stuSubmit + ' / ' + e.stuAmount;
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    changeYear() {
      this.clss = Utils.getClss(this.year.now);
      this.step.now = 0;
    },
    changeStep() {
      this.$route.params.idStudent = null;
      this.init();
    },
    changeClss() {
      this.$route.params.idStudent = null;
      this.init();
    },
    create(data) {
      this.radio.value = null;
      this.upload.file = null;

      this.modal.data = data;
      this.opened = true;

      Ajax.get('/student/list', {
        idYear: this.year.now,
        idClass: data.idClass
      }).then(resp => {
        if (resp.ok) {
          this.setArray(resp.body);
        }
      });
    },
    save() {
      this.modal.loading = true;

      Ajax.post('/stu/work/create', {
        semester: this.step.now,
        product: this.upload.file,
        idWork: this.modal.data.id,
        idStudent: this.radio.value.id,
        exWork: this.modal.data.name,
        exStudent: this.radio.value.name,
        idClass: this.modal.data.idClass
      }).then(resp => {
        this.loading = false;
        this.opened = false;
        if (resp.ok) {
          HeyUI.$Message.success('上传成功');
          this.init();
        }
      });
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/work/delete', {
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
    setArray(body) {
      let list = [];
      for (let i = 0; i < body.length; i += 6) {
        let sub = [];
        for (let j = i; j < i + 6 && j < body.length; j++) {
          let e = body[j];
          e.color = '#666666';
          sub.push(e);
        }
        list.push({
          key: 'k' + i,
          list: sub
        });
      }
      this.radio.array = list;
    },
  }
};
</script>
