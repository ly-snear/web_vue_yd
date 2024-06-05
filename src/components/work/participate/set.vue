<style lang="less" scoped>
.page-main {
  margin-bottom: 30px;

  .item {
    cursor: pointer;

    .check {
      margin-top: 10px;
      text-align: center;
      cursor: pointer;
    }
  }

  .btn {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.modal-comfirm {
  width: 600px;
  text-align: center;

  .modal-title {
    color: @primary-color;
    font-size: 24px;
    margin: 30px;
  }
  .modal-content {
    font-size: 14px;
    margin: 30px;
  }
  .modal-btn {
    margin: 20px;
  }
}
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-main">
    <div class="h-panel-body">
      <Row :space="20">
        <Cell :width='4'>
          <Select v-model="year.now" :datas="year.selects" :deletable="false" disabled></Select>
        </Cell>
        <Cell :width='4'>
          <Select v-model="step.now" :datas="step.selects" :deletable="false" disabled></Select>
        </Cell>
        <Cell :width='4'>
          <Select v-model="clss.now" :datas="clss.selects" @change="changeClss" :deletable="false" placeholder="选择班级"></Select>
        </Cell>
      </Row>
      <Row :space="20">
        <Cell :width='4'>
          <DatePicker v-model="created" format="YYYY-MM-DD" style="width: 100%;"></DatePicker>
        </Cell>
        <Cell :width='4'>
          <Select v-model="serial.now" :datas="serial.selects" @change="changeClss" placeholder="选择节次"></Select>
        </Cell>
        <Cell :width='10'>
          <Button color="primary" circle size="l" @click="save(1)" class="btn" :disabled="selects.length == 0">回答问题</Button>
          <Button color="primary" circle size="l" @click="save(2)" class="btn" :disabled="selects.length == 0">小组活动</Button>
          <Button color="primary" circle size="l" @click="save(3)" class="btn" :disabled="selects.length == 0">课堂作品</Button>
          <Button color="primary" circle size="l" @click="save(4)" class="btn" :disabled="selects.length == 0">课堂表现</Button>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel page-main">
    <div class="h-panel-body">
      <Row :space="30" v-for="sub in array" :key="sub.key">
        <Cell :width='2' v-for="it in sub.list" :key="it.id" :value="it">
          <div class="item">
            <Avatar @click="select(it)" :width="66" v-width="66" shape="square" :src="it.avatar || (it.male ? '/static/images/avatar-male-96.png' : '/static/images/avatar-female-96.png')"></Avatar>
            <Checkbox @change="change" v-model="selects" :value="it" class="check" :style="{color: it.color}">{{it.name}}</Checkbox>
          </div>
        </Cell>
      </Row>
    </div>
  </div>
  <Modal v-model="opened">
    <div class="modal-dialog">
      <div class="modal-title">{{titles[modal.type - 1]}}</div>
      <div class="modal-content dark2-color">{{created}} / 第 {{serial.now}} 节</div>
      <Radio v-model="modal.value" :datas="radios[modal.type - 1]"></Radio>
      <div>
        <Button circle size="l" class="modal-btn" @click="opened = false">取消</Button>
        <Button color="primary" circle size="l" class="modal-btn" @click="confirm">确定</Button>
      </div>
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
      serial: {
        selects: [],
        now: 0
      },
      created: '',
      array: [],
      selects: [],
      opened: false,
      titles: [
        '回答问题',
        '小组活动',
        '课堂作品',
        '课堂表现',
      ],
      radios: [
        [
          { title: '回答错误', key: 0 },
          { title: '回答正确', key: 1 },
        ],
        [
          { title: '未参加', key: 0 },
          { title: '代表发言', key: 1 },
          { title: '优秀集体', key: 2 },
        ],
        [
          { title: '未提交', key: 0 },
          { title: '按时提交', key: 1 },
          { title: '优秀作品', key: 2 },
        ],
        [
          { title: '待努力', key: 0 },
          { title: '良好', key: 1 },
          { title: '优秀', key: 2 },
        ],
      ],
      modal: {
        type: 0,
        value: 0,
      },
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);

    let list = [];
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach(e => {
      list.push({
        title: '第 ' + e + ' 节',
        key: e
      })
    });
    this.serial.selects = list;
  },
  methods: {
    select(it) {
      let idx = this.selects.findIndex(e => {
        return e.id == it.id;
      });

      if (idx < 0) {
        it.color = '#00C15E';
        this.selects.push(it);
      } else {
        it.color = '#666666';
        this.selects.splice(idx, 1);
      }
    },
    change(list) {
      this.checkbox.array.forEach(e => {
        e.list.forEach(f => {
          let idx = list.findIndex(g => {
            return f.id == g.id;
          });
          if (idx >= 0) {
            f.color = '#00C15E';
          } else {
            f.color = '#666666';
          }
        });
      });

      this.$forceUpdate();
    },
    setTable(body) {
      let list = [];
      for (let i = 0; i < body.length; i += 8) {
        let sub = [];
        for (let j = i; j < i + 8 && j < body.length; j++) {
          let e = body[j];
          e.color = '#666666';
          sub.push(e);
        }
        list.push({
          key: 'k' + i,
          list: sub
        });
      }
      this.array = list;
    },
    changeClss() {
      Ajax.get('/student/list', {
        idYear: this.year.now,
        idClass: this.clss.now
      }).then(resp => {
        if (resp.ok) {
          this.setTable(resp.body);
        }
      });
    },
    confirm() {
      let name = [];
      let idStudent = [];
      if (this.selects) {
        this.selects.forEach(e => {
          idStudent.push(e.id);
          name.push(e.name);
        });
      }
      Ajax.post('/stu/room/create', {
        created: Utils.getStamp(this.created),
        serial: this.serial.now,
        semester: this.step.now,
        idClass: this.clss.now,
        idStudentList: idStudent.join(),
        nameList: name.join(),
        type: this.modal.type,
        value: this.modal.value,
      }).then(resp => {
        this.opened = false;
        this.selects.forEach(e => {
          e.color = '#666666';
        });
        
        this.selects = [];
        if (resp.ok) {
          HeyUI.$Message.success('提交成功');
        }
      });
    },
    save(type) {
      if (!this.created) {
        HeyUI.$Message.error('选择日期');
        return;
      }
      if (!this.serial.now) {
        HeyUI.$Message.error('选择节次');
        return;
      }
      this.modal.type = type;
      this.modal.value = 0;
      this.opened= true;
    }
  }
};
</script>
