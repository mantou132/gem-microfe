<template>
  <div class="main">
    <router-link to="/v/a">Home</router-link>
    <router-link to="/v/b">About</router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.main {
  color: mediumseagreen;
}
</style>