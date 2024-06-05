<style lang="less" scoped>
.avatar {
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
.empty {
  width: 100%;
  text-align: center;
  border: 1px solid #eeeeee;
  padding: 20px;
}
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-header">
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
          <Button color="primary" circle size="l" @click="save(0)" class="btn" :disabled="checkbox.selects.length > 0 || clss.now == 0">全员出勤</Button>
          <Button color="primary" circle size="l" @click="save(1)" class="btn" :disabled="checkbox.selects.length == 0">请假</Button>
          <Button color="primary" circle size="l" @click="save(2)" class="btn" :disabled="checkbox.selects.length == 0">迟到</Button>
          <Button color="primary" circle size="l" @click="save(3)" class="btn" :disabled="checkbox.selects.length == 0">旷课</Button>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Row :space="30" v-for="sub in checkbox.array" :key="sub.key">
        <Cell :width='2' v-for="it in sub.list" :key="it.id" :value="it">
          <Avatar @click="select(it)" :width="64" v-width="64" :distance="0" class="avatar" :src="it.avatar || (it.male ? '/static/images/avatar-male-96.png' : '/static/images/avatar-female-96.png')"></Avatar>
          <Checkbox @change="change" v-model="checkbox.selects" :value="it" class="check" :style="{color: it.color}">{{it.name}}</Checkbox>
        </Cell>
      </Row>
      <div v-if="checkbox.array.length == 0" class="empty gray-color">请先选择班级</div>
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
      serial: {
        selects: [],
        now: 0
      },
      checkbox: {
        array: [],
        selects: []
      },
      created: '',
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
      let idx = this.checkbox.selects.findIndex(e => {
        return e.id == it.id;
      });

      if (idx < 0) {
        it.color = '#00C15E';
        this.checkbox.selects.push(it);
      } else {
        it.color = '#666666';
        this.checkbox.selects.splice(idx, 1);
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
      this.checkbox.array = list;
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
    save(value) {
      if (!this.created) {
        HeyUI.$Message.error('选择日期');
        return;
      }
      if (!this.serial.now) {
        HeyUI.$Message.error('选择节次');
        return;
      }

      Utils.confirm(this, '确定提交该考勤记录 ？', modal => {
        this.loading = true;
        modal.close();

        let name = [];
        let idStudent = [];
        if (this.checkbox.selects) {
          this.checkbox.selects.forEach(e => {
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
          type: 10,
          value: value,
        }).then(resp => {
          this.checkbox.selects.forEach(e => {
            e.color = '#666666';
          });
          
          this.checkbox.selects = [];
          this.created = '';
          this.serial.now = 0;
          if (resp.ok) {
            HeyUI.$Message.success('提交成功');
          }
        });
      });
    }
  }
};
</script>
