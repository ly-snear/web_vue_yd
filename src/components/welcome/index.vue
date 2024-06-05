<style lang='less' scoped>
  .container {
    background: url(../../images/welcome/background.png);
    background-size: cover;
    .content {
      width: 100%;
      max-height: 90%;
    }
    .click {
      width: 80%;
      max-height: 46%;
      margin-left: 9%;
      margin-bottom: 10%;
      cursor: pointer;
    }
  }
</style>
<template>
  <div class="full-screen container">
    <img class="content fixed-bottom" src="../../images/welcome/content.png"/>
    <img class="click fixed-bottom" src="../../images/welcome/click.png" @click="login"/>
  </div>
</template>
<script>
export default {
  created() {
    let str = Utils.getCookie('user');
    if (str) {
      let user = JSON.parse(str);
      G.set('user', user);
      this.$router.replace({ name: 'Home' });
    }
  },
  methods: {
    login() {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>
