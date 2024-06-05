<style lang="less" scoped>
.page-main {
  margin-bottom: 30px;

  textarea {
    margin-top: 12px;
  }

  .h-form .h-form-item {
    padding-bottom: 0;
    position: relative;
  }

  .check {
    cursor: pointer;
    margin-right: 30px;
  }

  .btn {
    margin-right: 20px;
  }
}
</style>
<template>
  <div class="frame-page">
    <div class="h-panel page-main">
      <div class="h-panel-body">
        <Row :space="20">
          <Cell :width='4'>
            <Select v-model="year.now" :datas="year.selects" disabled></Select>
          </Cell>
          <Cell :width='4'>
            <Select v-model="step.now" :datas="step.selects" disabled></Select>
          </Cell>
        </Row>
      </div>
    </div>
    <div class="h-panel page-main">
      <div class="h-panel-body">
        <Form ref="form">
          <Row :space="40">
            <Cell :width='8'>
              <FormItem label="作业名称">
                <input type="text" placeholder="输入名称" v-model="form.name"/>
              </FormItem>
            </Cell>
            <Cell :width='8'>
              <FormItem label="截止日期">
                <DatePicker format="YYYY-MM-DD" v-model="form.date"></DatePicker>
              </FormItem>
            </Cell>
            <Cell :width='8'>
              <FormItem label="作业总分">
                <NumberInput v-model="form.total" :useOperate="true"></NumberInput>
              </FormItem>
            </Cell>
          </Row>
          <Row :space="40">
            <Cell>
              <FormItem label="作业内容">
                <textarea v-autosize rows="4" placeholder="输入内容" v-model="form.content"></textarea>
              </FormItem>
            </Cell>
          </Row>
          <Row :space="40">
            <Cell>
              <FormItem label="关联班级">
                <Checkbox class="check" v-for="it in checkbox.array" :key="it.key" :value="it"
                          :style="{color: it.color}" v-model="checkbox.selects">{{ it.title }}
                </Checkbox>
              </FormItem>
            </Cell>
          </Row>
          <Row :space="40">
            <Cell>
              <br/>
              <FormItem>
                <Button color="primary btn" circle @click="save" :loading="loading">保 存</Button>
                <Button circle @click="reset">重 置</Button>
              </FormItem>
            </Cell>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from '../../../js/common/event-bus';

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
      checkbox: {
        array: [],
        selects: []
      },
      loading: false,
      form: {
        total: 0
      }
    };
  },
  created() {
    if (this.$route.query.token) {
      let token = this.$route.query.token;
      console.log('令牌：' + token);
      this.loading = true;
      Ajax.get('/user/token', {
        token: token
      }).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.go(resp.body);
        } else {
          this.$router.replace({ name: 'Login' });
        }
      });
    } else {
      this.boot();
    }
  },
  methods: {
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      localStorage.setItem('user', JSON.stringify(body));
      this.$store.commit('setUser', body);
      Utils.saveCookie('user', JSON.stringify(body));
      // console.log('---执行调用---');
      EventBus.$emit('message_resource_login_ok', {});
      this.boot();
    },
    boot() {
      // console.log('从boot引导... ...');
      this.getYear();
      // this.year = Utils.getYear();
      // console.log(this.year);
      // this.step = Utils.getStep();
      // console.log(this.step);
      this.getTerm();
      // this.checkbox.array = Utils.getClss(this.year.now).selects;
      this.getClasss();
    },
    getYear() {
      let url = '/year/list';
      let param = {};
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到学年列表`);
          }
          if (resp.body && resp.body.length > 0) {
            for (let i = 0; i < resp.body.length; i++) {
              this.year.selects.push({
                key: resp.body[i].id,
                title: resp.body[i].name
              });
              if (i == resp.body.length - 1) {
                this.year.now = resp.body[i].id;
              }
            }
          }
        } else {
          console.log('获取学年数据，错误-->', resp.msg);
        }
      });
    },
    getTerm() {
      this.step.selects = [
        { title: '上学期', key: 1 },
        { title: '下学期', key: 2 }
      ];
      this.step.now = 2;
    },
    getClasss() {
      let url = '/class/list';
      let param = {};
      Ajax.get(url, param).then((resp) => {
        if (resp.ok) {
          if (!resp.body) {
            console.log(`没有找到教师班级`);
          }
          if (resp.body && resp.body.length > 0) {
            for (let i = 0; i < resp.body.length; i++) {
              this.checkbox.array.push({
                key: resp.body[i].id,
                title: resp.body[i].name
              });
            }
          }
        } else {
          console.log('获取教师班级数据，错误-->', resp.msg);
        }
      });
    },
    save() {
      if (!this.checkbox.selects || this.checkbox.selects.length == 0) {
        HeyUI.$Message.error('选择班级');
        return;
      }
      if (!this.form.name || !this.form.content || !this.form.total || !this.form.date) {
        HeyUI.$Message.error('全部输入');
        return;
      }
      Utils.confirm(this, '确定提交该课堂任务 ？', modal => {
        this.loading = true;
        modal.close();

        let ids = [];
        if (this.checkbox.selects) {
          this.checkbox.selects.forEach(e => {
            ids.push(e.key);
          });
        }

        Ajax.post('/work/create', Utils.extend(this.form, {
          semester: this.step.now,
          end: Utils.getStamp(this.form.date),
          idClassList: ids.join()
        })).then(resp => {
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('保存成功');
            this.reset();
          }
        });
      });
    },
    reset() {
      this.checkbox.selects = [];
      this.form = {
        name: '',
        content: '',
        end: '',
        score: 0
      };
    }
  }
};
</script>
