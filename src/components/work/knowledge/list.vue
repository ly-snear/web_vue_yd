<style lang="less" scoped>
.top {
  margin-top: 16px;
}
.item {
  position: relative;
  margin-bottom: 40px;

  .index {
    position: absolute;
    font-weight: bold;
  }
  .html {
    margin-left: 30px;
    left: 30px;
    top: 0px;
  }
}
.btns {
  margin-left: 40px;
  margin-bottom: 40px;
}
.model-right {
  .link {
    padding-top: 12px;
  }
  .uploader-btn {
    border: 0 solid;
    padding: 0 0;
    line-height: 1;
    color: white;
  }
  .uploader-btn:hover {
    background-color: transparent; 
  }
}
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Table :datas="table.datas">
        <TableItem title="序号" prop="serial" :width="140"></TableItem>
        <TableItem title="名称" prop="name"></TableItem>
        <TableItem title="日期" prop="created"></TableItem>
        <TableItem title="操作" :width="320">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border @click="open(data)">查看</Button>
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="score(data)">上传成绩</Button>
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="update(data)">修改</Button>
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="remove(data)">删除</Button>
          </template>
        </TableItem>
        <div slot="empty">无数据</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init"></Pagination>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right" id="print">
      <div class="title">{{dat.name}}</div>
      <h3>一、选择题</h3>
      <div class="item" v-for="(it, idx) in array1" :key="it.id">
        <div class="index">{{idx + 1}}、</div>
        <div v-html="it.ask" class="html"></div>
      </div>
      <h3>二、填空题</h3>
      <div class="item" v-for="(it, idx) in array2" :key="it.id">
        <div class="index">{{idx + 1}}、</div>
        <div v-html="it.ask" class="html"></div>
      </div>
      <h3>三、问答题</h3>
      <div class="item" v-for="(it, idx) in array3" :key="it.id">
        <div class="index">{{idx + 1}}、</div>
        <div v-html="it.ask" class="html"></div>
      </div>
    </div>
    <div class="btns">
      <Button color="primary" circle v-print="'#print'">打 印</Button>
      <Button circle @click="opened = false">取 消</Button>
    </div>
  </Modal>
  <Modal v-model="upload.opened" type="drawer-right">
    <div class="model-right">
      <div class="title">导入成绩</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="学年" readonly>
          {{year.str}} / {{step.str}}
        </FormItem>
        <FormItem label="试卷" readonly>
          {{dat.name}}
        </FormItem>
        <FormItem label="班级" required>
          <Select v-model="clss.now" :datas="clss.selects" :deletable="false" placeholder="选择班级"></Select>
        </FormItem>
        <FormItem label="模板">
          <div class="link">
            <a href="/static/excel/%E6%88%90%E7%BB%A9%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx" download="成绩上传模板.xlsx">模板下载</a>
          </div>
        </FormItem>
        <FormItem>
          <uploader :options="upload.options" class="h-btn h-btn-circle h-btn-primary" :disabled="clss.now == 0" @upload-start="loading = true">
            <uploader-btn :single="upload.single" :attrs="upload.attrs">上 传</uploader-btn>
          </uploader>
          <Button circle @click="upload.opened = false">取 消</Button>
        </FormItem>
        <Loading :loading="loading"></Loading>
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
          size: 10,
          total: 0
        },
        datas: [],
      },
      dat: {},
      array1: [],
      array2: [],
      array3: [],
      opened: false,
      upload: {
        options: {
          target: '/api/stu/paper/upload',
          headers: {
            token: ''
          },
          query: {
            semester: 0,
            idPaper: 0,
            idClass: 0,
          },
          testChunks: false,
          processParams: function (param) {},
          processResponse: function (resp) {},
        },
        attrs: {
          accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        single: true,
        opened: false,
      },
      loading: false,
      year: {
        selects: [],
        now: 0,
      },
      step: {
        selects: [],
        now: 0,
      },
      clss: {
        selects: [],
        now: 0
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

    this.upload.options.processParams = this.processParams;
    this.upload.options.processResponse = this.processResponse;
    this.upload.options.headers.token = G.get('user').token;

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/paper/page', {
        page: this.table.pagination.page - 1
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    setTable(body) {
      let first = this.table.pagination.size * (this.table.pagination.page - 1);
      body.content.forEach((e, idx) => {
        e.serial = idx + first + 1;
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    update(data) {
      this.$router.push({ name: 'PaperSet', params: { id: data.id }});
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/paper/delete', {
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
    open(data) {
      this.dat = data;
      this.opened = true;
      Ajax.get('/paper/read', {
        id: data.id,
      }).then(resp => {
        if (resp.ok) {
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
    },
    score(data) {
      this.dat = data;
      this.upload.opened = true;
    },
    processParams(param) {
      param.semester = this.step.now;
      param.idClass = this.clss.now;
      param.idPaper = this.dat.id;
      return param;
    },
    processResponse(resp) {
      resp = JSON.parse(resp);
      this.loading = false;
      this.upload.opened = false;
      if (resp.ok) {
        HeyUI.$Message.success('上传成功');
      } else {
        HeyUI.$Message.error(resp.msg);
      }
    },
    download() {
      Ajax.get('/paper/file', {
        id: this.dat.id,
      }).then(resp => {
        if (resp.ok) {
        }
      });
    },
  }
};
</script>
