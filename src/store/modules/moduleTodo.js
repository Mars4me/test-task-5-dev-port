import { LocalStorageService } from '@/service/LocalStorage.service';
import { JsonPlaceholderApi } from '@/service/JsonPlaceHolderApi.service';

export const moduleTodo = {
    state: () => ({
        todos: [],
        favorites: [],
    }),
    mutations: {
        SET_TODOS(state, payload) {
            state.todos = payload;
        },
        ADD_TODO(state, payload) {
            state.todos.push(payload);
        },
        SET_FAVORITES(state, payload) {
            state.favorites = payload;
        },
    },
    actions: {
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
    getters: {
        getFavorites: (state) => state.favorites,
        getTodos: (state) => state.todos,
        isTodoInFavorites: (state) => (id) => {
            return state.favorites.includes(id);
        },
    },
};
