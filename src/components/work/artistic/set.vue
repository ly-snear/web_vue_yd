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
        <FormItem label="类型" prop="type">
          <Cell :width='5'>
            <Select v-model="form.type" :datas="selects"></Select>
          </Cell>
        </FormItem>
        <FormItem label="证书" prop="name">
          <Row :space-x="50" type="flex">
            <Cell :width='5'>
              <input type="text" v-model="form.name" placeholder="输入名称"/>
            </Cell>
            <Cell :width='5'>
              <Qiniu className="cert-image" :options="upload.options" type="image" data-type="url" v-model="form.cert"></Qiniu>
            </Cell>
          </Row>
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
      selects: [
        { title: '声乐', key: 1 },
        { title: '器乐', key: 2 },
        { title: '舞蹈', key: 3 },
        { title: '戏剧', key: 4 },
        { title: '戏曲', key: 5 },
        { title: '绘画', key: 6 },
        { title: '书法', key: 7 },
        { title: '其他', key: 100 },
      ],
      form: {
        rules: {
          required: ['name', 'type', 'cert']
        },
        name: null,
        type: null,
        cert: null,
        selects: [],
      },
      loading: false,
      upload: {
        options: {
          max_file_size: '1mb'
        },
      },
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
    save() {
      let ok = this.$refs.form.valid();
      if (!ok) return;

      Utils.confirm(this, '确定提交该特长 ？', modal => {
        this.loading = true;
        modal.close();

        let idStudent = [];
        let exStudent = [];
        this.checkbox.selects.forEach(e => {
          idStudent.push(e.id);
          exStudent.push(e.name);
        });
        Ajax.post('/stu/skill/create', {
          semester: this.step.now,
          name: this.form.name,
          type: this.form.type,
          cert: this.form.cert,
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
    },
  }
};
</script>
