import Vue from 'vue';
import Vuex from 'vuex';
import { moduleUser } from './modules/moduleUser';
import { moduleTodo } from './modules/moduleTodo';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user: moduleUser,
        todo: moduleTodo,
    },
    mutations: {},
    actions: {},
    state: {},
    getters: {},
});
