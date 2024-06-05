<style lang="less" scoped>
.cert-image {
  margin-top: 20px;
}
.model-right {
  width: 500px;
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
        <Cell :width='4'>
          <Select v-model="clss.now" :datas="clss.selects" @change="changeClss" placeholder="选择班级"></Select>
        </Cell>
        <Cell :width='4'>
          <input type="text" v-model="exStudent" placeholder="输入学生"/>
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
        <TableItem title="学生" prop="exStudent" :width="140">></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="日期" prop="created"></TableItem>
        <TableItem title="试卷" prop="paper"></TableItem>
        <TableItem title="成绩" prop="score"></TableItem>
        <TableItem title="评语" prop="comment"></TableItem>
        <TableItem title="操作" :width="260">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="remove(data)">删除</Button>
          </template>
        </TableItem>
        <div slot="empty">{{searched ? '无数据' : '未搜索'}}</div>
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
      exStudent: null,
      searched: false,
      papers: [],
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

    Ajax.get('/paper/list', {
    }).then(resp => {
      if (resp.ok) {
        this.papers = resp.body;
        this.init();
      }
    });
  },
  methods: {
    init() {
      this.searched = true;
      Ajax.get('/stu/paper/page', {
        page: this.exStudent ? 0 : this.table.pagination.page - 1,
        semester: this.step.now,
        idYear: this.year.now,
        idClass: this.clss.now,
        exStudent: this.exStudent
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      body.content.forEach(e => {
        e.class = Utils.getNameClss(e.idClass);
        e.created = e.created.substr(0, 10);
        this.papers.forEach(f => {
          if (e.idPaper == f.id) {
            e.paper = f.name;
          }
        });
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    changeYear() {
      this.step.now = 0;
      this.clss = Utils.getClss(this.year.now);
    },
    changeStep() {
      this.table.pagination.page = 1;
      this.init();
    },
    changeClss() {
      this.table.pagination.page = 1;
      this.init();
    },
    score(data) {
      this.open.score = true;
      this.form = data;
    },
    update(data) {
      this.open.update = true;
      this.form = data;
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/stu/paper/delete', {
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
