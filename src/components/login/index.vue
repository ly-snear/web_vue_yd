<style lang="less" scoped>
input {
  margin-bottom: 20px;
}
</style>
<template>
  <div class="login">
    <!-- <div class="text-center" @click="path('Forget')">忘记密码</div> -->
    <br/>
    <input type="text" placeholder="请输入账号" v-model="data.username"/>
    <input type="password" placeholder="请输入登录密码" v-model="data.password" @keyup.enter="submit"/>
    <Button color="primary" block size="l" @click="submit">登 录</Button>
    <div class="text-info">还没有账号？<span v-tooltip placement="bottom" content="010-88123433">联系客服</span></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    path(name) {
      this.$router.push({ name });
    },
    submit() {
      Ajax.post('/user/login', this.data).then(resp => {
        if (resp.ok) {
          G.set('user', resp.body);
          this.$store.commit('setUser', resp.body);
          this.$store.commit('setToken', resp.body.token);
          console.log(`存储令牌：${this.$store.state.token}...`);
          console.log(`登录用户：${this.$store.state.user}...`);
          Utils.saveCookie('user', JSON.stringify(resp.body));
          this.$router.replace({ name: 'Home' });
        }
      });
    }
  }
};
</script>
