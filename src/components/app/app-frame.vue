<style lang='less'>
  .app-frame-content {
    width: 100%;
    height: 100%;
  }
</style>
<template>
  <div>
    <Layout class="app-frame" :siderCollapsed="siderCollapsed" :siderFixed="layoutConfig.siderFixed">
      <Sider :theme="layoutConfig.siderTheme">
        <appMenu :theme="layoutConfig.siderTheme"></appMenu>
      </Sider>
      <Layout :headerFixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <appHead :layoutConfig="layoutConfig"></appHead>
        </HHeader>
        <Content>
          <div class="app-frame-content">
            <router-view></router-view>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import appHead from './app-header';
import appMenu from './app-menu';
import appFooter from './app-footer';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      layoutConfig: {
        siderTheme: 'white',
        headerFixed: true,
        siderFixed: true
      }
    };
  },
  created() {
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  components: {
    appHead,
    appMenu,
    appFooter
  }
};
</script>
