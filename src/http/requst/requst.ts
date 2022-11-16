// @ts-ignore
import $http from "../index.ts";
import {Notify} from "vant";
import {ref} from "vue";

export const sendCode =  ((value:any)=>{
    // @ts-ignore
    $http.get(`/api/emp/sendCode/${value}`).then(res=>{
        console.log(res.data.code==1000)
        if(res.data.code==1000){
            Notify({ type: 'success', message: '验证码发送成功' })
            return Promise.resolve(res);
        }
        Notify({ type: 'warning', message: res.data.msg })

        return Promise.reject(res);
    }).catch((err:any)=>{
        console.log(err)
        Notify({ type: 'warning', message: '当前服务不可用，请稍后再试' })
    })
})

export const loginByPhone = (value:any,loading:any,route:any)=>{
    loading.isTrue=true;
    let loginFormDTO = {
        "phone":value.phone,
        "code":value.code
    }
    // @ts-ignore
    $http.post(`/api/emp/login`,loginFormDTO).then((res:any)=>{
        console.log(res.data.code == 1000)
        console.log(res.data)
        if(res.data.code == 1000){
            loading.isTrue=false;

            sessionStorage.setItem("token",res.data.data);
            Notify({ type: 'success', message: "登录成功" });
            route.push({path:"/main/home"});
            return ;
        }
        loading.isTrue=false;
        Notify({ type: 'danger', message: "请输入正确验证码" })
        return;
    }).catch(()=>{
        loading.isTrue=false;
        Notify({ type: 'warning', message: '当前服务不可用，请稍后再试' })
        return;
    })
}

export const selectAssets =async (value:any,list:any,func:any) =>{

    $http.post(`/ast/asset/selectAssets`,value).then((res:any)=>{
        func(list,res.data.data);
    })
}