<style lang="less" scoped>
.h-form .h-form-item {
  padding-bottom: 20px;
 }

.model-right {
  .link {
    padding: 15px;
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
      <Row :space="20">
        <Cell :width='4'>
          <Select v-model="year.now" :datas="year.selects" @change="changeYear" :deletable="false"></Select>
        </Cell>
        <Cell :width='4'>
          <Select v-model="clss.now" :datas="clss.selects" @change="changeClss" placeholder="选择班级"></Select>
        </Cell>
        <Cell :width='4'>
          <Button color="primary" circle size="l" @click="open">导入学生</Button>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel">
    <div class="h-panel-body">
      <Table :datas="table.datas">
        <TableItem title="序号" prop="serial" :width="140"></TableItem>
        <TableItem title="学年" prop="year"></TableItem>
        <TableItem title="班级" prop="class"></TableItem>
        <TableItem title="学籍号" prop="username"></TableItem>
        <TableItem title="姓名" prop="name"></TableItem>
        <TableItem title="操作" :width="200">
          <template slot-scope="{data}">
            <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="remove(data)">删除</Button>
          </template>
        </TableItem>
        <div slot="empty">暂时无数据</div>
      </Table>
      <br/><br/>
      <Pagination align="center" layout="pager" v-model="table.pagination" @change="init2"></Pagination>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">导入学生</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="学年" readonly>
          {{data.year}}
        </FormItem>
        <FormItem label="班级" required>
          <input type="text" v-model="data.class" placeholder="请输入新班级或已有班级（如：初一三班）"/>
        </FormItem>
        <FormItem label="模板">
          <div class="link">
            <a href="/static/excel/%E5%AD%A6%E7%94%9F%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx" download="学生上传模板.xlsx">模板下载</a>
          </div>
        </FormItem>
        <FormItem>
          <uploader :options="upload.options" class="h-btn h-btn-circle h-btn-primary" :disabled="!data.class" @upload-start="loading = true">
            <uploader-btn :single="upload.single" :attrs="upload.attrs">上传</uploader-btn>
          </uploader>
          <Button circle @click="opened = false">取消</Button>
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
      year: {
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
      opened: false,
      data: {},
      upload: {
        options: {
          target: '/api/student/upload',
          headers: {
            token: ''
          },
          query: {
            name: '',
            idYear: 0
          },
          testChunks: false,
          processParams: function (param) {},
          processResponse: function (resp) {},
        },
        attrs: {
          accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        single: true
      },
      loading: false,
      disabled: false,
    };
  },
  created() {
    if (G.get('user').level > 100) {
      this.disabled = true;
    }

    this.upload.options.processParams = this.processParams;
    this.upload.options.processResponse = this.processResponse;
    this.upload.options.headers.token = G.get('user').token;

    this.year = Utils.getYear();
    this.init();
  },
  methods: {
    init() {
      let clsBody = null;
      let stuBody = null;
      Ajax.get('/class/list', {}).then(resp => {
        if (resp.ok) {
          clsBody = resp.body;
          if (clsBody && stuBody) {
            G.set('classes', clsBody);
            this.clss = Utils.getClss(this.year.now);

            this.setTable(stuBody);
          }
        }
      });

      Ajax.get('/student/page', {
        page: this.table.pagination.page - 1,
        idClass: this.clss.now,
        idYear: this.year.now
      }).then(resp => {
        if (resp.ok) {
          stuBody = resp.body;
          if (clsBody && stuBody) {
            G.set('classes', clsBody);
            this.clss = Utils.getClss(this.year.now);

            this.setTable(stuBody);
          }
        }
      });
    },
    init2() {
      Ajax.get('/student/page', {
        page: this.table.pagination.page - 1,
        idClass: this.clss.now,
        idYear: this.year.now
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
        if (e.idYear) {
          e.year = Utils.getNameYear(e.idYear);
        }
        if (e.idClass) {
          e.class = Utils.getNameClss(e.idClass);
        }
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    changeYear() {
      this.clss = Utils.getClss(this.year.now);
      this.table.pagination.page = 1;

      Ajax.get('/student/page', {
        page: this.table.pagination.page - 1,
        idYear: this.year.now
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    changeClss() {
      this.table.pagination.page = 1;
      
      Ajax.get('/student/page', {
        page: this.table.pagination.page - 1,
        idYear: this.year.now,
        idClass: this.clss.now
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    open() {
      this.year.selects.forEach(e => {
        if (e.key == this.year.now) {
          this.data.year = e.title;
        }
      });
      
      this.data.now = this.year.now;
      this.opened = true;
    },
    remove(data) {
      Ajax.post('/student/delete', {
        id: data.id
      }).then(resp => {
        this.opened = false;
        if (resp.ok) {
          HeyUI.$Message.success('删除成功');
          this.init2();
        }
      });
    },
    processParams(param) {
      param.idYear = this.data.now;
      param.name = this.data.class;
      return param;
    },
    processResponse(resp) {
      resp = JSON.parse(resp);
      this.loading = false;
      this.opened = false;
      if (resp.ok) {
        HeyUI.$Message.success('上传成功');
        this.init();
      } else {
        HeyUI.$Message.error(resp.msg);
      }
    },
  }
};
</script>
