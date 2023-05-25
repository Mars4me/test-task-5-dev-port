<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  color: #5F5F5F;
  padding: 0;
  margin: 0;
}

input::placeholder {
  color: #353535;
}

#app {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
