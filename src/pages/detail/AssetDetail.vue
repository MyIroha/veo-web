<template>
  <div v-show="loading">
    <div class="image_box">
      <van-row>
        <van-col span="2">
          <router-link to="/main/asset" >
            <van-icon size="2rem" name="arrow-left" />
          </router-link>
        </van-col>
        <van-col span="20">
          <van-image
              round
              lazy-load
              height="22rem"
              src="https://ts1.cn.mm.bing.net/th/id/R-C.4a038b5bbfa34cd6dd76a28dabdd1b97?rik=nsX2OoE8z5rYqw&riu=http%3a%2f%2fwww.estronger.cn%2fuploads%2fimg1%2f20200311%2f5e689ca44a752.png&ehk=avJnc6Y%2b6%2f0%2fqskeiR6GyO9bTyXERyLNg8YtL1JHYuc%3d&risl=&pid=ImgRaw&r=0"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>
        </van-col>
        <van-col span="2"> </van-col>
      </van-row>
    </div>
    <div class="IOT_box">
      <van-row>
        <van-col span="4"> </van-col>
        <van-col span="7" tag="aseetInfo.iotNumber">
          {{iotValue}}
        </van-col>
        <van-col span="5" tag="aseetInfo.iotNumber">
        </van-col>
        <van-col span="2"><van-tag color="#00FF00" text-color="#3D9140"> {{status_iot}}</van-tag></van-col>
        <van-col span="2">

        </van-col>
      </van-row>
    </div>
    <div class="frame_box">

      <van-row>
        <van-col span="1"> </van-col>
        <van-col span="22">
          <van-cell-group inset>
            <van-field
                disabled="true"
                v-model="frameValue"
                label="Frame:"
                placeholder="输入框内容右对齐"
                input-align="right"
                @click="show = true"
            />
            <van-field
                disabled="true"
                v-model="status_value"
                label="Status:"
                placeholder="输入框内容右对齐"
                input-align="right"
            />
          </van-cell-group>
        </van-col>

        <van-col span="1"></van-col>
      </van-row>
    </div>
    <div class="wo_box">
      dasfsadfsd
    </div>
    <div class="buttonOne">
      <div >
        <van-button round block type="success" @click="submit" :disabled="sumbmitDisabled" >
          save
        </van-button>
      </div>
    </div>
    <Dialog v-model:show="show" title="标题" show-cancel-button :confirm="updataFrame()">
      <van-cell-group inset>
        <van-field v-model="updata_frame" label="Frame:"   placeholder="请输入Frame Number" />
      </van-cell-group>
    </Dialog>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {Dialog, Notify, Toast} from 'vant';
import {getAssetInfo, updateAssetInfo} from "../../http/requst/requst.ts";
import {useRoute,useRouter} from "vue-router";
export default {
  name: "AssetDetail",
  components: {
    Dialog: Dialog.Component,//！！！！坑
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const show = ref(false);
    let status_value=ref('');
    let frameValue=ref('');
    let iotValue=ref('');
    let status_iot=ref('');
    const updata_frame=ref('');
    let sumbmitDisabled = ref(true);
    let aseetInfo = reactive({});
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration:0
    });
    const getInfo = async ()=>{
     await getAssetInfo(route.params.id).then(res=>{
       if(res.data.code==1000){
         Toast.clear();
         loading.value = true;

         aseetInfo = res.data.data;
         console.log(aseetInfo);
         frameValue.value = res.data.data.frameNumber;
         status_value.value = aseetInfo.frameStatus.statusName;
         status_iot.value = aseetInfo.iotStatus.statusName;
         iotValue.value = aseetInfo.iotNumber;
       }

     })
    }
    getInfo();
    // frameValue=(updata_frame==''?frameValue:'Frame:'+updata_frame)
    const updataFrame = ()=>{
      console.log(updata_frame.value!='');
      if(updata_frame.value != ''){
        frameValue.value = 'Frame:'+updata_frame.value;
        sumbmitDisabled.value = false;
      }
    }

    const submit= async ()=>{
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration:0
      });
      if(frameValue.value == "Frame:"+updata_frame.value){

        let asset = reactive({"frameNumber":frameValue.value,"assetId":aseetInfo.assetId})
        await updateAssetInfo(asset).then(res=>{
          Toast.clear();
          router.push({path:"/main/asset"})
          if(res.data.code == '1000'){
            Notify({type: 'success',message:"更新成功"})
            return;
          }
          Notify({type:'warning',message:"更新失败"})
          return;
        })
      }
    }

    return {
      show,
      frameValue,
      status_value,
      updata_frame,
      loading,
      aseetInfo,
      iotValue,
      status_iot,
      submit,
      updataFrame,
      sumbmitDisabled
    };
  },
}
</script>

<style scoped>
.image_box{
  margin-top:2rem;
  margin-bottom: 2rem;
}
.IOT_box{
  margin-bottom:2rem;
  font-size: 20px;
  color:#F00;
}
.content {
  padding: 16px 16px 160px;
}

.wo_box{
  height: 6rem;
}
.buttonOne{
  padding-top: 40%;
  height: 100%;
  margin:10px;
}

</style>