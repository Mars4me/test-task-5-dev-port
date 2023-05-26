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
    color: #5f5f5f;
    padding: 0;
    margin: 0;
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
