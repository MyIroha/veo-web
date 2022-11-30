<template>
  <van-sticky>
    <MainHandler :info="title">
      <Search @sift="sift" ></Search>
    </MainHandler>
  </van-sticky>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" >
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <WoRequestCard v-for="(value,index) of woData.request" :info="value" :key="index"></WoRequestCard>
      <WoCard v-for="(value,index) of woData.wo" :info="value" :key="index"></WoCard>

    </van-list>
  </van-pull-refresh>
</template>

<script>
import Search from "../components/Search.vue";
import WoCard from "../components/WoCard.vue";
import MainHandler from "../components/MainHandler.vue";
import WoRequestCard from "../components/WoRequestCard.vue";
import {useRoute} from "vue-router";
import {reactive, ref} from "vue";
import {getWoList} from "../http/requst/requst.ts";
export default {
  name: "Repair",
  setup() {
    const route = useRoute();
    console.log(route.meta.title);
    const title = ref(route.meta.title);
    let wo = reactive({});
    let woData =reactive({
      request:[],
      wo:[]
    });
    let wolist = async ()=>{
      await getWoList(wo).then(({request,wo}) =>{
        woData.request =request;
        woData.wo = wo;
      },(err)=>{

      })
    }
    wolist();
    return {
      title,
      wo,
      wolist,
      woData
    }
  }
}
</script>

<style scoped>

</style>