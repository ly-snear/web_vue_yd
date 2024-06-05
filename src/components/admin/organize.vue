<style lang="less" scoped>
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
          <Cell :flex='1'>
            <Button color="primary" circle size="l" @click="open">创建组织</Button>
          </Cell>
        </Row>
      </div>
    </div>
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Table :datas="table.datas">
          <TableItem title="序号" prop="$serial" :width="140"></TableItem>
          <TableItem title="城市" prop="city"></TableItem>
          <TableItem title="区县" prop="zone"></TableItem>
          <TableItem title="学校" prop="school"></TableItem>
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
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">创建地区</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="类型">
          <Radio v-model="radio" :datas="radios"></Radio>
        </FormItem>
        <FormItem label="城市" v-if="radio == 0">
          <input type="text" v-model="form.name" placeholder="请输入城市名"/>
        </FormItem>
        <FormItem label="城市" v-if="radio == 1">
          <Select v-model="form.city.now" :datas="form.city.selects" placeholder="选择城市"></Select>
        </FormItem>
        <FormItem label="区县" v-if="radio == 1">
          <input type="text" v-model="form.name" placeholder="请输入区县名"/>
        </FormItem>
        <FormItem label="城市" v-if="radio == 2">
          <Select v-model="form.city.now" :datas="form.city.selects" @change="changeOpenCity" placeholder="选择城市"></Select>
        </FormItem>
        <FormItem label="区县" v-if="radio == 2">
          <Select v-model="form.zone.now" :datas="form.zone.selects" placeholder="选择区县"></Select>
        </FormItem>
        <FormItem label="学校" v-if="radio == 2">
          <input type="text" v-model="form.name" placeholder="请输入学校名"/>
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
        now: 0,
      },
      zone: {
        selects: [],
        now: 0,
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
      loading: false,
      radio: 0,
      radios: [
        { title: '市级', key: 0 },
        { title: '区县', key: 1 },
        { title: '学校', key: 2 },
      ],
      form: {
        city: {
          selects: [],
          now: 0,
        },
        zone: {
          selects: [],
          now: 0,
        },
      },
      disabled: false,
    };
  },
  created() {
    let user = G.get('user');

    if (user.level > 100) {
      this.disabled = true;
    }

    if (user.level == 10000) {
      this.city = Utils.getCity();
    }
    if (user.level == 1200) {
      this.city = {
        selects: [{
          title: Utils.getName(user.idCity),
          key: user.idCity
        }],
        now: user.idCity
      };
      this.zone = Utils.getZone(this.city.now);
    }
    if (user.level == 1100) {
      this.city = {
        selects: [{
          title: Utils.getName(user.idCity),
          key: user.idCity
        }],
        now: user.idCity
      };
      this.zone = {
        selects: [{
          title: Utils.getName(user.idZone),
          key: user.idZone
        }],
        now: user.idZone
      };
    }

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/organize/list', {
        id: this.zone.now || this.city.now
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    changeCity() {
      this.zone = Utils.getZone(this.city.now);
      this.init();
    },
    changeZone() {
      this.init();
    },
    setTable(body) {
      let idx = this.table.pagination.page - 1;
      let list = body.slice(idx * 10, (idx + 1) * 10);

      list.forEach(e => {
        e.city = Utils.getName(e.idCity);
        e.zone = Utils.getName(e.idZone);
        e.school = Utils.getName(e.idSchool);
      });
      this.table.datas = list;
      this.table.pagination.total = body.length;
    },
    remove(data) {
      Utils.confirm(this, '确定删除该记录 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/organize/delete', {
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
    save() {
      this.loading = true;
      if (this.radio == 0) {
        Ajax.post('/organize/create/city', {
          name: this.form.name
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.updateOrganize();
            this.init();
          }
        });
      } else
      if (this.radio == 1) {
        Ajax.post('/organize/create/zone', {
          name: this.form.name,
          idCity: this.form.city.now
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.updateOrganize();
            this.init();
          }
        });
      } else {
        Ajax.post('/organize/create/school', {
          name: this.form.name,
          idZone: this.form.zone.now
        }).then(resp => {
          this.loading = false;
          this.opened = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.updateOrganize();
            this.init();
          }
        });
      }
    },
    open() {
      this.opened = true;
      let user = G.get('user');
      if (user.level == 10000) {
        this.radio = 0;

        this.form.city = Utils.getCity();
        this.form.zone = { selects: [], now: 0 };
      }
      if (user.level == 1200) {
        this.radios = [
          { title: '区县', key: 1 },
          { title: '学校', key: 2 },
        ];
        this.radio = 1;

        this.form.city = {
          selects: [{
            title: Utils.getName(user.idCity),
            key: user.idCity
          }],
          now: user.idCity
        };
        this.form.zone = Utils.getZone(this.city.now);
      }
      if (user.level == 1100) {
        this.radios = [
          { title: '学校', key: 2 },
        ];
        this.radio = 2;

        this.form.city = {
          selects: [{
            title: Utils.getName(user.idCity),
            key: user.idCity
          }],
          now: user.idCity
        };
        this.form.zone = {
          selects: [{
            title: Utils.getName(user.idZone),
            key: user.idZone
          }],
          now: user.idZone
        };
      }
    },
    changeOpenCity() {
      this.form.zone = Utils.getZone(this.form.city.now);
    },
    updateOrganize() {
      Ajax.get('/dashboard/setup', {}).then(resp => {
        if (resp.ok) {
          G.set('organizes', resp.body.organize);
        }
      });
    },
  }
};
</script>
