<template>
  <div id="card">
    <div id="card-box">
        <van-space>
          <van-image
              round
              lazy-load
              width="4rem"
              height="4rem"
              :src="info.vechicleType.vechicleIcon"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>


        <div id="id_box">
          <div>{{info.iotNumber}}</div>
          <div>{{info.frameNumber}}</div>
        </div>


        <van-space direction="vertical" fill>
          <van-tag color="#00FF00" text-color="#3D9140">{{ info.iotStatus.statusName
            }}</van-tag>
          <van-tag color="#00FF00" text-color="#3D9140">{{ info.frameStatus.statusName
            }}</van-tag>
        </van-space>

        <div class="type">
          <van-circle
              v-model:current-rate="currentRate"
              :rate="100"
              :speed="100"
              :text="info.vechicleType.vechicleName"
              size="50px"
          />
        </div>
      </van-space>
    </div>
    <van-divider />
  </div>

</template>

<script>

import {computed, ref, defineProps, toRefs} from "vue";

export default {
  name: "AssetCard;",
  props:['info'],
  setup(props,ctx){

    let {info} = toRefs(props);
    const currentRate = ref(0);
    return{
      currentRate,
      info
    }

  }
}
</script>

<style scoped>
#card{
  height: 80px;
  width: 90%;
  display: flex;
  margin-left: 5%;

}
#id_box{
  width: 90%;
}
#card-box{
  align-items: center;
  width: 100%;

}
.type{
  position: absolute;
  right: 10px;
}

</style>