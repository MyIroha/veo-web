<template>
<!--  我是asset-->
  <van-sticky>

    <MainHandler :info="title" :isShow="isShow"
                 :assetinfo="asset" @sift="sift"
                 class="hander">
      <Search @sift="sift" ></Search>
    </MainHandler>
  </van-sticky>
  <van-empty description="描述文字" v-if="empty">
<!--    <van-button round type="primary" class="bottom-button">刷新</van-button>-->
  </van-empty>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" >
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
       <AssetCard v-for="(value,index) of list" :key="index" :info="value" @click="gotoInfo(value.assetId)"/>
    </van-list>
  </van-pull-refresh>



</template>

<script >
import Search from "../components/Search.vue";
import MainHandler from "../components/MainHandler.vue";
import AssetCard from "../components/AssetCard.vue"
import {useRoute,useRouter} from 'vue-router'
import {selectAssets,getAssetFilterItems} from '../http/requst/requst.ts'
import {reactive, ref} from 'vue'

export default {
  name: "Asset",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const title = ref(route.meta.title);
    const isShow = ref(route.meta.show);
    const empty = ref(false)
    let asset=reactive({
      "frameNumber":"",
      "iotNumber":"",
      "vechicleType":{
        "vechicleId":0
      },
      "iotStatus":{
        "statusId":0
      },
      "frameStatus":{
        "statusId":0
      },
      "pageDTO":{
        "page":1,
        "count":10,
        "many":false
      }
    });


    const gotoInfo = (val)=>{
      router.push({path:`/main/aseet/assetInfo/${val}`})
      console.log(val);
    }

    const sift = (val)=>{
      asset.iotNumber = val.search_value;
      asset.frameNumber = val.search_value;
      asset.pageDTO.many=false;
      asset.pageDTO.page=1;
      asset.vechicleType.vechicleId = val.vechicleId
      asset.iotStatus.statusId=val.iotStatusId;
      asset.frameStatus.statusId=val.frameStatusId;

      list.value = [];
      asset.pageDTO.many = false
      onLoad()
    }

    const onLoad =  () => {
      loading.value = true;
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
          asset.pageDTO.page=1;
          asset.pageDTO.many=false;
        }
        if(asset.pageDTO.many){
          finished.value = true;
          return;
        }
      selectAssets(asset,list,(list,value)=>{
            empty.value=false
            loading.value = true;
            if(value==null){
              asset.pageDTO.page--
              // asset.pageDTO.many=true;
              return;
            }
            asset.pageDTO.page++;
            value.map((l)=>{
              list.value.push(l);
            })
            if(list.value.length == 0){
              empty.value=true
              loading.value = false;
            }
            if(value.length<10){
              asset.pageDTO.many=true;
              loading.value = false;
              return;
            }
            loading.value=false;
            return;
          });



        // if (list.value.length >= 100) {
        //   finished.value = true;
        // }
    };

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;
      asset.pageDTO.page=1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      title,
      isShow,
      asset,
      sift,
      empty,
      gotoInfo
    };
  },
}

</script>

<style scoped>
/*.sm-box{*/
/*  background: red;*/
/*  height: 100%;*/
/*  padding-bottom: 80%;*/
/*  padding-top: 100%;*/
/*}*/
/*.list{*/
/*  !*background: #39a9ed;*!*/
/*  margin-bottom: -100%;*/
/*  margin-top: -98%;*/
/*  top: 0;*/
/*  padding-top: 0;*/
/*}*/
</style>