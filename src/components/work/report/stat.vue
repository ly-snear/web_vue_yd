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
        <Cell :width='4'>
          <Select v-model="step.now" :datas="step.selects" @change="changeStep" placeholder="选择学期"></Select>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel">
    <div class="h-panel-body">
      <Table :datas="table.datas">
        <TableItem title="学生" prop="name" :width="140"></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="基础指标" prop="basic"></TableItem>
        <TableItem title="学业指标" prop="study"></TableItem>
        <TableItem title="发展指标" prop="devop"></TableItem>
        <TableItem title="综合得分" prop="score"></TableItem>
        <TableItem title="操作" :width="260">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border @click="open(data)">查看报告</Button>
          </template>
        </TableItem>
        <div slot="empty">无数据</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">{{modal.class}}</div>
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
      table: {
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        datas: [],
      },
      opened: false,
      modal: {},
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);

    //this.init();
  },
  methods: {
    init() {
      Ajax.get('/report/stat', {
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
    open(data) {
      this.modal = data;
      this.opened = true;
    },
  }
};
</script>
