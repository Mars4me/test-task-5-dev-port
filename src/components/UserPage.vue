<template>
    <div class="wrapper">
        <h2>{{ getCurrentUser.name }}</h2>
        <div class="info-block">
            <p v-for="(item, id) in Object.keys(getCurrentUser)" :key="id">
                {{ `${item} -  ${JSON.stringify(getCurrentUser[item])} ` }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'UserPage',
    data() {
        return {};
    },
    methods: {
        ...mapActions(['initialCurrentUser']),
    },
    computed: {
        ...mapGetters(['getCurrentUser']),
    },
    mounted() {
        this.initialCurrentUser();
    },
};
</script>

<style scoped>
h2 {
    text-align: center;
    color: white;
    background-color: #5f5f5f;
    padding: 20px 0;
}
.wrapper {
    background-color: #c4c4c4;
    border-radius: 5px;
}

.info-block {
    padding: 10px 20px;
    background-color: #c4c4c4;
}
</style>
