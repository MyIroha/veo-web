import axios from "axios";
import {Notify} from "vant";
//axios.create 创建一个axios实例，后续所有实例发送http，都受当前配置约束
const $http = axios.create({
    baseURL:'http://192.168.112.128',
    timeout:50000,
    headers:{
        // "token":`${sessionStorage.getItem("token")} `
    }
});
//添加请求拦截器
$http.interceptors.request.use(function (request){
    console.log(sessionStorage.getItem("token"))
    // @ts-ignore
    request.headers.token = sessionStorage.getItem("token");
    //在发送请求之前做些什么
    return request;
},function (error){
    //对错误的处理
    return Promise.reject(error);
});

$http.interceptors.response.use(function (response){
    //在收到请求之前做些什么
    if(response.data.code == 407){
        sessionStorage.removeItem("token");
    }
    return response;
},function (error){
    //对错误的处理
    return Promise.reject(error);
});

export default $http;