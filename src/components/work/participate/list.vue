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
        <TableItem title="学生" prop="name" :width="200">></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="日期" prop="created"></TableItem>
        <TableItem title="课次" prop="serial"></TableItem>
        <TableItem title="参与度">
          <template slot-scope="{data}">
            <span style="margin-right: 10px;">{{data.type}}:
              <span :class="data.color">{{data.value}}</span>
            </span>
          </template>
        </TableItem>
        <TableItem title="操作" :width="200">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="remove(data)">删除</Button>
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
          size: 10,
          total: 0
        },
        datas: [],
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
      Ajax.get('/stu/room/page', {
        page: this.table.pagination.page - 1,
        semester: this.step.now,
        idYear: this.year.now,
        idClass: this.clss.now,
        idStudent: this.$route.params.idStudent,
        what: 'participate',
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      body.content.forEach(e => {
        e.class = Utils.getNameClss(e.idClass);
        e.color = e.value > 0 ? 'green-color' : 'red-color';
        e.serial = '第 ' + e.serial + ' 节';

        switch (e.type) {
          case 1:
            e.type = '回答问题';
            e.value = e.value == 0 ? '错误' : '正确';
            break;
          case 2:
            e.type = '小组活动';
            e.value = e.value == 0 ? '未参加' : (e.value == 1 ? '代表发言' : '优秀集体');
            break;
          case 3:
            e.type = '课堂作品';
            e.value = e.value == 0 ? '未提交' : (e.value == 1 ? '按时提交' : '优秀作品');
            break;
          case 4:
            e.type = '课堂表现';
            e.value = e.value == 0 ? '待努力' : (e.value == 1 ? '良好' : '优秀');
            break;
          default:
            break;
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
      this.$route.params.idStudent = null;
      this.init();
    },
    changeClss() {
      this.$route.params.idStudent = null;
      this.init();
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/stu/room/delete', {
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
