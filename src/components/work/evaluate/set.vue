<style lang="less" scoped>
textarea {
  margin-bottom: 10px;
}
.text-small {
  font-size: 12px;
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
    </div>
  </div>
  <div class="h-panel page-header">
    <div class="h-panel-body">
      <Form ref="form" labelPosition="left" :labelWidth="100">
        <FormItem label="选择学生" required>
          <Row v-for="sub in checkbox.array" :key="sub.key">
            <Cell :width='2' v-for="it in sub.list" :key="it.id" :value="it">
              <Checkbox v-model="checkbox.selects" :value="it" class="check" @change="select(it)" :style="{color: it.color}">{{it.name}}</Checkbox>
            </Cell>
          </Row>
        </FormItem>
        <br/>
        <FormItem label="综合评价" required>
          <Cell :width="16">
            <textarea v-autosize rows="4" placeholder="输入评价内容" v-model="eval"></textarea>
            <Button class="h-btn h-btn-no-border h-btn-text-primary right" @click="opened = true">快捷评语 ></Button>
          </Cell>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading" :disabled="checkbox.selects.length == 0">提 交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
  <Modal v-model="opened" type="drawer-right">
    <div class="model-right">
      <div class="title">快捷评语</div>
      <Form ref="form" labelPosition="left">
        <FormItem label="快捷评价" class="eval-radio" v-if="quick.show">
          <textarea v-autosize rows="4" placeholder="输入快捷评价" v-model="quick.val"></textarea>
        </FormItem>
        <FormItem label="选择评语" class="eval-radio" v-else>
          <Radio v-model="radio" :value="val" v-for="(val, idx) in selects" :key="idx">{{val}}</Radio>
          <div>
            <Button class="h-btn h-btn-no-border h-btn-text-primary text-small" @click="quick.show = true">新增快捷评语 +</Button>
          </div>
        </FormItem>
        <FormItem>
          <Button color="primary" circle @click="click" :loading="loading">选 择</Button>
          <Button circle @click="cancel">取 消</Button>
        </FormItem>
      </Form>
    </div>
  </Modal>
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
      checkbox: {
        array: [],
        selects: [],
      },
      radio: null,
      selects: [
        '对美术课感兴趣，能够积极配合教师的教学工作，遇到问题能够发表自己的见解，能够欣赏高雅的绘画作品，有自己独特的见解，有良好的艺术气质，能够积极参加艺术活动，并有良好的表现，期末成绩优秀',
        '对美术课感兴趣，能够积极配合教师的教学工作，但遇到问题缺少自己的见解，能够欣赏好的的艺术作品，缺少自己的见解，有良好的艺术气质，在学校活动中勇于表现自己，期末成绩合格',
        '有兴趣就听，不感兴趣就不让听，但不会影响课堂纪律。只会欣赏一般的艺术作品，深层次的作品无法理解。缺少艺术气质，只在班级里表现自己，一到大的场合就怯场',
        '对美术课不感兴趣，但不会影响课堂纪律。不会欣赏作品，只会欣赏一般的儿童作品。不会表现自己，只会在同学的再三推荐下才敢于表现',
      ],
      eval: '',
      quick: {
        show: false,
        val: null,
      },
      opened: false,
      loading: false,
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);

    let str = Utils.getCookie('quicks');
    if (str) {
      let quicks = JSON.parse(str);
      quicks.forEach(e => {
        this.selects.push(e);
      });
    }
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
    setArray(body) {
      let list = [];
      for (let i = 0; i < body.length; i += 10) {
        let sub = [];
        for (let j = i; j < i + 10 && j < body.length; j++) {
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
          this.setArray(resp.body);
        }
      });
    },
    save() {
      if (this.eval.length == 0) {
        HeyUI.$Message.error('请输入评价');
        return;
      }

      Utils.confirm(this, '确定提交该评语 ？', modal => {
        this.loading = true;
        modal.close();

        let idStudent = [];
        this.checkbox.selects.forEach(e => {
          idStudent.push(e.id);
        });
        Ajax.post('/student/eval/create', {
          eval: this.eval,
          idStudentList: idStudent.join(),
        }).then(resp => {
          this.loading = false;
          this.checkbox.selects.forEach(e => {
            e.color = '#666666';
          });
          
          this.checkbox.selects = [];
          if (resp.ok) {
            HeyUI.$Message.success('提交成功');
            this.eval = '';
          }
        });
      });
    },
    click() {
     if (this.quick.show) {
        if (this.quick.val && this.quick.val.length > 0) {
          this.selects.push(this.quick.val);
          this.quick.show = false;
          Utils.saveCookie('quicks', JSON.stringify(this.selects.slice(4)));
        } else {
          HeyUI.$Message.error('请输入内容');
        }
      } else {
        this.eval = this.radio;
        this.opened = false;
      }
    },
    cancel() {
      if (this.quick.show) {
        this.quick.show = false;
      } else {
        this.opened = false;
      }
    },
  }
};
</script>
