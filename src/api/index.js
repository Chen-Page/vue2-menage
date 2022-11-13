import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    // 返回promise对象
    return http.get('/home/getData')
}

// 获取用户列表
export const getUser = (params) => {
    return http.get('/user/getUser', params)
}

// 新增用户
export const addUser = (data) => {
    return http.post('/user/add', data)
}

// 删除用户
export const deleteUser = (data) => {
    return http.post('/user/del', data)
}

// 修改用户信息
export const editUser = (data) => {
    return http.post('/user/edit', data)
}

// 登录
export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}