<style lang="less" scoped>
.top {
  margin-top: 16px;
}
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Row type="flex" :space="20">
        <Cell :width='4'>
          <Select v-model="year.now" :datas="year.selects" :deletable="false" disabled></Select>
        </Cell>
        <Cell :width='4'>
          <Select v-model="step.now" :datas="step.selects" :deletable="false" disabled></Select>
        </Cell>
        <Cell :width='4'>
          <Select v-model="clss.now" :datas="clss.selects" :deletable="false" placeholder="选择班级"></Select>
        </Cell>
        <Cell :flex='1'>
          <Button :disabled="clss.now == 0" color="primary" circle size="l" @click="search">搜索</Button>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Table :datas="table.datas">
        <TableItem title="序号" prop="serial" :width="140"></TableItem>
        <TableItem title="学生" prop="exStudent"></TableItem>
        <TableItem title="教室" prop="room"></TableItem>
        <TableItem title="小组号" prop="group"></TableItem>
        <TableItem title="座位号" prop="index"></TableItem>
        <div slot="empty">{{searched ? '无数据' : '未搜索'}}</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="search"></Pagination>
    </div>
  </div>
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
        name: '',
      },
      searched: false,
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);
  },
  methods: {
    search() {
      this.searched = true;

      let room = null;
      let body = null;
      Ajax.get('/room/read', {
        semester: this.step.now,
        idClass: this.clss.now,
      }).then(resp => {
        if (resp.ok) {
          room = resp.body.name;
          if (body && room) {
            this.setTable(body, room);
          }
        }
      });

      Ajax.get('/seat/page', {
        semester: this.step.now,
        idClass: this.clss.now,
        page: this.table.pagination.page - 1
      }).then(resp => {
        if (resp.ok) {
          body = resp.body;
          if (body && room) {
            this.setTable(body, room);
          }
        }
      });
    },
    setTable(body, room) {
      let first = this.table.pagination.size * (this.table.pagination.page - 1);
      body.content.forEach((e, idx) => {
        e.serial = idx + first + 1;
        e.room = room;
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
  }
};
</script>
