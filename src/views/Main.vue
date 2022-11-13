<template>
  <div id="page_main">
    <el-container>
      <el-aside width="auto"><common-aside></common-aside></el-aside>
      <el-container>
        <el-header><common-header></common-header></el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: 'page_main',
    data () {
        return {}
    },
    components: {
      CommonAside,
      CommonHeader
    }
}
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}
</style>