import axios from "axios"
import Vue from 'vue'
import router from './router'

const http = axios.create({
    //baseURL: process.env.VUE_APP_API_URL || '/admin/api'
    baseURL: 'http://www.wubingo.cn:3030/admin/api'
    //baseURL: 'http://localhost:3030/admin/api'
})


// Add a request interceptor
http.interceptors.request.use((config) => {
    // Do something before request is sent
    // const token = localStorage.getItem('token') || ''
    const token = sessionStorage.getItem('token') || ''
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// 拦截器，响应的拦截 npm官方文档,axios,use 捕获全局的status码
//error.name,error.reponse是个对象，有status、data等属性
http.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    //可以 console.log(error.response),查看有哪些属性
    if (error.response.status === 422) {
        //使用vue的实例弹出报错信息
        Vue.prototype.$message({
            type: 'error',
            message: error.response.data.message
        })
    }
    //401表示未登录
    if (error.response.status === 401) {
        router.push('/login')
    }

    // Do something with response error
    return Promise.reject(error);
});


export default http;