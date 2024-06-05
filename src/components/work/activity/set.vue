<style lang="less" scoped>
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
      <Form ref="form" labelPosition="left" :labelWidth="100" :model="form" :rules="form.rules" showErrorTip>
        <FormItem label="活动类型" prop="type">
          <Row :space-x="20" type="flex">
            <Cell :width='4'>
              <Select v-model="type.now" :datas="type.selects" @change="changeType"></Select>
            </Cell>
            <Cell :width='4'>
              <Select v-model="form.type" :datas="form.selects"></Select>
            </Cell>
          </Row>
        </FormItem>
        <FormItem label="活动名称" prop="name">
          <Cell :width='4'>
            <input type="text" v-model="form.name" placeholder="输入名称"/>
          </Cell>
        </FormItem>
        <FormItem label="参加日期" prop="created">
          <Cell :width='4'>
            <DatePicker format="YYYY-MM-DD" v-model="form.created"></DatePicker>
          </Cell>
        </FormItem>
        <FormItem label="课时数" prop="hour">
          <Cell :width='4'>
            <input type="number" v-model="form.hour"/>
          </Cell>
        </FormItem>
        <FormItem label="选择学生" required>
          <Row v-for="sub in checkbox.array" :key="sub.key">
            <Cell :width='2' v-for="it in sub.list" :key="it.id" :value="it">
              <Checkbox v-model="checkbox.selects" :value="it" class="check" @change="select(it)" :style="{color: it.color}">{{it.name}}</Checkbox>
            </Cell>
          </Row>
        </FormItem>
        <br/>
        <FormItem>
          <Button color="primary" circle @click="save" :loading="loading" :disabled="checkbox.selects.length == 0">提 交</Button>
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
      serial: {
        selects: [],
        now: 0
      },
      checkbox: {
        array: [],
        selects: [],
      },
      type: {
        selects: [
          { title: '校外学习', key: 1 },
          { title: '课外活动', key: 2 },
        ],
        now: 0
      },
      form: {
        rules: {
          number: ['hour'],
          required: ['hour', 'name', 'created', 'type']
        },
        name: null,
        created: null,
        type: null,
        hour: null,
        selects: [],
      },
      loading: false,
    };
  },
  created() {
    this.year = Utils.getYear();
    this.step = Utils.getStep();
    this.clss = Utils.getClss(this.year.now);
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
    changeType() {
      switch (this.type.now) {
        case 1:
          this.form.selects = [
            { title: '艺术学习', key: 11 },
            { title: '艺术实践', key: 12 },
          ];
          break;
        case 2:
          this.form.selects = [
            { title: '兴趣小组', key: 21 },
            { title: '社团活动', key: 22 },
            { title: '其他活动', key: 23 },
          ];
          break;
        default:
          this.form.selects = [];
          break;
      }
      this.form.type = 0;
    },
    save() {
      let ok = this.$refs.form.valid();
      if (!ok) return;

      Utils.confirm(this, '确定提交该活动 ？', modal => {
        this.loading = true;
        modal.close();

        let idStudent = [];
        let exStudent = [];
        this.checkbox.selects.forEach(e => {
          idStudent.push(e.id);
          exStudent.push(e.name);
        });
        Ajax.post('/stu/action/create', {
          semester: this.step.now,
          name: this.form.name,
          type: this.form.type,
          hour: this.form.hour,
          created: Utils.getStamp(this.form.created),
          idClass: this.clss.now,
          idStudentList: idStudent.join(),
          exStudentList: exStudent.join(),
        }).then(resp => {
          this.loading = false;
          this.checkbox.selects.forEach(e => {
            e.color = '#666666';
          });
          
          this.checkbox.selects = [];
          if (resp.ok) {
            HeyUI.$Message.success('提交成功');
          }
        });
      });
    }
  }
};
</script>
