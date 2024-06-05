<style lang='less'>
.fill-up {
  padding: 10px;

  .h-row {
    height: 100%;

    > .h-col {
      height: 100%;
    }
  }

  img {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
    cursor: pointer;
  }

  .content {
    position: absolute;
    top: 40%;
    left: 160px;

    .text-title {
      font-size: 32px;
      color: white;
    }

    .text-small {
      font-size: 16px;
      color: white;
    }

    .h-btn {
      width: 180px;
      height: 50px;
      margin-top: 10px;
    }
  }
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>
<template>
  <div>
    <div class="full-screen fill-up">
      <Row>
        <Cell width="6">
          <img src="/static/images/home/pingtai.png" @click="path()">
        </Cell>
        <Cell width="18">
          <Row direction="column">
            <Cell width="24" style="height: 60%;">
              <Row direction="column">
                <Cell width="18">
                  <Row direction="column">
                    <Cell :width="24" style="height: 40%;">
                      <Row>
                        <Cell :width="8">
                          <img src="/static/images/home/attendance.png" @click="path('AttendanceStat')">
                        </Cell>
                        <Cell :width="8">
                          <img src="/static/images/home/participate.png" @click="path('ParticipateStat')">
                        </Cell>
                        <Cell :width="8">
                          <img src="/static/images/home/classwork.png" @click="path('ClassWorkStat')">
                        </Cell>
                      </Row>
                    </Cell>
                    <Cell :width="24" style="height: 60%;">
                      <img src="/static/images/home/artistic.png" @click="path('ArtisticStat')">
                    </Cell>
                  </Row>
                </Cell>
                <Cell width="6">
                  <img src="/static/images/home/activity.png" @click="path('ActivityStat')">
                </Cell>
              </Row>
            </Cell>
            <Cell width="24" style="height: 40%;">
              <img src="/static/images/home/konwledge.png" @click="path()">
            </Cell>
          </Row>
        </Cell>
      </Row>
    </div>
    <transition name="fade">
      <div class="full-screen fill-up" v-show="show">
        <img src="/static/images/home/loading.png" style="cursor: default;">
        <div class="content">
          <p class="text-title">欢迎使用</p>
          <p class="text-title">艺术素质测评系统</p>
          <Button size="s" :no-border="true" text-color="primary" color="white" :circle="true" @click="show=false">
            立即进入
          </Button>
          <p class="text-small"><i class="icon-clock">&nbsp;{{ index }}秒后自动进入</i></p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { EventBus } from '../../js/common/event-bus';

export default {
  data() {
    return {
      index: 5,
      show: true
    };
  },
  created() {
    if (this.$route.query.token) {
      let token = this.$route.query.token;
      console.log('令牌：' + token);
      this.loading = true;
      Ajax.get('/user/token', {
        token: token
      }).then((resp) => {
        this.loading = false;
        if (resp.ok) {
          this.go(resp.body);
        } else {
          this.$router.replace({ name: 'Login' });
        }
      });
    } else {
      this.boot();
    }
  },
  methods: {
    go(body) {
      if (!body.token) return;
      if (!body.avatar || body.avatar.length == 0) {
        body.avatar = '/static/images/avatar.png';
      }
      G.set('user', body);
      localStorage.setItem('user', JSON.stringify(body));
      this.$store.commit('setUser', body);
      Utils.saveCookie('user', JSON.stringify(body));
      EventBus.$emit('message_resource_login_ok', {});
      this.boot();
    },
    boot() {
      console.log('从首页引导... ...');
      Ajax.get('/dashboard/setup', {}).then(resp => {
        if (resp.ok) {
          G.set('organizes', resp.body.organize);
          G.set('classes', resp.body.class);
          G.set('years', resp.body.year);
        }
      });

      setInterval(() => {
        if (this.show && this.index > 0) {
          this.index = this.index - 1;
          this.show = this.index > 0;
        }
      }, 1000);
    },
    path(name) {
      if (name) {
        this.$router.push({ name });
      }
    }
  }
};
</script>
