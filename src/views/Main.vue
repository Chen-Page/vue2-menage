<template>
  <div id="page_main">
    <el-container>
      <el-aside width="200px"><common-aside></common-aside></el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
export default {
  name: 'page_main',
    data () {
        return {}
    },
    components: {
      CommonAside
    }
}
</script>

<style>

</style>