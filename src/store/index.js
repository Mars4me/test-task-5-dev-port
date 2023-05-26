import { jspApi } from '@/api/jsonplaceholder';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload;
        },
        SET_TODOS(state, payload) {
            state.todos = payload;
        },
        SET_CURRENT_USER(state, payload) {
            state.currentUser = payload;
        },
        ADD_TODO(state, payload) {
            state.todos.push(payload);
        },
    },
    actions: {
        async initialUsers({ commit }) {
            const { data } = await jspApi.get('/users');
            commit('SET_USERS', data);
        },
        initialCurrentUser({ commit }) {
            const user = JSON.parse(localStorage.getItem('user'));
            commit('SET_CURRENT_USER', user);
        },
        async initialTodos({ commit }) {
            const { data } = await jspApi.get('/todos');
            commit('SET_TODOS', data);
        },
        async addTodo({ commit }, todo) {
            const response = await jspApi.post('/posts', todo);
            if (response.status === 201) {
                response.data.id = todo.id;
                commit('ADD_TODO', response.data);
            }
        },
    },
    state: {
        users: [],
        todos: [],
        currentUser: {},
    },
    getters: {
        getUsers: (state) => state.users,
        getTodos: (state) => state.todos,
        getCurrentUser: (state) => state.currentUser,
    },
});
