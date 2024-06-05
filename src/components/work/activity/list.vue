<style lang="less" scoped>
.icon {
  font-size: 20px;
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
        <TableItem title="活动类型" prop="type"></TableItem>
        <TableItem title="课时数" prop="hour"></TableItem>
        <TableItem title="状态">
          <template slot-scope="{data}">
            <span class="h-tag h-tag-bg-gray" v-if="data.valid == 0">待审核</span>
            <span class="h-tag h-tag-bg-yellow" v-if="data.valid == 1">不通过</span>
            <span class="h-tag h-tag-bg-primary" v-if="data.valid == 2">已审核</span>
          </template>
        </TableItem>
        <TableItem title="得分" prop="score"></TableItem>
        <TableItem title="操作" :width="260">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="score(data)">打分</Button>
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
  <Modal v-model="open.score" type="drawer-right">
    <div class="model-right">
      <div class="title">手动打分</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="姓名" readonly>
          {{form.exStudent}}
        </FormItem>
        <FormItem label="活动" readonly>
          {{form.name}}
        </FormItem>
        <FormItem label="得分" prop="score">
          <input type="number" v-model="form.score" placeholder="请输入分数"/>
        </FormItem>
        <FormItem label="评语" prop="comment">
          <input type="text" v-model="form.comment" placeholder="请输入评语"/>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
          <Button circle @click="open.score = false">取 消</Button>
        </FormItem>
      </Form>
    </div>
  </Modal>
  <Modal v-model="open.update" type="drawer-right">
    <div class="model-right">
      <div class="title">修改/审核</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="姓名" readonly>
          {{form.exStudent}}
        </FormItem>
        <FormItem label="班级" readonly>
          {{form.class}}
        </FormItem>
        <FormItem label="活动名称" prop="name">
          <input type="text" v-model="form.name" placeholder="输入名称"/>
        </FormItem>
        <FormItem label="参加日期" prop="created">
          <DatePicker format="YYYY-MM-DD" v-model="form.created"></DatePicker>
        </FormItem>
        <FormItem label="课时数" prop="hour">
          <input type="number" v-model="form.hour"/>
        </FormItem>
        <FormItem label="审核状态" prop="valid">
          <Radio v-model="form.valid" :datas="radios"></Radio>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
          <Button circle @click="open.update = false">取 消</Button>
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
      loading: false,
      searched: false,
      exStudent: null,
      open: {
        score: false,
        update: false,
      },
      form: {},
      radios: [
        { title: '待审核', key: '0' },
        { title: '不通过', key: '1' },
        { title: '已审核', key: '2' },
      ],
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
      this.searched = true;
      Ajax.get('/stu/action/page', {
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
        e.valid = e.valid ? e.valid : 0;
        e.created = e.created.substr(0, 10);
        switch (e.type) {
          case 11:
            e.type = '校外学习 / 艺术学习';
            break;
          case 12:
            e.type = '校外学习 / 艺术实践';
            break;
          case 21:
            e.type = '课外活动 / 兴趣小组';
            break;
          case 22:
            e.type = '课外活动 / 社团活动';
            break;
          case 23:
            e.type = '课外活动 / 其他活动';
            break;
          default:
            break;
        }
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
      this.form = Utils.copy(data);
    },
    update(data) {
      this.open.update = true;
      this.form = Utils.copy(data);
    },
    save() {
      Utils.confirm(this, '确定修改该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/stu/action/update', {
          id: this.form.id,
          name: this.form.name,
          created: Utils.getStamp(this.form.created),
          hour: this.form.hour,
          score: this.form.score,
          comment: this.form.comment,
          valid: this.form.valid,
        }).then(resp => {
          this.open.score = false;
          this.open.update = false;
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

        Ajax.post('/stu/action/delete', {
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
