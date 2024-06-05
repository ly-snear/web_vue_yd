<style lang="less" scoped>
.echarts-vue {
  height: 340px;
}
.title {
  font-weight: bold;
  font-size: 16px;
  color: @primary-color;
  letter-spacing: 2px;
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
          <Select v-model="clss.now" :datas="clss.selects" placeholder="选择班级"></Select>
        </Cell>
        <Cell :width='4'>
          <Button color="primary" circle size="l" @click="init()" :disabled="!(year.now > 0 && step.now > 0)">搜索</Button>
        </Cell>
      </Row>
    </div>
  </div>
  <Row :space-x="30">
    <Cell :width='16'>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <div class="title">小组活动</div>
          <Chart :initOptions="chart1" :options="opt1"></Chart>
        </div>
      </div>
    </Cell>
    <Cell :width='8'>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <div class="title">回答问题</div>
          <Chart :initOptions="chart2" :options="opt2"></Chart>
        </div>
      </div>
    </Cell>
  </Row>
  <Row :space-x="30">
    <Cell :width='16'>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <div class="title">课堂表现</div>
          <Chart :initOptions="chart3" :options="opt3"></Chart>
        </div>
      </div>
    </Cell>
    <Cell :width='8'>
      <div class="h-panel page-header">
        <div class="h-panel-body">
          <div class="title">优秀作品</div>
          <Chart :initOptions="chart4" :options="opt4"></Chart>
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
          data: ['代表发言', '优秀小组'],
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
          type: 'value',
          interval: 1
        },
        series: [
          {
            data: [],
            name: '代表发言',
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#ffae00',
                lineStyle: {
                  width: 4
                }
              }
            }
          },
          {
            data: [],
            name: '优秀小组',
            type: 'line',
            symbol: 'none',
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
        title:{
          text: '',
          left: 'center',
          top: '50%',
          textStyle: {
            color: '#13ce66',
            fontSize: 17,
          }
        },
        graphic:{
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: '正确率',
            fill: '#13ce66',
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        color: ['#d3d3d3', '#13ce66'],
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
          data: ['待努力', '良好', '优秀'],
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
            name: '待努力',
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
            name: '良好',
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
            name: '优秀',
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
      chart4: {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        title: {
          text: '',
          left: 'center',
          top: '50%',
          textStyle: {
            color: '#ffae00',
            fontSize: 17,
          }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: '优秀率',
            fill: '#ffae00',
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        color: ['#d3d3d3', '#ffae00'],
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
      opt1: {},
      opt2: {},
      opt3: {},
      opt4: {},
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

      Ajax.get('/stu/room/stat/participate', {
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
      let chart3 = {
        data0: [],
        data1: [],
        data2: [],
      };
      let chart2 = {};
      let chart4 = {};

      body.forEach(e => {
        xAxis.push(e.name);

        chart1.data0.push(e.classroomType2[1]);
        chart1.data1.push(e.classroomType2[2]);

        chart3.data0.push(e.classroomType4[0]);
        chart3.data1.push(e.classroomType4[1]);
        chart3.data2.push(e.classroomType4[2]);

        if (e.id == this.clss.now) {
          let v2 = e.classroomType1[1] > 0 ? e.classroomType1[1] * 100 / (e.classroomType1[0] + e.classroomType1[1]) : 0;
          let v4 = e.classroomType3[2] > 0 ? e.classroomType3[2] * 100 / (e.classroomType3[0] + e.classroomType3[1] + e.classroomType3[2]) : 0;

          chart2 = {
            data: [
              { value: e.classroomType1[0], name: '错误' },
              { value: e.classroomType1[1], name: '正确' },
            ],
            text: Math.round(v2) + '%',
          };

          chart4 = {
            data: [
              { value: e.classroomType3[0] + e.classroomType3[1], name: '一般' },
              { value: e.classroomType3[2], name: '优秀' },
            ],
            text: Math.round(v4) + '%',
          };
        }
      });

      let opt1 = Utils.copy(this.chart1);
      let opt2 = Utils.copy(this.chart2);
      let opt3 = Utils.copy(this.chart3);
      let opt4 = Utils.copy(this.chart4);

      opt1.xAxis.data = xAxis;
      opt1.series[0].data = chart1.data0;
      opt1.series[1].data = chart1.data1;

      opt3.xAxis.data = xAxis;
      opt3.series[0].data = chart3.data0;
      opt3.series[1].data = chart3.data1;
      opt3.series[2].data = chart3.data2;

      opt2.series[0].data = chart2.data;
      opt2.title.text = chart2.text;

      opt4.series[0].data = chart4.data;
      opt4.title.text = chart4.text;

      this.opt1 = opt1;
      this.opt2 = opt2;
      this.opt3 = opt3;
      this.opt4 = opt4;
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
