<template>
   <div>
      <el-card class="box-card login-container">
         <el-form ref="form" :model="form" :label-position="labelPosition" :rules="formRules" label-width="80px">
            <h3 class="login_title">系统登录</h3>
            <el-form-item prop="username" label="用户名">
               <el-input v-model="form.username" placeholder="请输入登录账号" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
               <el-input v-model="form.password" type="password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-button type="primary" @click="submit">
               登录
            </el-button>
         </el-form>
      </el-card>
   </div>
</template>
<script>
// import Mock from 'mockjs';
import Cookies from 'js-cookie';

import { getMenu } from '../api'

export default {
   name: 'page_login',
   components: {

   },
   mixins: [],
   props: {

   },
   data() {
      return {
         labelPosition: 'right',
         form: {
            username: '',
            password: ''
         },
         formRules: {
            username: [
               {
                  required: true,
                  message: '请输入用户名',
                  trigger: 'blur'
               }
            ],
            password: [
               {
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur'
               }
            ]
         }
      }
   },
   computed: {

   },
   watch: {

   },
   mounted() {

   },
   methods: {
      submit() {
         this.$refs.form.validate((val) => {
            console.log(val)
            if (!val) {
               return
            }
            // // 模拟后台获取token
            // const token = Mock.Random.guid()
            // console.log(token)
            // // 将token存入cookie
            // Cookies.set('token', token)
            // this.$message({
            //    message: '登录成功',
            //    type: 'success'
            // })
            // this.$router.push({ name: 'home' })

            getMenu(this.form).then(({ data }) => {
               console.log(data);
               if (data.code !== 20000) {
                  this.$message.error(data.data.message || '登录失败')
                  return
               }
               this.$message({
                  message: '登录成功',
                  type: 'success'
               })
               Cookies.set('token', data.data.token)
               this.$store.commit('tab/setMenu', data.data.menu)
               this.$store.commit('tab/addMenu', this.$router)
               this.$router.push({ name: 'home' })
            })
         })
      },
   }
};
</script>
<style lang='less' scoped>
.login-container {
   width: 350px;
   margin: 180px auto;
   text-align: center;

   .login_title {
      margin: 0 auto 40px;
      color: #505458;
   }

   .el-button {
      margin-top: 10px;
   }
}
</style>