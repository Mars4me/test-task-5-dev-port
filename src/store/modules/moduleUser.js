import { LocalStorageService } from '@/service/LocalStorage.service';
import { JsonPlaceholderApi } from '@/service/JsonPlaceHolderApi.service';

export const moduleUser = {
    state: () => ({
        users: [],
        currentUser: {},
    }),
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
            const users = await JsonPlaceholderApi.getUsers();
            commit('SET_USERS', users);
        },
        initialCurrentUser({ commit }) {
            const user = LocalStorageService.getUser();
            commit('SET_CURRENT_USER', user);
        },
    },
    getters: {
        getUsers: (state) => state.users,
        getCurrentUser: (state) => state.currentUser,
    },
};
