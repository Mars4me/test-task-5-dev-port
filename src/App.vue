<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['initialUsers']),
    },
    mounted() {
        this.initialUsers();
    },
};
</script>

<style>
* {
    box-sizing: border-box;
    color: #5f5f5f;
    padding: 0;
    margin: 0;
}

body {
    overflow: scroll;
}

li {
    list-style-type: none;
}

input::placeholder {
    color: #353535;
}

#app {
    padding: 20px 20px;
    max-width: 1100px;
    margin: 0 auto;
}

@media (max-width: 767px) {
    #app {
        padding: 5px 5px;
    }
}
</style>
