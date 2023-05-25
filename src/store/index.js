import { jspApi } from "@/api/jsonplaceholder";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload;
    },
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    async initialUsers({ commit }) {
      const { data } = await jspApi.get("/users");
      commit("SET_USERS", data);
    },
    initialCurrentUser({ commit }) {
      const user =  JSON.parse(localStorage.getItem('user'))
      commit("SET_CURRENT_USER", user);
    },
  },
  state: {
    users: [],
    currentUser: {}
  },
  getters: {
    getUsers: (state) => state.users,
    getCurrentUser: (state) => state.currentUser,
  },


});
