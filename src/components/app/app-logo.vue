<style lang='less'>
.app-logo{
  padding: 0px 24px;
  margin-bottom: 30px;
  line-height: @layout-header-height;
  height: @layout-header-height;
  overflow: hidden;
  white-space: nowrap;
  transition: padding .3s;
  cursor: pointer;
  .app-logo-icon {
    background: url(../../images/logo-icon.png);
    background-size: contain;
    height: 40px;
    width: 40px;
    display: inline-block;
    margin-right: 10px;
    transition: .3s;
    vertical-align: middle;
  }
  .app-logo-text {
    background: url(../../images/logo-text.png);
    background-size: contain;
    height: 40px;
    width: 100px;
    display: inline-block;
    transition: .3s;
    vertical-align: middle;
  }
}
.h-layout-sider-collapsed {
  .app-logo-text {
    display: none;
  }
  .app-logo-icon {
    margin-left: 15px;
  }
}
</style>
<template>
  <div class="app-logo" @click="path()">
    <span class="app-logo-icon"></span>
    <span class="app-logo-text"></span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    path() {
      let user = G.get('user');
      if (!user) return;
      
      this.$router.push({ name: 'Home' });
    },
  },
  computed: {}
};
</script>
