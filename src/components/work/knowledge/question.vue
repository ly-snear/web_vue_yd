<style lang="less" scoped>
.h-tabs {
  margin-bottom: 40px;
}
.create {
  position: absolute;
  top: 20px;
  left: 600px;
}
.model-right {
  width: 1000px;
}
.item {
  position: relative;
  height: 160px;
  border: #eee solid 1px;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;

  .html {
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100%;
  }

  &:hover {
    border: @primary-color solid 1px;
  }

  .btns {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Tabs :datas="selects" v-model="tab" @change="init"></Tabs>
      <Button class="create" color="primary" circle size="l" @click="open">添加试题</Button>
      <div class="item" v-for="(it, idx) in table.datas" :key="idx" @mouseover="it.hover = true" @mouseleave="it.hover = false">
        <div v-html="it.ask" class="html"></div>
        <div v-if="it.hover" class="btns">
          <Button text-color="primary" size="xs" no-border @click="update(it)">修改</Button>
          <Button text-color="primary" size="xs" no-border @click="remove(it)">删除</Button>
        </div>
      </div>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">添加/修改试题</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="类型">
          <Radio v-model="form.type" :datas="selects" :disabled="form.id > 0"></Radio>
        </FormItem>
        <FormItem label="题目">
          <RichTextEditor v-model="form.ask" :cache="false"></RichTextEditor>
        </FormItem>
        <FormItem label="答案">
          <RichTextEditor v-model="form.answer" :cache="false"></RichTextEditor>
        </FormItem>
        <FormItem label="分值">
          <input type="number" v-model="form.score" placeholder="输入分值"/>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
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
      table: {
        pagination: {
          page: 1,
          size: 3,
          total: 0
        },
        datas: [],
      },
      opened: false,
      loading: false,
      tab: 1,
      form: {},
      selects: [
        { title: '选择题', key: 1 },
        { title: '填空题', key: 2 },
        { title: '问答题', key: 3 },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Ajax.get('/quest/page', {
        page: this.table.pagination.page - 1,
        size: this.table.pagination.size,
        type: this.tab,
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      body.content.forEach(e => {
        e.hover = false;
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    open() {
      this.form = { id: 0 };
      this.opened = true;
    },
    save() {
      if (!this.form.ask || this.form.ask.length == 0 ||
          !this.form.answer || this.form.answer.length == 0) {
        HeyUI.$Message.error('请填写所有内容');
        return;
      }

      if (this.form.ask.length > 65000 || this.form.answer.length > 65000) {
        HeyUI.$Message.error('长度超限，是否图片文件太大');
        return;
      }

      if (!this.form.id && !this.form.type) {
        HeyUI.$Message.error('请选择类型');
        return;
      }

      Utils.confirm(this, '确定提交该题目 ？', modal => {
        this.loading = true;
        modal.close();

        if (this.form.id > 0) {
          Ajax.post('/quest/update', {
            id: this.form.id,
            ask: this.form.ask,
            answer: this.form.answer,
            score: this.form.score,
          }).then(resp => {
            this.loading = false;
            if (resp.ok) {
              HeyUI.$Message.success('提交成功');
              this.opened = false;
              this.init();
            }
          });
        } else {
          Ajax.post('/quest/create', {
            type: this.form.type,
            ask: this.form.ask,
            answer: this.form.answer,
            score: this.form.score,
          }).then(resp => {
            this.loading = false;
            if (resp.ok) {
              HeyUI.$Message.success('提交成功');
              this.opened = false;
              this.init();
            }
          });
        }
      });
    },
    update(data) {
      this.form = Utils.copy(data);
      this.opened = true;
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/quest/delete', {
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