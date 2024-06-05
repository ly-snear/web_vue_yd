<style lang="less" scoped>
</style>
<template>
<div>
</div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {
    if (this.$route.query.token) {
      Ajax.get('/user/token', {
        token: this.$route.query.token
      }).then(resp => {
        if (resp.ok) {
          this.go(resp.body);
        } else {
          this.$router.replace({ name: 'Welcome' });
        }
      });
    } else
      this.$router.replace({ name: 'Welcome' });
  },
  methods: {
    go(body) {
      if (!body.token) return;

      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }

      G.set('user', body);
      this.$router.replace({ name: this.$route.query.go });
    },
  }
};
</script>