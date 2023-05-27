<template>
    <li>
        <span :class="{ completed: todo.completed, favorites: isFavorite }"
            >{{ todo.id }} - {{ todo.title }}</span
        >
        <button :data-todo-id="todo.id">
            {{ isFavorite ? 'Added' : 'Add Favorite' }}
        </button>
    </li>
</template>

<script>
export default {
    name: 'TodoListItem',
    data() {
        return {};
    },
    props: ['isFavorite', 'todo'],
};
</script>

<style scoped>
button {
    margin-left: 10px;
    padding: 0 5px;
}
.completed {
    text-decoration: line-through;
}

.favorites {
    background: rgba(27, 196, 190, 0.5);
}

li {
    padding: 5px;
}
</style>
