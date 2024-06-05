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
      <Form ref="form" labelPosition="left">
        <FormItem label="名称" required>
          <input type="text" v-model="name" placeholder="输入试卷名称"/>
        </FormItem>
        <FormItem label="选择题">
          <div class="item" v-for="(it, idx) in array1" :key="'1' + idx" @mouseover="it.hover = true" @mouseleave="it.hover = false">
            <div v-html="it.ask" class="html"></div>
            <div v-if="it.hover" class="btns">
              <Button text-color="primary" size="xs" no-border @click="remove(it)">删除</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="填空题">
          <div class="item" v-for="(it, idx) in array2" :key="'2' + idx" @mouseover="it.hover = true" @mouseleave="it.hover = false">
            <div v-html="it.ask" class="html"></div>
            <div v-if="it.hover" class="btns">
              <Button text-color="primary" size="xs" no-border @click="remove(it)">删除</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="问答题">
          <div class="item" v-for="(it, idx) in array3" :key="'3' + idx" @mouseover="it.hover = true" @mouseleave="it.hover = false">
            <div v-html="it.ask" class="html"></div>
            <div v-if="it.hover" class="btns">
              <Button text-color="primary" size="xs" no-border @click="remove(it)">删除</Button>
            </div>
          </div>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="opened = true">添加试题</Button>
          <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
          <Button circle @click="opened = false">取 消</Button>
        </FormItem>
      </Form>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">选择试题</div>
      <Tabs :datas="selects" v-model="tab" @change="init"></Tabs>
      <div class="item" v-for="(it, idx) in table.datas" :key="idx" @mouseover="it.hover = true" @mouseleave="it.hover = false">
        <div v-html="it.ask" class="html" @click="click(it)"></div>
      </div>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
    return {
      name: null,
      array1: [],
      array2: [],
      array3: [],
      opened: false,
      loading: false,
      table: {
        pagination: {
          page: 1,
          size: 5,
          total: 0
        },
        datas: [],
      },
      tab: 1,
      selects: [
        { title: '选择题', key: 1 },
        { title: '填空题', key: 2 },
        { title: '问答题', key: 3 },
      ],
    };
  },
  created() {
    if (this.$route.params.id) {
      Ajax.get('/paper/read', {
        id: this.$route.params.id,
      }).then(resp => {
        if (resp.ok) {
          this.name = resp.body.name;
          resp.body.array.forEach(e => {
            switch (e.type) {
              case 1:
                this.array1.push(e);
                break;
              case 2:
                this.array2.push(e);
                break;
              case 3:
                this.array3.push(e);
                break;
            }
          });
        }
      });
    }

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/quest/page', {
        page: this.table.pagination.page - 1,
        size: 3,
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
    save() {
      if (!this.name || this.name.length == 0) {
        HeyUI.$Message.error('请填写名称');
        return;
      }

      Utils.confirm(this, '确定提交该试卷 ？', modal => {
        this.loading = true;
        modal.close();

        let content = [];
        let func = e => {
          content.push(e.id);
        };
        this.array1.forEach(func);
        this.array2.forEach(func);
        this.array3.forEach(func);

        if (this.$route.params.id) {
          Ajax.post('/paper/update', {
            id: this.$route.params.id,
            name: this.name,
            content: content.join(),
          }).then(resp => {
            this.loading = false;
            if (resp.ok) {
              HeyUI.$Message.success('提交成功');
              this.reset();
            }
          });
        } else {
          Ajax.post('/paper/create', {
            name: this.name,
            content: content.join(),
          }).then(resp => {
            this.loading = false;
            if (resp.ok) {
              HeyUI.$Message.success('提交成功');
              this.reset();
            }
          });
        }
      });
    },
    remove(data) {
      let func = e => {
        return e.id == data.id;
      };
      let i1 = this.array1.findIndex(func);
      if (i1 >= 0) {
        this.array1.splice(i1, 1);
      }
      let i2 = this.array2.findIndex(func);
      if (i2 >= 0) {
        this.array2.splice(i2, 1);
      }
      let i3 = this.array3.findIndex(func);
      if (i3 >= 0) {
        this.array3.splice(i3, 1);
      }
    },
    click(data) {
      switch(this.tab) {
        case 1:
          this.array1.push(data);
          break;
        case 2:
          this.array2.push(data);
          break;
        case 3:
          this.array3.push(data);
          break;
      }
      this.opened = false;
    },
    reset() {
      this.name = null;
      this.array1 = [];
      this.array2 = [];
      this.array3 = [];
      this.opened = false;
      this.$route.params.id = 0;
    },
  }
};
</script>