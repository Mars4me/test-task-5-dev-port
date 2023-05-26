<template>
    <li>
        <span :class="{ completed: todo.completed }">{{ todo.id }} - {{ todo.title }}</span>
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

li {
    padding: 5px;
}
</style>
