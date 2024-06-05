import Vue from 'vue';
import VueRouter from 'vue-router';

import adminComponents from './router/admin';
import teacherComponents from './router/teacher';

Vue.use(VueRouter);

const initRouter = () => {
  const routerParam = {
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'First',
        component: (resolve) => require(['components/welcome/first'], resolve)
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: (resolve) => require(['components/welcome/index'], resolve)
      },
      {
        path: '/sample',
        name: 'Sample',
        component: (resolve) => require(['components/welcome/sample'], resolve)
      },
      {
        path: '/user',
        component: (resolve) => require(['components/login/frame'], resolve),
        children: [
          {
            path: '/user/login',
            name: 'Login',
            component: (resolve) => require(['components/login/index'], resolve)
          },
          {
            path: '/user/forget',
            name: 'Forget',
            component: (resolve) => require(['components/login/forget'], resolve)
          }
        ]
      },
      {
        path: '',
        component: (resolve) => require(['components/app/app-frame'], resolve),
        children: [
          {
            path: '/home',
            name: 'Home',
            component: (resolve) => require(['components/home/index'], resolve),
            meta: { title: '首页', icon: 'icon-monitor' }
          },
          {
            path: '/system-error',
            name: 'SystemError',
            component: (resolve) => require(['components/error-pages/500'], resolve),
            meta: { title: '系统错误' }
          },
          {
            path: '/permission-error',
            name: 'PermissionError',
            component: (resolve) => require(['components/error-pages/403'], resolve),
            meta: { title: '权限错误' }
          },
          {
            path: '/notfound-error',
            name: 'NotfoundError',
            component: (resolve) => require(['components/error-pages/404'], resolve),
            meta: { title: '页面找不到' }
          },
          ...adminComponents,
          ...teacherComponents
        ]
      }]
  };

  let router = new VueRouter(routerParam);

  router.beforeEach((to, from, next) => {
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 管理应用';
    } else {
      document.title = '管理系统';
    }
    next();
  });
  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let layoutContent = document.querySelector('.h-layout-content');
    if (layoutContent) {
      layoutContent.scrollTop = 0;
    }
    // baidu 统计，如果有自己的统计，请至index.html修改至自己的埋点
    if (window._hmt) {
      window._hmt.push(['_trackPageview', window.location.pathname]);
    }
  });
  return router;
};

export default initRouter;
