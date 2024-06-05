<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);

  .h-autocomplete {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;

    &-show, &-show:hover, &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }

    &-show.focusing {
      border-bottom: 1px solid #eee;
    }
  }

  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;

    &:hover {
      background: @hover-background-color;
    }

    i {
      font-size: 18px;
    }

    a {
      color: inherit;
    }

    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }

  .h-dropdownmenu {
    float: left;
  }

  &-dropdown {
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;

    .h-icon-down {
      right: 20px;
    }

    cursor: pointer;

    &:hover, &.h-pop-trigger {
      background: @hover-background-color;
    }

    &-dropdown {
      padding: 5px 0;

      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }

  &-menus {
    display: inline-block;
    vertical-align: top;

    > div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;

      &:hover {
        color: @primary-color;
      }

      + div {
        margin-left: 5px;
      }

      &.h-tab-selected {
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }

  .header-tabs {
    float: left;

    .h-btn {
      margin: 0 10px;
    }
  }
}
</style>
<template>
  <div class="app-header">
    <span class="header-tabs">
      <Button :icon="siderCollapsed ? 'icon-align-right' : 'icon-align-left'" size="l" text-color="primary" noBorder
              class="font20" @click="siderCollapsed=!siderCollapsed"></Button>
    </span>
    <span class="header-tabs">
      <Breadcrumb :datas="datas"></Breadcrumb>
    </span>
    <div class="float-right app-header-info">
      <DropdownMenu className="app-header-dropdown" trigger="hover" offset="0,5" :width="150" placement="bottom-end"
                    :datas="infoMenu" @onclick="trigger">
        <Avatar :src="user.avatar || '/static/images/avatar.png'" :width="30">
          <span>{{ user.name || user.username }}</span></Avatar>
      </DropdownMenu>
    </div>
  </div>
</template>
<script>
import appHeaderMessage from './modules/app-header-message';
import { getMenus } from 'js/config/menu-config';
import { EventBus } from '../../js/common/event-bus';

export default {
  components: {
    appHeaderMessage
  },
  data() {
    // let user =  G.get('user');
    let user = JSON.parse(localStorage.getItem('user'));
    return {
      datas: [],
      user: user || {},
      infoMenu: [
        { key: 'profile', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ]
    };
  },
  watch: {
    $route() {
      this.updateRoute();
    }
  },
  computed: {
    siderCollapsed: {
      get() {
        return this.$store.state.siderCollapsed;
      },
      set(value) {
        this.$store.commit('updateSiderCollapse', value);
      }
    }
  },
  mounted() {
    this.listenResize();
  },
  created() {
    this.updateRoute();
    EventBus.$on('message_resource_login_ok', (msg) => {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log('head登录成功');
    });
  },
  methods: {
    listenResize() {
      let windowWidth = window.innerWidth;
      const resizeEvent = window.addEventListener('resize', () => {
        if (windowWidth == window.innerWidth) {
          return;
        }
        if (this.siderCollapsed && window.innerWidth > 900) {
          this.siderCollapsed = false;
        } else if (!this.siderCollapsed && window.innerWidth < 900) {
          this.siderCollapsed = true;
        }
        windowWidth = window.innerWidth;
      });
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeEvent);
      });
      window.dispatchEvent(new Event('resize'));
    },
    trigger(data) {
      if (data == 'logout') {
        G.set('user', null);
        Utils.removeCookie('user');
        this.$router.replace({ name: 'Login' });
      }
      if (data == 'profile') {
        this.$router.push({ name: 'Profile' });
      }
    },
    updateRoute() {
      let user = G.get('user');
      if (!user) return;

      let name = this.$route.name;
      for (const el0 of getMenus(user.level)) {
        if (el0.key == name) {
          this.datas = [{ title: el0.title }];
          break;
        }
        if (el0.children) {
          for (const el1 of el0.children) {
            if (el1.key == name) {
              this.datas = [{ title: el0.title }, { title: el1.title }];
              break;
            }
            if (el1.children) {
              for (const el2 of el1.children) {
                if (el2.key == name) {
                  this.datas = [{ title: el0.title }, { title: el1.title }, { title: el2.title }];
                  break;
                }
              }
            }
          }
        }
      }
    }
  },
  beforeDestroy() {
    EventBus.$off('message_resource_login_ok', {});
  }
};
</script>
