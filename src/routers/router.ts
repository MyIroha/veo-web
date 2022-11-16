import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue"
import Asset from "../pages/Asset.vue"
import Inventry from "../pages/Inventry.vue"
import Repair from "../pages/Repair.vue"
import Login from "../pages/Login.vue"
import mainHandler from "../components/MainHandler.vue";
import BasicLayOut from "../layouts/BasicLayOut.vue"
import {Notify} from "vant";
const history = createWebHashHistory();

const router =   createRouter({
    history, // 路由模式
    routes: [
        {
           path:'/',
           redirect:'/login'
        }, {
            path:'/login',
            name:'login',
            component:Login,
            meta:{isShow:false}

        },{
            path:'/main',
            component:BasicLayOut,
            children:[
                {
                    // 页面逻辑
                    path: 'home',
                    name: 'home',
                    component: Home,
                },{
                    path: 'asset',
                    name: 'asset',
                    component: Asset,
                    meta:{title:'Asset Management',scan2:true,show:true}
                },{
                    path: 'repair/',
                    name: 'repair',
                    component: Repair,
                    meta:{title:'WO Management',scan2:false,show:false}
                },{
                    path: 'inventry/',
                    name: 'inventry',
                    component: Inventry,
                    meta:{title:'Inventry',scan2:true,show:false}
                }
            ]
        }
    ]
});

router.beforeEach((to,from,next) =>{
    // @ts-ignore
    let token = sessionStorage.getItem("token");
    if(token==null&&to.path != '/login'){
        next({path:'/login'});
        Notify({ type: 'warning', message: '登录超时，请重新登录....' })
    }if(token!=null&&to.path == '/login'){
       next({path:'/main/home'});
    }
    next();


})

export default router;