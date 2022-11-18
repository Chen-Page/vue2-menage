const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false, // 是否不使用eslint
  // publicPath: process.env.NODE_ENV === 'production' // 公共前缀，上线部署时需要修改
  //   ? '/manage/'
  //   : '/'
})
