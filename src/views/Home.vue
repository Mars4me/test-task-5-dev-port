<template>
    <div class="home">
        <UserPage />
        <TodoList />
    </div>
</template>

<script>
import UserPage from '@/components/UserPage.vue';
import TodoList from '@/components/TodoList.vue';
export default {
    name: 'HomeView',
    components: {
        UserPage,
        TodoList,
    },
};
</script>

<style>
body {
    overflow: scroll;
}
</style>
