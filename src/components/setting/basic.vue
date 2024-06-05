<style lang="less" scoped>
.h-tabs {
  margin-bottom: 40px;
}
.form {
  margin-left: 20px;

  .h-row {
    margin-bottom: 20px;
  }

  .btns {
    margin-top: 14px;

    i {
      font-size: 14px;
      margin-right: 14px;
      cursor: pointer;
    }
  }
}
</style>
<template>
<div class="frame-page">
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Tabs :datas="selects" v-model="tab"></Tabs>
      <Form class="form" labelPosition="left" :labelWidth="140" v-if="tab == 1">
        <FormItem label="考勤（5分）">
          <Row type="flex" :space="30" v-for="(it, idx) in array10" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">出勤率达到</span>
                <input type="text" v-model="it.level"/>
                <span class="h-input-addon">% ，获得综合分</span>
                <input type="text" v-model="it.score"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="2">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(array10, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(array10, idx)"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem label="回答问题（5分）">
          <Row type="flex" :space="30" v-for="(it, idx) in array1" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">回答正确率</span>
                <input type="text" v-model="it.level"/>
                <span class="h-input-addon">% ，获得综合分</span>
                <input type="text" v-model="it.score"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="5">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(array1, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(array1, idx)"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem label="小组活动（5分）">
          <Row type="flex" :space="30" v-for="(it, idx) in array2" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">&nbsp;&nbsp;代表发言&nbsp;&nbsp;</span>
                <input type="text" v-model="it.level1"/>
                <span class="h-input-addon">次 ，获得综合分</span>
                <input type="text" v-model="it.score1"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">&nbsp;&nbsp;优秀小组&nbsp;&nbsp;</span>
                <input type="text" v-model="it.level2"/>
                <span class="h-input-addon">次 ，获得综合分</span>
                <input type="text" v-model="it.score2"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="2">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(array2, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(array2, idx)"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem label="课堂作品（5分）">
          <Row type="flex" :space="30" v-for="(it, idx) in array3" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">&nbsp;&nbsp;正常提交&nbsp;&nbsp;</span>
                <input type="text" v-model="it.level1"/>
                <span class="h-input-addon">次 ，获得综合分</span>
                <input type="text" v-model="it.score1"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">&nbsp;&nbsp;优秀作品&nbsp;&nbsp;</span>
                <input type="text" v-model="it.level2"/>
                <span class="h-input-addon">次 ，获得综合分</span>
                <input type="text" v-model="it.score2"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="2">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(array3, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(array3, idx)"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem label="课堂表现（5分）">
          <Row type="flex" :space="30" v-for="(it, idx) in array4" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">&nbsp;&nbsp;表现良好&nbsp;&nbsp;</span>
                <input type="text" v-model="it.level1"/>
                <span class="h-input-addon">次 ，获得综合分</span>
                <input type="text" v-model="it.score1"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">&nbsp;&nbsp;表现优秀&nbsp;&nbsp;</span>
                <input type="text" v-model="it.level2"/>
                <span class="h-input-addon">次 ，获得综合分</span>
                <input type="text" v-model="it.score2"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="2">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(array4, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(array4, idx)"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
        </FormItem>
      </Form>
      <Form class="form" labelPosition="left" :labelWidth="140" v-if="tab == 2">
        <FormItem label="课堂任务（15分）">
          <Row type="flex" :space="30" v-for="(it, idx) in arrayWk" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">平均分达到</span>
                <input type="text" v-model="it.level"/>
                <span class="h-input-addon">次 ，获得综合分</span>
                <input type="text" v-model="it.score"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="2">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(arrayWk, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(arrayWk, idx)"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tab: 1,
      selects: [
        { title: '课堂学习（25分）', key: 1 },
        { title: '课堂任务（15分）', key: 2 },
      ],
      id: null,
      array1: [{}],
      array2: [{}],
      array3: [{}],
      array4: [{}],
      array10: [{}],
      arrayWk: [{}],
    };
  },
  created() {
    Ajax.get('/setting/read', {
    }).then(resp => {
      if (resp.ok) {
        if (resp.body) {
          this.setArray(resp.body);
        }
      }
    });
  },
  methods: {
    setArray(body) {
      this.id = body.id;
      if (body.levelRoom1.length > 0 && body.scoreRoom1.length > 0) {
        let level = body.levelRoom1.split(',');
        let score = body.scoreRoom1.split(',');

        for (let i = 0; i < level.length; i++) {
          this.array1.splice(i, 0, {
            level: level[i],
            score: score[i]
          });
        }
      }
      if (body.levelRoom2.length > 0 && body.scoreRoom2.length > 0) {
        let level = body.levelRoom2.split(',');
        let score = body.scoreRoom2.split(',');

        for (let i = 0; i < level.length; i++) {
          let ll = level[i].split('|');
          let ss = score[i].split('|');

          this.array2.splice(i, 0, {
            level1: ll[0],
            score1: ss[0],
            level2: ll[1],
            score2: ss[1],
          });
        }
      }
      if (body.levelRoom3.length > 0 && body.scoreRoom3.length > 0) {
        let level = body.levelRoom3.split(',');
        let score = body.scoreRoom3.split(',');

        for (let i = 0; i < level.length; i++) {
          let ll = level[i].split('|');
          let ss = score[i].split('|');

          this.array3.splice(i, 0, {
            level1: ll[0],
            score1: ss[0],
            level2: ll[1],
            score2: ss[1],
          });
        }
      }
      if (body.levelRoom4.length > 0 && body.scoreRoom4.length > 0) {
        let level = body.levelRoom4.split(',');
        let score = body.scoreRoom4.split(',');

        for (let i = 0; i < level.length; i++) {
          let ll = level[i].split('|');
          let ss = score[i].split('|');

          this.array4.splice(i, 0, {
            level1: ll[0],
            score1: ss[0],
            level2: ll[1],
            score2: ss[1],
          });
        }
      }
      if (body.levelRoom10.length > 0 && body.scoreRoom10.length > 0) {
        let level = body.levelRoom10.split(',');
        let score = body.scoreRoom10.split(',');

        for (let i = 0; i < level.length; i++) {
          this.array10.splice(i, 0, {
            level: level[i],
            score: score[i]
          });
        }
      }
      if (body.levelWork.length > 0 && body.scoreWork.length > 0) {
        let level = body.levelRoom10.split(',');
        let score = body.scoreRoom10.split(',');

        for (let i = 0; i < level.length; i++) {
          this.arrayWk.splice(i, 0, {
            level: level[i],
            score: score[i]
          });
        }
      }
    },
    add(list, idx) {
      list.splice(idx + 1, 0, {});
    },
    del(list, idx) {
      if (list.length > 1) {
        list.splice(idx, 1);
      }
    },
    save() {
      let levelRoom1 = [];
      let scoreRoom1 = [];
      let levelRoom2 = [];
      let scoreRoom2 = [];
      let levelRoom3 = [];
      let scoreRoom3 = [];
      let levelRoom4 = [];
      let scoreRoom4 = [];
      let levelRoom10 = [];
      let scoreRoom10 = [];
      let levelWork = [];
      let scoreWork = [];

      this.array1.forEach(e => {
        if (e.level && e.score) {
          levelRoom1.push(e.level);
          scoreRoom1.push(e.score);
        }
      });
      this.array2.forEach(e => {
        if (e.level1 && e.score1 && e.level2 && e.score2) {
          levelRoom2.push(e.level1 + '|' + e.level2);
          scoreRoom2.push(e.score1 + '|' + e.score2);
        }
      });
      this.array3.forEach(e => {
        if (e.level1 && e.score1 && e.level2 && e.score2) {
          levelRoom3.push(e.level1 + '|' + e.level2);
          scoreRoom3.push(e.score1 + '|' + e.score2);
        }
      });
      this.array4.forEach(e => {
        if (e.level1 && e.score1 && e.level2 && e.score2) {
          levelRoom4.push(e.level1 + '|' + e.level2);
          scoreRoom4.push(e.score1 + '|' + e.score2);
        }
      });
      this.array10.forEach(e => {
        if (e.level && e.score) {
          levelRoom10.push(e.level);
          scoreRoom10.push(e.score);
        }
      });
      this.arrayWk.forEach(e => {
        if (e.level && e.score) {
          levelWork.push(e.level);
          scoreWork.push(e.score);
        }
      });

      Utils.confirm(this, '确定提交该设置 ？', modal => {
        this.loading = true;
        modal.close();

        if (this.id && this.id > 0) {
          Ajax.post('/setting/update', {
            id: this.id,
            levelRoom1: levelRoom1.join(),
            levelRoom2: levelRoom2.join(),
            levelRoom3: levelRoom3.join(),
            levelRoom4: levelRoom4.join(),
            levelRoom10: levelRoom10.join(),
            scoreRoom1: scoreRoom1.join(),
            scoreRoom2: scoreRoom2.join(),
            scoreRoom3: scoreRoom3.join(),
            scoreRoom4: scoreRoom4.join(),
            scoreRoom10: scoreRoom10.join(),
            levelWork: levelWork.join(),
            scoreWork: scoreWork.join(),
          }).then(resp => {
            this.loading = false;
            if (resp.ok) {
              HeyUI.$Message.success('提交成功');
            }
          });
        } else {
          Ajax.post('/setting/create', {
            levelRoom1: levelRoom1.join(),
            levelRoom2: levelRoom2.join(),
            levelRoom3: levelRoom3.join(),
            levelRoom4: levelRoom4.join(),
            levelRoom10: levelRoom10.join(),
            scoreRoom1: scoreRoom1.join(),
            scoreRoom2: scoreRoom2.join(),
            scoreRoom3: scoreRoom3.join(),
            scoreRoom4: scoreRoom4.join(),
            scoreRoom10: scoreRoom10.join(),
            levelWork: levelWork.join(),
            scoreWork: scoreWork.join(),
          }).then(resp => {
            this.loading = false;
            if (resp.ok) {
              HeyUI.$Message.success('提交成功');
              this.id = resp.body.id;
            }
          });
        }
      });
    },
  }
};
</script>