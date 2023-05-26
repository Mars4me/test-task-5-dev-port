<template>
    <section class="todo-list">
        <h2>Todo List</h2>
        <div class="add-todo">
            <h3>Add Todo</h3>
            <input v-model="newTodo" placeholder="Todo Title" />
            <button @click="handleAddTodo">Add</button>
        </div>
        <div class="filter">
            <label for="filter">Filter by:</label>
            <select id="filter" v-model="selectedFilter">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
                <option value="favorites">Favorites</option>
            </select>
        </div>
        <div class="filter">
            <label for="userId">Filter by User:</label>
            <select id="userId" v-model="selectedUserId">
                <option :value="''">All Users</option>
                <option v-for="user in getUsers" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
        </div>
        <ul @click="handleChangeFavorites">
            <TodoListItem
                v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
                :isFavorite="isFavorite(todo.id)"
            />
            <!-- <li v-for="todo in filteredTodos" :key="todo.id" class="todo">
                <span :class="{ completed: todo.completed }">{{ todo.id }} - {{ todo.title }}</span>
                <button v-show="selectedFilter !== 'favorites'" :data-todo-id="todo.id">
                    {{ isFavorite(todo.id) ? 'Added' : 'Add Favorite' }}
                </button>
            </li> -->
        </ul>
    </section>
</template>

<script>
import TodoListItem from '@/components/TodoListItem';
import { LocalStorageService } from '@/service/LocalStorage.service';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TodoList',
    data() {
        return {
            todos: [],
            selectedFilter: 'all',
            selectedUserId: '',
            newTodo: '',
        };
    },
    components: {
        TodoListItem,
    },
    computed: {
        ...mapGetters(['getUsers', 'getTodos', 'getFavorites']),
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
                filtered = filtered.filter((todo) => todo.userId === +this.selectedUserId);
            }

            return filtered;
        },
    },
    methods: {
        ...mapActions(['initialUsers', 'initialTodos', 'addTodo', 'initFavorites']),
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
        handleChangeFavorites(e) {
            const todoId = e.target.dataset?.todoId;
            if (todoId !== null && todoId !== undefined) {
                LocalStorageService.toggleFavorites(+todoId);
                this.initFavorites();
                this.$forceUpdate();
            }
        },

        isFavorite(todoId) {
            const favorites = this.getFavorites;
            return favorites.includes(todoId);
        },
    },
    mounted() {
        this.initialTodos();
        this.initFavorites();
    },
};
</script>

<style scoped>
.todo-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

.todo-list > * {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
}

.add-todo {
    padding: 10px 0;
}

.add-todo input {
    padding: 10px 5px;
    outline: none;
}

.add-todo button {
    margin-left: 10px;
    padding: 10px 5px;
}

.filter > * {
    margin-right: 8px;
}
</style>
