<template>
  <div id="app">
    <!-- <RouterView></RouterView> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';


export default {
  name: 'App',
  components: {
    RouterView
}
}
</script>

<style lang="less">
html,body,p{
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
