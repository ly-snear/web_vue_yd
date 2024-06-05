<style lang="less" scoped>
.title {
  width: 100%;
  font-size: 30px;
  text-align: center;
  color: gray;
  margin-bottom: 30px;
}
.number {
  width: 100%;
  font-size: 60px;
  text-align: center;
  color: @primary-color;
}
</style>
<template>
  <div class="frame-page">
    <Row :space="30">
      <Cell :width='8'>
        <div class="h-panel">
          <div class="h-panel-body">
            <div class="title">学校数</div>
            <div class="number"><ICountUp :endVal="count.school || 0"/></div>
          </div>
        </div>
      </Cell>
      <Cell :width='8'>
        <div class="h-panel">
          <div class="h-panel-body">
            <div class="title">教师数</div>
            <div class="number"><ICountUp :endVal="count.teacher || 0"/></div>
          </div>
        </div>
      </Cell>
      <Cell :width='8'>
        <div class="h-panel">
          <div class="h-panel-body">
            <div class="title">学生数</div>
            <div class="number"><ICountUp :endVal="count.student || 0"/></div>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
export default {
  components: {
		ICountUp
	},
  data() {
    return {
      count: {}
    };
  },
  created() {
    Ajax.get('/dashboard/count', {}).then(resp => {
      if (resp.ok) {
        this.count = resp.body;
      }
    });

    Ajax.get('/dashboard/setup', {}).then(resp => {
      if (resp.ok) {
        G.set('organizes', resp.body.organize);
        G.set('classes', resp.body.class);
        G.set('years', resp.body.year);
      }
    });
  },
  methods: {
    submit() {
    }
  }
};
</script>
