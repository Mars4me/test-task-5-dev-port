<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <UserPage/>
  </div>
</template>

<script>
import UserPage from '@/components/UserPage.vue';
export default {
  name: 'HomeView',
  components: {
    UserPage
  }
}
</script>
