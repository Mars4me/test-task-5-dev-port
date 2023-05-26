import { JsonPlaceholderApi } from '@/service/JsonPlaceHolderApi.service';
import { LocalStorageService } from '@/service/LocalStorage.service';
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
        SET_FAVORITES(state, payload) {
            state.favorites = payload;
        },
    },
    actions: {
        async initialUsers({ commit }) {
            const users = await JsonPlaceholderApi.getUsers();
            commit('SET_USERS', users);
        },
        initialCurrentUser({ commit }) {
            const user = LocalStorageService.getUser();
            commit('SET_CURRENT_USER', user);
        },
        async initialTodos({ commit }) {
            const todos = await JsonPlaceholderApi.getTodos();
            commit('SET_TODOS', todos);
        },
        async addTodo({ commit }, todo) {
            const response = await JsonPlaceholderApi.addTodo(todo);
            if (response.status === 201) {
                response.data.id = todo.id;
                commit('ADD_TODO', response.data);
            }
        },

        initFavorites({ commit }) {
            const favorites = LocalStorageService.getFavoritesCurrentUser();
            commit('SET_FAVORITES', favorites);
        },
    },
    state: {
        users: [],
        todos: [],
        currentUser: {},
        favorites: [],
    },
    getters: {
        getUsers: (state) => state.users,
        getFavorites: (state) => state.favorites,
        getTodos: (state) => state.todos,
        getCurrentUser: (state) => state.currentUser,
    },
});
