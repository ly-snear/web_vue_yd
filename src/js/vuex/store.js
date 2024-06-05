import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const getInitUser = () => {
  const localUser = localStorage.getItem('user');
  if (localUser) {
    try {
      const user = JSON.parse(localUser);
      return user;
    } catch (error) {
      return {};
    }
  }
  return {};
};
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: getInitUser(),
    siderCollapsed: false
  },
  mutations: {
    updateSiderCollapse(state, isShow) {
      setTimeout(() => {
        G.trigger('page_resize');
      }, 600);
      state.siderCollapsed = isShow;
    },
    setToken(state, data) {
      state.token = data;
    },
    setUser(state, userInfo) {
      state.user = userInfo;
      localStorage.setItem('user', JSON.stringify(userInfo));
      if (!userInfo.token) return;
      state.token = userInfo.token;
      localStorage.setItem('token', userInfo.token);
    }
  },
  actions: {
    updateSiderCollapse(context, data) {
      context.commit('updateSiderCollapse', data);
    },
    async getUser({ commit }, data) {
      try {
        const res = await Ajax.get('/user/token', {
          token: data
        });
        commit('setUser', res.body);
        return true;
      } catch (error) {
        return false;
      }
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    siderCollapsed: state => {
      return state.siderCollapsed;
    }
  }
});
