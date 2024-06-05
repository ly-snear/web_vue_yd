<style lang="less" scoped>
.top {
  margin-top: 16px;
}
.sub-item {
    padding-bottom: 0;
}
.model-right {
  width: 700px;
}
</style>
<template>
<div>
   <div class="frame-page">
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Row type="flex" :space="20">
          <Cell :width='4'>
            <Select v-model="city.now" :datas="city.selects" @change="changeCity" placeholder="选择城市"></Select>
          </Cell>
          <Cell :width='4'>
            <Select v-model="zone.now" :datas="zone.selects" @change="changeZone" placeholder="选择区县"></Select>
          </Cell>
          <Cell :width='4'>
            <Select v-model="school.now" :datas="school.selects" placeholder="选择学校"></Select>
          </Cell>
          <Cell :flex='1'>
            <Button :disabled="school.now == 0" color="primary" circle size="l" @click="search">搜索</Button>
            <Button :disabled="disabled || school.now == 0" color="primary" circle size="l" @click="create">创建教室</Button>
          </Cell>
        </Row>
      </div>
    </div>
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Table :datas="table.datas">
          <TableItem title="序号" prop="serial" :width="140"></TableItem>
          <TableItem title="教室" prop="name"></TableItem>
          <TableItem title="学校" prop="school"></TableItem>
          <TableItem title="小组数" prop="group"></TableItem>
          <TableItem title="操作" :width="200">
            <template slot-scope="{data}">
              <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="update(data)">更新</Button>
              <Button text-color="primary" size="xs" no-border :disabled="disabled" @click="remove(data)">删除</Button>
            </template>
          </TableItem>
          <div slot="empty">{{searched ? '无数据' : '未搜索'}}</div>
        </Table>
        <br/><br/>
        <Pagination align="center" layout="pager" v-model="table.pagination" @change="search"></Pagination>
      </div>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">{{form.id ? '更新教室' : '创建教室'}}</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="学校" readonly>
          {{form.school}}
        </FormItem>
        <FormItem label="教室" prop="name">
          <input type="text" v-model="form.name" :disabled="form.id" placeholder="请输入教室名"/>
        </FormItem>
        <FormItem label="小组" prop="group">
          <Row type="flex" :space-x="20">
            <Cell :width="12">
              <NumberInput v-model="form.group" :useOperate="true" placeholder="请输入小组数" @change="changeGroup"></NumberInput>
            </Cell>
            <Cell :flex="1">
              <NumberInput v-model="form.index" :useOperate="true" placeholder="请输入组员数" @change="changeIndex"></NumberInput>
            </Cell>
          </Row>
        </FormItem>
        <FormItem :label="'摄像头 ' + (idx0 + 1)" v-for="(e0, idx0) in form.camera" :key="idx0">
          <input type="text" v-model="e0.network" placeholder="请输入网络地址"/>
            <Row type="flex" :space-x="20">
            <Cell :width="12">
              <input type="text" class="top" v-model="e0.username" placeholder="请输入用户名"/>
            </Cell>
            <Cell :flex="1">
              <input type="text" class="top" v-model="e0.password" placeholder="请输入密码"/>
            </Cell>
          </Row>
          <FormItem :label="'座位 ' + (idx1 + 1)" v-for="(e1, idx1) in e0.params" :key="idx1" class="sub-item">
            <div class="h-input-group top">
              <span class="h-input-addon">预置位</span>
              <input type="text" v-model="e1.param1"/>
              <span class="h-input-addon">角度</span>
              <input type="text" v-model="e1.param2"/>
              <span class="h-input-addon">屏幕地址</span>
              <input type="text" v-model="e1.param3"/>
            </div>
          </FormItem>
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
      city: {
        selects: [],
        now: 0 
      },
      zone: {
        selects: [],
        now: 0 
      },
      school: {
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
      form: {
        camera: [],
      },
      opened: false,
      loading: false,
      disabled: false,
      searched: false,
    };
  },
  created() {
    let user = G.get('user');
    if (user.level < 10000) {
      this.disabled = true;
    }

    this.city = Utils.getCity();
  },
  methods: {
    changeCity() {
      this.zone = Utils.getZone(this.city.now);
      this.school = { selects: [], now: 0 };
    },
    changeZone() {
      this.school = Utils.getSchool(this.zone.now);
    },
    search() {
      this.searched = true;

      Ajax.get('/room/page', {
        idSchool: this.school.now,
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
        e.school = Utils.getName(e.idSchool);
      });
      this.table.datas = body.content;
      this.table.pagination.total = body.totalElements;
    },
    create() {
      this.opened = true;
      this.form.school = Utils.getTitle(this.school);
      this.form.id = null;
      this.form.camera = [];
    },
    update(data) {
      this.opened = true;
      this.form.school = data.school;
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.group = data.group;
      
      data.camera.forEach(e => {
        let f1 = e.param1.split(',');
        let f2 = e.param2.split(',');
        let f3 = e.param3.split(',');
        this.form.index = f1.length;

        let params = [];
        for (let i = 0; i < f1.length; i++) {
          params.push({
            param1: f1[i],
            param2: f2[i],
            param3: f3[i],
          });
        }
        e.params = params;
      });
      this.form.camera = data.camera;
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/room/delete', {
          id: data.id
        }).then(resp => {
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('删除成功');
            this.search();
          }
        });
      });
    },
    changeGroup() {
      if (this.form.group > this.form.camera.length) {
        for (let i = this.form.camera.length; i < this.form.group; i++) {
          let list = [];
          for (let j = 0; this.form.index && j < this.form.index; j++) {
            list.push({});
          }
          this.form.camera.push({
            network: '',
            password: '',
            params: list
          });
        }
      }

      if (this.form.group < this.form.camera.length) {
        this.form.camera.splice(this.form.group, this.form.camera.length);
      }
    },
    changeIndex() {
      if (this.form.group && this.form.group > 0) {
        let length = this.form.camera[0].params.length;

        if (this.form.index > length) {
          for (let i = 0; i < this.form.camera.length; i++) {
            let list = this.form.camera[i].params;
            for (let j = length; j < this.form.index; j++) {
              list.push({});
            }
          }
        }

        if (this.form.index < length) {
          for (let i = 0; i < this.form.camera.length; i++) {
            let list = this.form.camera[i].params;
            list.splice(this.form.index, length);
          }
        }
        this.$forceUpdate();
      }
    },
    save() {
      for (let i = 0; i < this.form.group; i++) {
        if (!this.form.camera[i].network || !this.form.camera[i].username || !this.form.camera[i].password) {
          HeyUI.$Message.error('请填写所有摄像头信息');
          return;
        }
      }
      this.loading = true;

      let network = [], username = [], password = [];
      let param1 = [], param2 = [], param3 = [];
      this.form.camera.forEach(e => {
        network.push(e.network);
        username.push(e.username);
        password.push(e.password);

        let f1 = [], f2 = [], f3 =[];
        e.params.forEach(f => {
          f1.push(f.param1);
          f2.push(f.param2);
          f3.push(f.param3);
        });
        param1.push(f1.join());
        param2.push(f2.join());
        param3.push(f3.join());
      });

      if (this.form.id) {
        Ajax.post('/room/update', {
          id: this.form.id,
          type: 1,
          group: this.form.group,
          network: network.join(';'),
          username: username.join(';'),
          password: password.join(';'),
          param1: param1.join(';'),
          param2: param2.join(';'),
          param3: param3.join(';'),
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('更新成功');
            this.search();
          }
        });
      } else {
        Ajax.post('/room/create', {
          name: this.form.name,
          type: 1,
          group: this.form.group,
          idSchool: this.school.now,
          network: network.join(';'),
          username: username.join(';'),
          password: password.join(';'),
          param1: param1.join(';'),
          param2: param2.join(';'),
          param3: param3.join(';'),
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.search();
          }
        });
      }
    },
  }
};
</script>
