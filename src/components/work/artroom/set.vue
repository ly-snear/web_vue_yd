<style lang="less" scoped>
.item {
  width: 64px;
}
.top {
  margin-top: 10px;
}
.title {
  color: @primary-color;
  font-size: 18px;
  height: 40px;
}
</style>
<template>
<div>
  <div class="frame-page">
    <div class="h-panel page-header">
      <div class="h-panel-body">
        <Row type="flex" :space="20">
          <Cell :width='4'>
            <Select v-model="year.now" :datas="year.selects" :deletable="false" disabled></Select>
          </Cell>
          <Cell :width='4'>
            <Select v-model="step.now" :datas="step.selects" :deletable="false" disabled></Select>
          </Cell>
          <Cell :width='4'>
            <Select v-model="clss.now" :datas="clss.selects" @change="changeClss" :deletable="false" placeholder="选择班级"></Select>
          </Cell>
          <Cell :width='4' v-if="clss.now > 0">
            <Select v-model="room.now" :datas="room.selects" @change="changeRoom" :deletable="false" placeholder="选择教室"></Select>
          </Cell>
        </Row>
      </div>
    </div>
    <div class="h-panel page-header" v-for="(sub, idx) in array0" :key="sub.key">
      <div class="h-panel-body">
        <div class="title">第 {{idx + 1}} 组</div>
        <Row :space="30">
          <Cell :width='2' v-for="it in sub.list" :key="it.id" :value="it">
            <div class="click item" @click="select0(it)">
              <div class="center">{{it.index}} 号</div>
              <Avatar :width="64" v-width="64" :distance="0" class="top" :src="it.exAvatar || '/static/images/add-60.png'"></Avatar>
              <div class="center top">{{it.exStudent}}</div>
            </div>
          </Cell>
        </Row>
      </div>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">选择学生</div>
      <Row :space="30" v-for="sub in array1" :key="sub.key">
        <Cell :width='4' v-for="it in sub.list" :key="it.id" :value="it">
          <div class="click item" @click="select1(it)">
            <Avatar :width="64" v-width="64" :distance="0" class="avatar top" :src="it.avatar"></Avatar>
            <div class="center">{{it.name}}</div>
          </div>
        </Cell>
      </Row>
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
      room: {
        selects: [],
        now: 0
      },
      opened: false,
      disabled: true,
      it: null,
      data0: null,
      data1: null,
      array0: [],
      array1: [],
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);

    Ajax.get('/room/list', {
      idSchool: G.get('user').idSchool
    }).then(resp => {
      if (resp.ok) {
        let selects = [];
        resp.body.forEach(e => {
          selects.push({
            title: e.name,
            key: e.id
          });
        });
        this.room.selects = selects;
        this.data0 = resp.body;
      }
    });
  },
  methods: {
    select0(it) {
      this.it = it;
      if (it.idStudent) {
        Utils.confirm(this, '确定删除该座位 ？', modal => {
          this.loading = true;
          modal.close();

          if (it.id) {
            Ajax.post('/seat/delete', {
              id: it.id
            }).then(resp => {
              this.loading = false;
              if (resp.ok) {
                HeyUI.$Message.success('删除成功');
              }
            });
          }

          it.idStudent = null;
          it.exStudent = null;
          it.exAvatar = null;
          this.$forceUpdate();
        });
      } else {
        this.opened = true;
        this.setModal();
      }
    },
    select1(it) {
      this.opened = false;

      Ajax.post('/seat/create', {
        group: this.it.group,
        index: this.it.index,
        semester: this.step.now,
        idClass: this.clss.now,
        idRoom: this.room.now,
        idStudent: it.id,
        exStudent: it.name,
        exAvatar: it.avatar,
      }).then(resp => {
        this.loading = false;
        if (resp.ok) {
          let el = this.array0[resp.body.group - 1].list[resp.body.index - 1];
          el.id = resp.body.id;
          el.idStudent = resp.body.idStudent;
          el.exStudent = resp.body.exStudent;
          el.exAvatar = resp.body.exAvatar;
          this.$forceUpdate();
          HeyUI.$Message.success('设置成功');
        }
      });
    },
    setModal() {
      let list = [];
      this.data1.forEach(e => {
        let no = true;
        this.array0.forEach(sub => {
          sub.list.forEach(it => {
            if (e.id == it.idStudent) {
              no = false;
            }
          });
        });
        if (no) {
          list.push(e);
        }
      });

      for (let i = 0; i < list.length; i += 5) {
        let sub = [];
        for (let j = i; j < i + 5 && j < list.length; j++) {
          sub.push(list[j]);
        }
        list.push({
          key: 'k' + i,
          list: sub
        });
      }
      this.array1 = list;      
    },
    changeRoom() {
      let idx = this.data0.findIndex(e => {
        return e.id == this.room.now;
      });

      let list = [];
      for (let i = 0; i < this.data0[idx].group; i++) {
        let sub = [];
        for (let j = 0; j < 8; j++) {
          sub.push({
            group: i + 1,
            index: j + 1,
            idStudent: null,
            exStudent: null,
            exAvatar: null,
          });
        }
        list.push({
          key: 'k' + i,
          list: sub
        });
      }
      this.array0 = list;

      Ajax.get('/seat/list', {
        semester: this.step.now,
        idClass: this.clss.now,
      }).then(resp => {
        if (resp.ok) {
          resp.body.forEach(e => {
            let el = this.array0[e.group - 1].list[e.index - 1];
            el.id = e.id;
            el.idStudent = e.idStudent;
            el.exStudent = e.exStudent;
            el.exAvatar = e.exAvatar;
          });
          this.$forceUpdate();
        }
      });
    },
    changeClss() {
      Ajax.get('/student/list', {
        idYear: this.year.now,
        idClass: this.clss.now
      }).then(resp => {
        if (resp.ok) {
          resp.body.forEach(e => {
            if (!e.avatar) {
              e.avatar = e.male ? '/static/images/avatar-male-96.png' : '/static/images/avatar-female-96.png';
            }
          });
          this.data1 = resp.body;
          this.room.now = 0;
          this.array0 = [];
          this.array1 = [];
        }
      });
    },
    remove() {

    },
  }
};
</script>
