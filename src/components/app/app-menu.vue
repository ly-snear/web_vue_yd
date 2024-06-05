<style lang="less">
.func-normal-selected {
  background-color: @primary-color;
  border-color: @primary-color;
  border-radius: 24px;
  color: white;
}

.func-collapse-selected {
  background-color: @primary-color;
  color: white;
}

.app-menu {
  .h-menu-mode-normal {
    font-size: 14px;

    .h-menu-li {
      padding: 8px 20px;
    }

    .h-menu-li-selected {
      .func-normal-selected();
    }

    // .h-menu-li-opened {
    //   > .h-menu-show {
    //     .func-normal-selected();
    //   }
    // }
    .h-menu-li .h-menu-li {
      .h-menu-show {
        padding-left: 20px;
      }

      .h-menu-li .h-menu-show {
        padding-left: 20px;
      }
    }
  }

  .h-menu-size-collapse {
    .h-menu-li-selected {
      .func-collapse-selected();
    }

    // .h-menu-li-opened {
    //   > .h-menu-show {
    //     .func-collapse-selected();
    //   }
    // }
  }
}
</style>
<template>
  <div class="app-menu">
    <appLogo></appLogo>
    <Menu :datas="menus" :inlineCollapsed="siderCollapsed" @click="trigger" ref='menu'
          :className="`h-menu-${theme}`"></Menu>
    <div class="app-menu-mask" @click="hideMenu"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appLogo from './app-logo';
import { getMenus } from 'js/config/menu-config';
import { EventBus } from '../../js/common/event-bus';

export default {
  props: {
    theme: String
  },
  data() {
    let user = JSON.parse(localStorage.getItem('user'));
    return {
      menus: [],
      user: user || {},
    };
  },
  watch: {
    $route() {
      this.menuSelect();
    }
  },
  mounted() {
    // let user = G.get('user');
    if (!this.user) return;
    this.menus = getMenus(this.user.level);
    this.$nextTick(() => {
      this.menuSelect();
    });
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  methods: {
    menuSelect() {
      if (this.$route.name) {
        this.$refs.menu.select(this.$route.name);
      }
    },
    trigger(data) {
      if (data.children.length > 0) return;
      this.$router.push({ name: data.key });
    },
    hideMenu() {
      this.$store.commit('updateSiderCollapse', true);
    }
  },
  components: {
    appLogo
  },
  created() {
    EventBus.$on('message_resource_login_ok', (msg) => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menus = getMenus(this.user.level);
      this.$nextTick(() => {
        this.menuSelect();
      });
      console.log('menu:登录成功');
    });
  },
  beforeDestroy() {
    EventBus.$off('message_resource_login_ok', {});
  }
};
</script>
