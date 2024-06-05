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
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Chart :initOptions="chart1" :options="opt1"></Chart>
    </div>
  </div>
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Chart :initOptions="chart2" :options="opt2"></Chart>
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
      chart1: {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        grid: {
          x: 70,
          y: 50,
          x2: 30,
          y2: 30,
        },
        legend: {
          data: ['声乐', '器乐', '舞蹈', '戏剧', '戏曲', '绘画', '书法', '其他'],
          orient: 'horizontal',
          left: 'right',
          icon: "roundRect",
          itemWidth: 40,
          itemHeight: 4,
        },
        yAxis: {
          type: 'category',
          data: []
        },
        xAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            name: '声乐',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 0, 0, 4],
              }
            }
          },
          {
            data: [],
            name: '器乐',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
          },
          {
            data: [],
            name: '舞蹈',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
          },
          {
            data: [],
            name: '戏剧',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
          },
          {
            data: [],
            name: '戏曲',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
          },
          {
            data: [],
            name: '绘画',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
          },
          {
            data: [],
            name: '书法',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
          },
          {
            data: [],
            name: '其他',
            type: 'bar',
            stack: 'total',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 4, 4, 0],
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
      opt1: {},
      opt2: {},
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();

    this.init();
  },
  methods: {
    init() {
      Ajax.get('/stu/skill/stat', {
        semester: this.step.now,
        idYear: this.year.now,
      }).then(resp => {
        if (resp.ok) {
          this.setChart(resp.body);
        }
      });
    },
    setChart(body) {
      let axis = [];
      let chart1 = {
        data0: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: [],
        data6: [],
        data7: [],
      };
      let chart2 = {
        data: [
          { value: 0, name: '声乐' },
          { value: 0, name: '器乐' },
          { value: 0, name: '舞蹈' },
          { value: 0, name: '戏剧' },
          { value: 0, name: '戏曲' },
          { value: 0, name: '绘画' },
          { value: 0, name: '书法' },
          { value: 0, name: '其他' },
        ],
      };

      body.forEach(e => {
        axis.push(e.name);

        chart1.data0.push(e.skillType[0]);
        chart1.data1.push(e.skillType[1]);
        chart1.data2.push(e.skillType[2]);
        chart1.data3.push(e.skillType[3]);
        chart1.data4.push(e.skillType[4]);
        chart1.data5.push(e.skillType[5]);
        chart1.data6.push(e.skillType[6]);
        chart1.data7.push(e.skillType[7]);

        chart2.data[0].value += e.skillType[0];
        chart2.data[1].value += e.skillType[1];
        chart2.data[2].value += e.skillType[2];
        chart2.data[3].value += e.skillType[3];
        chart2.data[4].value += e.skillType[4];
        chart2.data[5].value += e.skillType[5];
        chart2.data[6].value += e.skillType[6];
        chart2.data[7].value += e.skillType[7];
      });

      let opt1 = Utils.copy(this.chart1);
      let opt2 = Utils.copy(this.chart2);

      opt1.yAxis.data = axis;
      opt1.series[0].data = chart1.data0;
      opt1.series[1].data = chart1.data1;
      opt1.series[2].data = chart1.data2;
      opt1.series[3].data = chart1.data3;
      opt1.series[4].data = chart1.data4;
      opt1.series[5].data = chart1.data5;
      opt1.series[6].data = chart1.data6;
      opt1.series[7].data = chart1.data7;

      opt2.series[0].data = chart2.data;

      this.opt1 = opt1;
      this.opt2 = opt2;
    },
    changeYear() {
      this.step.now = 0;
    },
    changeTerm() {
    },
  }
};
</script>
