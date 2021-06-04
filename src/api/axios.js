/**
 *封装axios 方便使用 增加接口防抖处理 是否显示loading 是否使用公共错误提示
 * */
import axios from 'axios'
import React from "react";
import ReactDOM from 'react-dom';
import { message,Spin } from 'antd'
import store from '../store'
import { OPENPAGELOADING, CLOSEPAGELOADING } from '../actions'


// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'https://www.production.com';
}
// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading () {
    if (requestCount === 0) {
        let dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
    }
    requestCount++
}

// 隐藏loading
function hideLoading () {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求队列
const queue = []
// axios内置的中断ajax的方法
const cancelToken = axios.CancelToken
// 同样的url、方法、参数可以视为相同的请求
const token = config => {
    return `${config.url}_${config.method}_${config.data}`
}
// 中断重复的请求，并从队列中移除
const removeQueue = config => {
    for (let i = 0, size = queue.length; i < size; i++) {
        const task = queue[i]
        if (task.token === token(config)) {
            task.cancel()
            queue.splice(i, 1)
            break
        }
    }
}
const http = axios.create()

//请求拦截
http.interceptors.request.use(config=>{
    removeQueue(config) // 中断之前的同名请求---这是axios的防抖处理  防止用户多次点击的情况下产生的多次请求的问题
    // 添加cancelToken
    config.cancelToken = new cancelToken(c => {
        queue.push({token: token(config), cancel: c})
    })

    //一定要将config return 出去
    return config
})


export const request = (data,showError = true,Loading = true)=>{
    //响应拦截
    http.interceptors.response.use(response=>{
        console.log(data.url+' : ',response) //建议打印一下 有些后台返回回来的数据格式不同  可根据自己的数据格式进行调整
        removeQueue(response.config)
        return response
    },error => {
        return Promise.reject(error)
    })
    if (Loading){
        showLoading() //打开加载窗口
    }
    return http(data).then(response=>{
        if (Loading){
            hideLoading() //关闭加载窗口
        }
        //成功的返回
        if(response.status===200){ //状态码
            switch (response.data.code) {
                case '200': //系统交易成功
                    return Promise.resolve(response.data); //将data中需要的数据返回  可根据自己项目中的数据格式进行调整
                case '401': //登录失效
                    break
                default:
                    if (showError){
                        message.warning('接口异常')//这里可以根据后段接口优化成具体错误信息
                    }
                    return Promise.resolve(response.data)
            }

        }else{
            //错误提示
            message.warning('接口异常')//这里可以根据后段接口优化成具体错误信息
        }
    })

}
// export default request()
// export default axios.create()

