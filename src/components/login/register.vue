<style lang="less" scoped>
  .register {
    margin-top: 20px;
  }
</style>
<template>
  <div class="register">
    <input type="text" placeholder="请输入账号" v-model="data.username"/>
    <input type="text" placeholder="请设置登录密码" v-model="data.password"/>
    <input type="text" placeholder="请确认输入密码" v-model="checkcode"/>
    <Button color="primary" block size="l" @click="submit">立即注册</Button>
    <div class="text-info">已有账号？<span @click="path('Login')">登录</span></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      checkcode: ''
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
