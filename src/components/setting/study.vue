<style lang="less" scoped>
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
      <br/>
      <Form class="form" labelPosition="left" :labelWidth="140">
        <FormItem label="基础知识（20分）">
          <Row type="flex" :space="30" v-for="(it, idx) in array1" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">平均分达到</span>
                <input type="text" v-model="it.level"/>
                <span class="h-input-addon">分 ，获得综合分</span>
                <input type="text" v-model="it.score"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="2">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(array1, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(array1, idx)"></i>
              </div>
            </Cell>
          </Row>
        </FormItem>
        <FormItem label="基本技能（20分）">
          <Row type="flex" :space="30" v-for="(it, idx) in array2" :key="idx">
            <Cell :width="10">
              <div class="h-input-group">
                <span class="h-input-addon">平均分达到</span>
                <input type="text" v-model="it.level"/>
                <span class="h-input-addon">分 ，获得综合分</span>
                <input type="text" v-model="it.score"/>
                <span class="h-input-addon">分</span>
              </div>
            </Cell>
            <Cell :width="5">
              <div class="btns">
                <i class="h-icon-plus green-color" @click="add(array2, idx)"></i>
                <i class="h-icon-trash green-color" @click="del(array2, idx)"></i>
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
      id: null,
      array1: [{}],
      array2: [{}],
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
      if (body.levelKnow1.length > 0 && body.scoreKnow1.length > 0) {
        let level = body.levelKnow1.split(',');
        let score = body.scoreKnow1.split(',');

        for (let i = 0; i < level.length; i++) {
          this.array1.splice(i, 0, {
            level: level[i],
            score: score[i]
          });
        }
      }
      if (body.levelKnow2.length > 0 && body.scoreKnow2.length > 0) {
        let level = body.levelKnow2.split(',');
        let score = body.scoreKnow2.split(',');

        for (let i = 0; i < level.length; i++) {
          this.array2.splice(i, 0, {
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
      let levelKnow1 = [];
      let scoreKnow1 = [];
      let levelKnow2 = [];
      let scoreKnow2 = [];

      this.array1.forEach(e => {
        if (e.level && e.score) {
          levelKnow1.push(e.level);
          scoreKnow1.push(e.score);
        }
      });
      this.array2.forEach(e => {
        if (e.level && e.score) {
          levelKnow2.push(e.level);
          scoreKnow2.push(e.score);
        }
      });

      Utils.confirm(this, '确定提交该设置 ？', modal => {
        this.loading = true;
        modal.close();

        if (this.id && this.id > 0) {
          Ajax.post('/setting/update', {
            id: this.id,
            levelKnow1: levelKnow1.join(),
            scoreKnow1: scoreKnow1.join(),
            levelKnow2: levelKnow2.join(),
            scoreKnow2: scoreKnow2.join(),
          }).then(resp => {
            this.loading = false;
            if (resp.ok) {
              HeyUI.$Message.success('提交成功');
            }
          });
        } else {
          Ajax.post('/setting/create', {
            levelKnow1: levelKnow1.join(),
            scoreKnow1: scoreKnow1.join(),
            levelKnow2: levelKnow2.join(),
            scoreKnow2: scoreKnow2.join(),
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