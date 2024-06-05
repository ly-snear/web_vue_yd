<style lang="less" scoped>
.echarts-vue {
  height: 340px;
}
.title {
  font-weight: bold;
  font-size: 16px;
  color: @primary-color;
  letter-spacing: 2px;
  text-align: center;
  margin-top: 20px;
}
img {
  margin: 24px 30px;
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
  <Row :space-x="30">
    <Cell :width='16'>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Chart :initOptions="chart1" :options="opt1"></Chart>
        </div>
      </div>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Chart :initOptions="chart3" :options="opt3"></Chart>
        </div>
      </div>
    </Cell>
    <Cell :width='8'>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <Chart :initOptions="chart2" :options="opt2"></Chart>
          <div class="title">总课时</div>
          <img src="/static/images/activity/stat.png">
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
          data: ['校外学习', '课外活动'],
          orient: 'horizontal',
          left: 'right',
          icon: "roundRect",
          itemWidth: 40,
          itemHeight: 4,
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
            name: '校外学习',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '课外活动',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0],
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
        series: [
          {
            data: [],
            radius: ['40%', '80%'],
            type: 'pie',
            label: {
              normal: {
                show: false,
              },
            },
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
          data: ['艺术学习', '艺术实践', '兴趣小组', '社团活动', '其他活动'],
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
            name: '艺术学习',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '艺术实践',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '兴趣小组',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '社团活动',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          },
          {
            data: [],
            name: '其他活动',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0],
              }
            }
          }
        ],
      },
      opt1: {},
      opt2: {},
      opt3: {},
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/stu/action/stat', {
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
        data: [
          { value: 0, name: '校外学习' },
          { value: 0, name: '课外活动' },
        ],
      };
      let chart3 = {
        data0: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
      };

      body.forEach(e => {
        xAxis.push(e.name);

        chart1.data0.push(e.actionHour[0] + e.actionHour[1]);
        chart1.data1.push(e.actionHour[2] + e.actionHour[3] + e.actionHour[4]);

        chart2.data[0].value += e.actionHour[0] + e.actionHour[1];
        chart2.data[1].value += e.actionHour[2] + e.actionHour[3] + e.actionHour[4];

        chart3.data0.push(e.actionHour[0]);
        chart3.data1.push(e.actionHour[1]);
        chart3.data2.push(e.actionHour[2]);
        chart3.data3.push(e.actionHour[3]);
        chart3.data4.push(e.actionHour[4]);
      });

      let opt1 = Utils.copy(this.chart1);
      let opt2 = Utils.copy(this.chart2);
      let opt3 = Utils.copy(this.chart3);

      opt1.xAxis.data = xAxis;
      opt1.series[0].data = chart1.data0;
      opt1.series[1].data = chart1.data1;

      opt2.series[0].data = chart2.data;

      opt3.xAxis.data = xAxis;
      opt3.series[0].data = chart3.data0;
      opt3.series[1].data = chart3.data1;
      opt3.series[2].data = chart3.data2;
      opt3.series[3].data = chart3.data3;
      opt3.series[4].data = chart3.data4;

      this.opt1 = opt1;
      this.opt2 = opt2;
      this.opt3 = opt3;
    },
    changeYear() {
      this.step.now = 0;
    },
    changeTerm() {
    },
  }
};
</script>
