// @ts-ignore
import $http from "../index.ts";
import {Notify} from "vant";
import {ref} from "vue";

export const sendCode =  ((value:any)=>{
    // @ts-ignore
    $http.get(`/api/emp/sendCode/${value}`).then(res=>{
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
        if(res.data.code == 1000){
            loading.isTrue=false;

            sessionStorage.setItem("token",res.data.data);
            getAssetFilterItems();
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

export const getAssetFilterItems = ()=>{
    $http.get(`/ast/filter/config/`).then((res:any)=>{
        // value.value=res.data.data;
        let list = res.data.data;
        let items = {option1:[],option2:[],option3:[]}
        // @ts-ignore
        items.option3 = list.vechileType.map((n)=>{
            return {text:n.vechicleName,value:n.vechicleId};
        })
        // @ts-ignore
        items.option1 = list.iot.map((n)=>{
            return {text:n.statusName,value:n.statusId};
        })
        // @ts-ignore
        items.option2 = list.frame1.map((n)=>{
            return {text:n.statusName,value:n.statusId};
        })
        // @ts-ignore
        sessionStorage.setItem("items",JSON.stringify(items));
    })
}

export const getAssetInfo = (id:any)=>{
    //
    return new Promise((resolve,reject)=>{
        $http.get(`/ast/asset//Info/${id}`).then((res:any)=>{
            resolve(res);
        }).catch(()=>{

        })
    })
}

export const updateAssetInfo = (data:any)=>{
    return new Promise((resolve,reject)=>{
        console.log(data)
        $http.post(`/ast/asset/Info/`,data).then((res:any)=>{
            resolve(res);
        }).catch(()=>{

        })
    })
}

export const getWoList = async (data:any)=>{
    return new Promise((resolve,reject) => {
        $http.post("/wo/wo/getWoList",data).then((res:any)=>{
            console.log(res)
            if(res.data.code == 1000){

                resolve(res.data.data) ;

            }
            reject(res.data.data);
        });
    })
}