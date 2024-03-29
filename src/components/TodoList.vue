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
            <label for="userId">Filter by {{ getUsers[selectedUserId - 1]?.name || 'ALL' }}</label>
            <select id="userId" v-model="selectedUserId">
                <option :value="''">All Users</option>
                <option v-for="user in getUsers" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
        </div>
        <transition name="fade">
            <div class="loading" v-show="loading">Loading</div>
        </transition>
        <ul @click="handleChangeFavorites" ref="infinite" id="infinite-list">
            <TodoListItem
                v-for="todo in showItems"
                :key="todo.id"
                :todo="todo"
                :isFavorite="isTodoInFavorites(todo.id)"
            />
        </ul>
    </section>
</template>

<script>
import TodoListItem from '@/components/TodoListItem';
import { LocalStorageService } from '@/service/LocalStorage.service';
import { mapGetters, mapActions } from 'vuex';
import debounce from '@/helpers/debounce';

export default {
    name: 'TodoList',
    data() {
        return {
            todos: [],
            selectedFilter: 'all',
            selectedUserId: '',
            newTodo: '',
            loading: false,
            showMore: 1,
        };
    },
    components: {
        TodoListItem,
    },
    computed: {
        ...mapGetters(['getUsers', 'getTodos', 'getFavorites', 'isTodoInFavorites']),
        filteredTodos() {
            let filtered = this.getTodos;

            if (this.selectedFilter === 'completed') {
                filtered = filtered.filter((todo) => todo.completed);
            } else if (this.selectedFilter === 'uncompleted') {
                filtered = filtered.filter((todo) => !todo.completed);
            } else if (this.selectedFilter === 'favorites') {
                filtered = filtered.filter((todo) => this.isTodoInFavorites(todo.id));
            }

            if (this.selectedUserId !== '') {
                filtered = filtered.filter((todo) => todo.userId === +this.selectedUserId);
            }

            return filtered;
        },
        showItems() {
            return this.filteredTodos.slice(0, 20 * this.showMore);
        },
    },
    watch: {
        selectedUserId(_, __) {
            this.showMore = 1;
        },
        selectedFilter(_, __) {
            this.showMore = 1;
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
            }
        },
        addMore() {
            this.loading = true;
            setTimeout(() => {
                this.showMore++;
                this.loading = false;
            }, 200);
        },

        isItemsShowedFull() {
            return this.filteredTodos.length === this.showItems.length;
        },

        scrollHandler() {
            console.log('hello');
            if (this.isItemsShowedFull()) return false;
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
                this.addMore();
            }
        },
    },
    mounted() {
        this.initialTodos();
        this.initFavorites();

        window.addEventListener('scroll', debounce(this.scrollHandler, 200));
    },

    destroyed() {
        window.removeEventListener('scroll', debounce(this.scrollHandler, 200));
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

.loading {
    text-align: center;
    position: fixed;
    color: #fff;
    z-index: 9;
    background: #5c4084;
    padding: 8px 18px;
    border-radius: 5px;
    left: calc(50% - 45px);
    top: calc(50% - 18px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
