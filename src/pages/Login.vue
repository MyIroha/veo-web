<template>

  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>

  <van-form @submit="onSubmit">

    <van-cell-group inset>
      <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          maxlength="11"
          type="digit"
          placeholder="请输入手机号"
          :error-message="err_msg[0].bol?err_msg[0].msg:''"
      />

      <van-field
          v-model="sms"
          label="短信验证码"
          name="code"
          center
          maxlength="6"
          placeholder="请输入短信验证码"
          :error-message="err_msg[1].bol?err_msg[1].msg:''"
      >
        <template #button>
          <van-button size="small" :disabled="start_getCode.disabled"  @click="getCode(phone)">{{!start_getCode.disabled?'发送验证码':start_getCode.time}}</van-button>
        </template>
      </van-field>
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="primary" :loading="loading.isTrue" :loading-text="loading.msg" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script>
import {reactive, ref, toRefs, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import $http from "../http/index.ts";
import {sendCode,loginByPhone} from "../http/requst/requst.ts";
import {Notify} from "vant";
export default {
  name: "Login",
  setup() {

    let loading =reactive({isTrue:false,msg:"登录中..."})
    let err_msg =reactive([
      {msg: "手机号码错误",bol:false},
      {msg:"验证码错误",bol:false}
    ]);
    const route = useRouter();
    const phone = ref('');
    const sms = ref('');
    let start_getCode = reactive({time:0,disabled:false});

    //获取验证码
    const getCode = async (phone) => {
      // getSetInterval();
      Promise.resolve().then(()=>{
        console.log(phone!=null && phone.length === 11)
       if(phone!=null && phone.length === 11){
         start_getCode.time=60;
         start_getCode.disabled=true;

         return Promise.resolve(phone);
       }
       return Promise.reject(new Error('请填写正确的联系号码'))
     }).then(phone=>{
       console.log(phone);
       getSetInterval();
       err_msg[0].bol=false;
       sendCode(phone);

     }).catch(e=>{
       console.log('错误')
       err_msg[0].bol=true
     })

    };
    //计时器
    const getSetInterval = ()=>{
      setTimeout(()=>{
        start_getCode.time--;
        if(start_getCode.time === 0){
          start_getCode.disabled=false;
          return;
        }
        getSetInterval()
      },1000);
    }

    const onSubmit = async (values) =>{
      if(values.phone==null && values.phone.length !== 11){
        err_msg[0].bol=true
        return ;
      }
      err_msg[0].bol=false
      console.log(start_getCode.disabled)
      if(!start_getCode.disabled){
        Notify({ type: 'warning', message: "请获取验证码" })
        return ;
      }
      if(values.code.length !== 6){
        Notify({ type: 'warning', message: "请输入正确的验证码" })
        return ;
      }
      if(values.code.length !== 6){
        Notify({ type: 'warning', message: "请输入正确的验证码" })
        return ;
      }

      loginByPhone(values,loading,route)

    }
    // /*const onSubmit = async (values) => {
    //   Promise.resolve().then(()=>{
    //     console.log(values.phone.length < 11)
    //     if(values.phone==null && values.phone.length !== 11){
    //       Promise.reject(new Error('请填写正确的联系号码'))
    //     }
    //     return Promise.resolve(values);
    //   }).then((value)=>{
    //     console.log("正确的手机号")
    //     $http.get(`
    //         http://localhost/api/emp/sendCode/${values.phone}`).then(res=>{
    //       console.log(res)
    //       // sessionStorage.setItem('auth','12');
    //       // route.push({path:"/main/home"})
    //     });
    //   }).catch(e=>{
    //     err_msg[0].bol=true
    //   })
    //
    // };*/





    return { phone,onSubmit,sms,err_msg,getCode,start_getCode,getSetInterval,loading};
  },
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 700px;
  text-align: center;
  background-color: #39a9ed;
}
</style>