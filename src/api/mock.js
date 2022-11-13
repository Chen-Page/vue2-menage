// 模拟后端请求
import Mock from "mockjs";
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

// 定义mock请求拦截
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData)

// 定义用户列表数据
Mock.mock('/api/user/add', 'post', userApi.createUser)
Mock.mock('/api/user/edit', 'post', userApi.updateUser)
Mock.mock('/api/user/del', 'post', userApi.deleteUser)
Mock.mock(/\/api\/user\/getUser/, 'get', userApi.getUserList)

Mock.mock('/api/permission/getMenu', 'post', permissionApi.getMenu)