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
        <TableItem title="学生" prop="name" :width="200" treeOpener></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="日期" prop="created"></TableItem>
        <TableItem title="课次" prop="serial"></TableItem>
        <TableItem title="考勤" prop="value"></TableItem>
        <TableItem title="操作" :width="200">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border :disabled="!data.id" @click="remove(data)">删除</Button>
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
      loading: false,
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
      Ajax.get('/stu/room/page', {
        page: this.table.pagination.page - 1,
        semester: this.step.now,
        idYear: this.year.now,
        idClass: this.clss.now,
        what: 'attendance',
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      let ids = [];

      body.content.forEach(e => {
        e.class = Utils.getNameClss(e.idClass);
        e.serial = '第 ' + e.serial + ' 节';

        if (e.value == 0) {
          e.value = '出勤';
          e.name = '全员';

          let idx = ids.findIndex(ii => {
            return ii == e.idClass;
          });
          if (idx < 0) {
            ids.push(e.idClass);
            e.children = [];
          }
        } else {
          e.value = e.value == 1 ? '请假' : (e.value == 2 ? '迟到' : '旷课');
        }
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;

      ids.forEach(id => {
        Ajax.get('/student/list', {
          idYear: this.year.now,
          idClass: id,
        }).then(resp => {
          if (resp.ok) {
            this.table.datas.forEach(e => {
              if (e.name == '全员') {
                let children = [];
                resp.body.forEach(f => {
                  children.push({
                    name: f.name,
                    class: e.class,
                    created: e.created,
                    serial: e.serial,
                    value: e.value,
                    id: null
                  });
                });
                e.children = children;
              }
            });
          }
        });
      });
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
