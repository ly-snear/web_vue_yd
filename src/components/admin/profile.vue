<style lang="less" scoped>
.profile-info-show {
  .profile-image {
    .h-avatar {
      width: 100px;
      margin: 0 auto;
    }
  }
  .profile-name {
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    color: rgba(0,0,0,.85);
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .profile-desc {
    text-align: center;
    width: 200px;
    margin: 0 auto;
  }
  .profile-detail-desc {
    margin-top: 40px;
    p {
      margin-bottom: 10px;
      > span {
        margin-left: 10px;
      }
    }
  }
}
</style>
<template>
  <div class="frame-page">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='7' :lg='7' :xl='7'>
        <div class="h-panel profile-info-show">
          <div class="h-panel-body">
            <p class="profile-image">
              <Avatar :src="user.avatar || '/static/images/avatar.png'" :width="100"></Avatar>
            </p>
            <p class="profile-name">{{user.name}}</p>
            <p class="profile-desc"><pre>{{user.intro}}</pre></p>
            <div class="profile-detail-desc">
              <p><i class="h-icon-user"></i><span>{{user.username}}</span></p>
              <p><i class="h-icon-location"></i><span>{{location}}</span></p>
              <p><i class="h-icon-task"></i><span>{{permission}}</span></p>
            </div>
          </div>
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='17' :lg='17' :xl='17'>
        <div class="h-panel profile-info-show">
          <div class="h-panel-bar">
            <span class="h-panel-title">基本信息</span>
          </div>
          <div class="h-panel-body">
            <Form :model="form" ref="form">
              <FormItem label="头像" prop="avatar">
                <Qiniu type="image" data-type="url" v-model="form.avatar"></Qiniu>
              </FormItem>
              <FormItem label="姓名" prop="name">
                <input type="text" v-model="form.name"/>
              </FormItem>
              <FormItem label="性别" prop="male">
                <Radio v-model="form.male" :datas="radios"></Radio>
              </FormItem>
              <FormItem label="手机号" prop="username">
                <input type="text" v-model="form.username"/>
              </FormItem>
              <FormItem label="新密码" prop="password">
                <input type="text" v-model="form.password"/>
              </FormItem>
              <FormItem label="学科" prop="course">
                <input type="text" v-model="form.course"/>
              </FormItem>
              <FormItem label="描述" prop="desc">
                <input type="text" v-model="form.intro"/>
              </FormItem>
              <FormItem>
                <Button color="primary" circle @click="save" :loading="loading">保 存</Button>
                <Button circle @click="reset">重 置</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      permission: '',
      location: '',
      user: {},
      form: {},
      radios: [
        { title: '女', key: 0 },
        { title: '男', key: 1 },
      ],
    };
  },
  created() {
    let user = G.get('user');
    switch (user.level) {
      case 10000:
        this.permission = '超级管理员';
        this.location = '全国';
        break;
      case 1200:
        this.permission = '市级管理员';
        this.location = Utils.getName(user.idCity);
        break;
      case 1100:
        this.permission = '区县管理员';
        this.location = Utils.getName(user.idCity) + ' / ' + Utils.getName(user.idZone);
        break;
      case 1000:
        this.permission = '学校管理员';
        this.location = Utils.getName(user.idCity) + ' / ' + Utils.getName(user.idZone) + ' / ' + Utils.getName(user.idSchool);
        break;
      case 100:
        this.permission = '老师';
        this.location = Utils.getName(user.idCity) + ' / ' + Utils.getName(user.idZone) + ' / ' + Utils.getName(user.idSchool);
        break;
      default:
        break;
    }

    this.user = user;
    this.reset();
  },
  methods: {
    save() {
      if (this.form.password && this.form.password.length < 6) {
        HeyUI.$Message.error('密码至少6位');
        return;
      }

      Utils.confirm(this, '确定修改该信息 ？', modal => {
        this.loading = true;
        modal.close();

        Ajax.post('/user/update', {
          name: this.form.name,
          male: this.form.male,
          course: this.form.course,
          username: this.form.username,
          password: this.form.password,
          avatar: this.form.avatar,
          intro: this.form.intro,
        }).then(resp => {
          this.loading = false;
          if (resp.ok) {
            HeyUI.$Message.success('提交成功');
            G.set('user', this.form);
            Utils.saveCookie('user', JSON.stringify(this.form));
          }
        });
      });
    },
    reset() {
      this.form = Utils.copy(this.user);

      if (this.form.male == undefined)
        this.form.male = true;
    }
  }
};
</script>
