<style lang="less" scoped>
p > span {
  font-weight: bold;
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
        <TableItem title="学生" prop="name" :width="200"></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="回答问题">
          <template slot-scope="{data}">
            <p>错误 <span class="red-color">{{data.classroomType1[0]}} 次</span></p>
            <p>正确 <span class="green-color">{{data.classroomType1[1]}} 次</span></p>
          </template>
        </TableItem>
        <TableItem title="小组活动">
          <template slot-scope="{data}">
            <p>未参加 <span class="red-color">{{data.classroomType2[0]}} 次</span></p>
            <p>代表发言 <span class="yellow-color">{{data.classroomType2[1]}} 次</span></p>
            <p>优秀集体 <span class="green-color">{{data.classroomType2[2]}} 次</span></p>
          </template>
        </TableItem>
        <TableItem title="课堂作品">
          <template slot-scope="{data}">
            <p>未提交 <span class="red-color">{{data.classroomType3[0]}} 次</span></p>
            <p>按时提交 <span class="yellow-color">{{data.classroomType3[1]}} 次</span></p>
            <p>优秀作品 <span class="green-color">{{data.classroomType3[2]}} 次</span></p>
          </template>
        </TableItem>
        <TableItem title="课堂表现">
          <template slot-scope="{data}">
            <p>待努力 <span class="red-color">{{data.classroomType4[0]}} 次</span></p>
            <p>良好 <span class="yellow-color">{{data.classroomType4[1]}} 次</span></p>
            <p>优秀 <span class="green-color">{{data.classroomType4[2]}} 次</span></p>
          </template>
        </TableItem>
        <TableItem title="综合得分" prop="score"></TableItem>
        <TableItem title="操作" :width="160">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border @click="show(data)">查看</Button>
          </template>
        </TableItem>
        <div slot="empty">暂时无数据</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
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
          size: 5,
          total: 0
        },
        datas: [],
      },
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/stu/room/page/participate', {
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
        e.score = 8;
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
    show(data) {
      this.$router.push({ name: 'ParticipateList', params: { idStudent: data.id }});
    },
  }
};
</script>
