<template>
    <div>
        <div>
            <h2>Todo List</h2>
            <div>
                <h3>Add Todo</h3>
                <input v-model="newTodo" placeholder="Todo Title" />
                <button @click="handleAddTodo">Add</button>
            </div>
            <div>
                <label for="filter">Filter by:</label>
                <select id="filter" v-model="selectedFilter">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                    <option value="favorites">Favorites</option>
                </select>
            </div>
            <div>
                <label for="userId">Filter by User:</label>
                <select id="userId" v-model="selectedUserId">
                    <option :value="''">All Users</option>
                    <option v-for="user in getUsers" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
            </div>
            <ul>
                <li v-for="todo in filteredTodos" :key="todo.id">
                    <span :class="{ completed: todo.completed }">{{ todo.id }} - {{ todo.title }}</span>
                    <button v-show="selectedFilter !== 'favorites'" @click="addFavorite(todo.id)">
                        {{ isFavorite(todo.id) ? 'Added' : 'Add Favorite' }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TodoList',
    data() {
        return {
            todos: [],
            newTodo: '',
            selectedFilter: 'all',
            selectedUserId: '',
            newTodo: '',
        };
    },
    computed: {
        ...mapGetters(['getUsers', 'getTodos']),
        filteredTodos() {
            let filtered = this.getTodos;
            if (this.selectedFilter === 'completed') {
                filtered = filtered.filter((todo) => todo.completed);
            } else if (this.selectedFilter === 'uncompleted') {
                filtered = filtered.filter((todo) => !todo.completed);
            } else if (this.selectedFilter === 'favorites') {
                filtered = filtered.filter((todo) => this.isFavorite(todo.id));
            }

            if (this.selectedUserId !== '') {
                filtered = filtered.filter((todo) => todo.userId === parseInt(this.selectedUserId));
            }

            return filtered;
        },
    },
    methods: {
        ...mapActions(['initialUsers', 'initialTodos', 'addTodo']),
        handleAddTodo() {
            if (this.newTodo.trim() !== '') {
                const newTodo = {
                    id: this.getTodos.length + 1,
                    userId: 1,
                    title: this.newTodo,
                    completed: false,
                };
                this.addTodo(newTodo);
                this.newTodo = '';
            }
        },

        addFavorite(todoId) {
            const favorites = this.getFavorites();
            const index = favorites.indexOf(todoId);

            if (index !== -1) {
                return;
            }

            favorites.push(todoId);

            this.saveFavorites(favorites);
            this.$forceUpdate();
        },
        isFavorite(todoId) {
            const favorites = this.getFavorites();
            return favorites.includes(todoId);
        },
        getFavorites() {
            const favorites = localStorage.getItem('favorites');
            return favorites ? JSON.parse(favorites) : [];
        },
        saveFavorites(favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        },
    },
    mounted() {
        this.initialTodos();
        if (this.getUsers?.length === 0) {
            this.initialUsers();
        }
        this.favorites = this.getFavorites;
    },
};
</script>

<style>
.completed {
    text-decoration: line-through;
}

li {
    padding: 5px;
}
</style>
