<style lang="less" scoped>
  .forget {
    input {
      margin-top: 60px;
      margin-bottom: 20px;
    }
  }
</style>
<template>
  <div class="forget">
    <input type="text" placeholder="请输入正确的手机号/邮箱" v-model="data.mail"/>
    <Button text-color="primary" size="l" @click="submit">取 消</Button>
    <Button color="primary" size="l" @click="submit" class="right">确 认</Button>
    <div class="text-info">还没有账号？<span>联系客服</span></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {
    path(name) {
      this.$router.push({ name });
    },
    submit() {

    }
  }
};
</script>
