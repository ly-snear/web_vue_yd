<style lang="less" scoped>
.item {
  width: 340px;
  height: 168px;
  margin: 20px 0;
  background-image: url(../../../images/attendance/background.png);
  background-size: 100% 100%;
  box-shadow: 0px 2px 9px 0px rgba(22, 19, 96, 0.09);

  .header {
    width: 160px;
    height: 34px;
    background-color: @primary-color;
    border-radius: 25px;
    text-align: center;
    color: white;
    line-height: 34px;
    margin-left: 90px;
    margin-top: -17px;
    position: absolute;
  }

  .title {
    font-weight: bold;
    text-align: center;
    width: 100%;
    font-size: 16px;
    color: #666666;
    position: relative;
    top: 30px;

    span {
      color: @primary-color;
    }
  }

  .content {
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #666666;
    position: relative;
    top: 50px;
  }

  .desc {
    font-weight: bold;
    text-align: center;
    width: 100%;
    font-size: 12px;
    position: relative;
    top: 90px;

    .text2 {
      margin: 0 20px;
    }
  }

  .footer {
    height: 6px;
    width: 100%;
    position: relative;
    top: 100px;
    background-color: @primary-color;
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
          <Select v-model="step.now" :datas="step.selects" @change="changeTerm" placeholder="选择学期"></Select>
        </Cell>
      </Row>
    </div>
  </div>
  <Row :space="20" v-for="sub in array" :key="sub.key">
    <Cell :width='6' v-for="it in sub.list" :key="it.id" :value="it">
      <div class="item">
        <div class="header">{{it.name}}</div>
        <div class="title">应到 <span>{{it.total}}</span> 人次，实到 <span>{{it.total - it.type1 - it.type3}} </span>人次</div>
        <div class="content">缺勤 {{it.type1 + it.type3}} 人次，其中 请假 {{it.type1}} 人次，旷课 {{it.type3}} 人次</div>
        <div class="desc">
          <span class="green-color"><img src="../../../images/attendance/circle-green.png"> 实到</span>
          <span class="text2 yellow-color"><img src="../../../images/attendance/circle-yellow.png"> 请假</span>
          <span class="red-color"><img src="../../../images/attendance/circle-red.png"> 旷课</span></div>
        <div class="footer">
          <div class="bg-yellow-color" :style="{'width': it.block2.width, 'margin-left': it.block2.left, height: '100%'}">
            <div class="bg-red-color" :style="{'width': it.block3.width,'margin-left': it.block3.left, height: '100%'}"></div>
          </div>
        </div>
      </div>
    </Cell>
  </Row>
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
      array: [],
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/stu/room/stat/attendance', {
        semester: this.step.now,
        idYear: this.year.now,
      }).then(resp => {
        if (resp.ok) {
          this.setArray(resp.body);
        }
      });
    },
    setArray(body) {
      let list = [];
      for (let i = 0; i < body.length; i += 4) {
        let sub = [];
        for (let j = i; j < i + 4 && j < body.length; j++) {
          let e = body[j];
          e.total = e.classroomType10[0];
          e.type1 = e.classroomType10[1];
          e.type3 = e.classroomType10[3];

          let type13inTotal = e.total == 0 ? 0 : (e.type1 + e.type3) * 100 / e.total;
          let type3in13 = e.total == 0 ? 0 : e.type3 * 100 / (e.type1 + e.type3);

          e.block2 = {
            width: type13inTotal + '%',
            left: 100 - type13inTotal + '%',
          };
          e.block3 = {
            width: type3in13 + '%',
            left: 100 - type3in13 + '%',
          };
          sub.push(e);
        }
        list.push({
          key: 'k' + i,
          list: sub
        });
      }
      this.array = list;
    },
    changeYear() {
      this.step.now = 0;
    },
    changeTerm() {
      this.init();
    },
  }
};
</script>
