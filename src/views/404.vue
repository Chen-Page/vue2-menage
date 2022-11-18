<template>
   <div class="page_notfound">
     <h2>404 Not Found</h2>
     <h5>当前页面不存在/或无权限访问</h5>
     <div class="a">
      将在{{time}}秒后跳转回<router-link :to="{name: 'home'}" tag="a" class="a">首页</router-link>
     </div>
   </div>
</template>
<script>

export default {
   name: 'page_notfound',
   components: {
     
   },
   mixins: [],
   props: {
     
   },
   data() {
     return {
       time: 5,
       interval: null
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
     this.interval = setInterval(() => {
      this.time -= 1
      if (this.time <= 0) {
        clearInterval(this.interval)
        this.interval = null
        this.$router.replace({
          name: 'home'
        })
      }
     }, 1000)
   },
   beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
   },
   methods: {
     
   }
};
</script>
<style lang='less' scoped>
.page_notfound{
  text-align: center;
  .a{
    margin: 0 5px;
    
  }
}
</style>