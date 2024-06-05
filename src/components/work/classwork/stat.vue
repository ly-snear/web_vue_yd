<style lang="less" scoped>
.echarts-vue {
  height: 340px;
}
.item {
  text-align: center;

  .value {
    font-weight: bold;
    font-size: 16px;
    color: @primary-color;
  }
  .name {
    margin-top: 4px;
    font-size: 14px;
    color: #c1c1c1;
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
        <Cell :width='4'>
          <Select v-model="clss.now" :datas="clss.selects" @change="init" placeholder="选择班级"></Select>
        </Cell>
        <Cell :width='4'>
          <Button color="primary" circle size="l" @click="init" :disabled="!(year.now > 0 && step.now > 0)">搜索</Button>
        </Cell>
      </Row>
    </div>
  </div>
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <br/>
      <Row :space-x="30" type="flex" justify="center">
        <Cell :width='2' class="item">
          <div class="value">{{at.classwork[0]}}</div>
          <div class="name">作业次数</div>
        </Cell>
        <Cell :width='2' class="item">
          <div class="value">{{at.percent}} %</div>
          <div class="name">提交率</div>
        </Cell>
        <Cell :width='2' class="item">
          <div class="value">{{at.average}}</div>
          <div class="name">平均分</div>
        </Cell>
        <Cell :width='2' class="item">
          <div class="value">{{at.classwork[3]}}</div>
          <div class="name">最低分</div>
        </Cell>
        <Cell :width='2' class="item">
          <div class="value">{{at.classwork[4]}}</div>
          <div class="name">最高分</div>
        </Cell>
        <Cell :width='2' class="item">
          <div class="value">{{at.index}} / {{at.count}}</div>
          <div class="name">班级排名</div>
        </Cell>
      </Row>
      <br/><br/><br/>
      <Row type="flex" justify="space-around">
        <Cell :width='7'>
          <Chart :initOptions="chart1" :options="opt1"></Chart>
        </Cell>
        <Cell :width='7'>
          <Chart :initOptions="chart2" :options="opt2"></Chart>
        </Cell>
        <Cell :width='7'>
          <Chart :initOptions="chart3" :options="opt3"></Chart>
        </Cell>
      </Row>
      <br/><br/>
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
      chart1: {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        grid: {
          x: 30,
          y: 50,
          x2: 30,
          y2: 30,
        },
        legend: {
          data: ['学生数', '提交数'],
          orient: 'horizontal',
          left: 'right',
          icon: "roundRect",
          itemWidth: 36,
          itemHeight: 3,
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            name: '学生数',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                color: '#ffae00',
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '提交数',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#13ce66',
                lineStyle: {
                  width: 4
                }
              }
            }
          }
        ],
      },
      chart2: {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        grid: {
          x: 30,
          y: 50,
          x2: 30,
          y2: 30,
        },
        legend: {
          data: ['平均分', '总平均'],
          orient: 'horizontal',
          left: 'right',
          icon: "roundRect",
          itemWidth: 36,
          itemHeight: 3,
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            name: '平均分',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                color: '#ffae00',
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '总平均',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#13ce66',
                lineStyle: {
                  width: 4
                }
              }
            }
          }
        ],
      },
      chart3: {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        grid: {
          x: 30,
          y: 50,
          x2: 30,
          y2: 30,
        },
        legend: {
          data: ['最低分', '最高分'],
          orient: 'horizontal',
          left: 'right',
          icon: "roundRect",
          itemWidth: 36,
          itemHeight: 3,
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            name: '最低分',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                color: '#3b91ff',
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '最高分',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                color: '#13ce66',
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          }
        ],
      },
      opt1: {},
      opt2: {},
      opt3: {},
      at: {
        classwork: []
      },
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);

    this.init();
  },
  methods: {
    init() {
      if (this.clss.now == 0 && this.clss.selects.length > 0) {
        this.clss.now = this.clss.selects[0].key;
      }

      Ajax.get('/stu/work/stat', {
        semester: this.step.now,
        idYear: this.year.now,
      }).then(resp => {
        if (resp.ok) {
          this.setChart(resp.body);
        }
      });
    },
    setChart(body) {
      let xAxis = [];
      let chart1 = {
        data0: [],
        data1: [],
      };
      let chart2 = {
        data0: [],
        data1: [],
      };
      let chart3 = {
        data0: [],
        data1: [],
      };

      let count = 0;
      body.forEach(e => {
        xAxis.push(e.name);

        chart1.data0.push(e.classwork[1]);
        chart1.data1.push(e.classwork[2]);

        e.percent = e.classwork[2] > 0 ? Utils.getNumber(e.classwork[2] * 100 / (e.classwork[0] * e.classwork[1])) : 0;
        e.average = e.classwork[5] > 0 ? Utils.getNumber(e.classwork[5] / e.classwork[2]) : 0;

        chart2.data0.push(e.average);
        count += e.average;

        chart3.data0.push(e.classwork[3]);
        chart3.data1.push(e.classwork[4]);
      });

      body.forEach(e => {
        chart2.data1.push(count / body.length);

        e.index = 1;
        e.count = body.length;
        body.forEach(n => {
          if (e.id != n.id) {
            if (n.average > e.average) {
              e.index ++;
            }
          }
        });

        if (e.id == this.clss.now) {
          this.at = e;
        }
      });

      let opt1 = Utils.copy(this.chart1);
      let opt2 = Utils.copy(this.chart2);
      let opt3 = Utils.copy(this.chart3);

      opt1.xAxis.data = xAxis;
      opt1.series[0].data = chart1.data0;
      opt1.series[1].data = chart1.data1;

      opt2.xAxis.data = xAxis;
      opt2.series[0].data = chart2.data0;
      opt2.series[1].data = chart2.data1;

      opt3.xAxis.data = xAxis;
      opt3.series[0].data = chart3.data0;
      opt3.series[1].data = chart3.data1;

      this.opt1 = opt1;
      this.opt2 = opt2;
      this.opt3 = opt3;
    },
    changeYear() {
      this.step.now = 0;
      this.clss.now = 0;
    },
    changeTerm() {
      this.clss.now = 0;
    },
  }
};
</script>
