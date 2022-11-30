<template>
  <div id="card-box">
    <van-tag type="warning" id="grade" size="medium">标签</van-tag>
    <div id="card">
      <van-space>
        <div id="id_box">
          <div id="wo">WO#:{{ info.woId }}</div>
          <div>WO Title:{{ info.title }}</div>
        </div>
        <van-space></van-space>
        <van-space></van-space>
        <van-space direction="vertical" fill>
          <van-tag plain type="success">{{info.woStatusId.statusName}}</van-tag>
          <van-space></van-space>
<!--          <van-tag plain type="success">标签</van-tag>-->
        </van-space>

        <div id="score">
          <van-circle
            v-model:current-rate="currentRate"
            :rate="100"
            :speed="100"
            :text="info.woScores"
            size="40px"
          />
        </div>
      </van-space>
    </div>
    <div id="info">
      <van-row>
        <van-col span="2"><van-image
            round
            lazy-load
            width="1.5rem"
            height="1.5rem"
            src="https://tse4-mm.cn.bing.net/th/id/OIP-C.hpGAgR1fq1-SPPQfnFv_0wHaFL?pid=ImgDet&rs=1"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image></van-col>
        <van-col span="1"></van-col>
        <van-col span="8">{{info.asset.iotNumber}}</van-col>
        <van-col span="8">{{info.asset.frameNumber}}</van-col>
      </van-row>



    </div>

  </div>
</template>

<script>
import {ref, toRefs} from "vue";

export default {
  name: "WoCard",
  props:['info'],
  setup(props,ctx){
    let {info} = toRefs(props);
    const currentRate = ref(0);
    return {
      currentRate,
      info
    }
  }
}
</script>

<style scoped>
#card-box{
  position: relative;
  margin:10px;
  padding-top: 10px;
  margin-top: 10px;
  border-radius:15px;

  background: #ffffff;
  box-shadow: 0px 5px 5px rgba(162, 160, 160, 0.5);
  width: 95%;
}
#info{
  margin-left: 5%;
  margin-top: 5px;
  font-size: 14px;
}
#card{
  padding-top: 4%;
  box-shadow: 0px 1px 0px rgba(162, 160, 160, 0.5);
  margin-left: 5%;
  width: 90%;
  height: 4rem;
}
#wo{
  font-size: 20px;
  font-weight:600;
}
#grade{
  position:absolute;
  top:0px;
  right: 5px;
}
#score{
  position:absolute;
  top:30px;
  right: 20px;
}
</style>