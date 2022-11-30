<template>
  <div class="box">
    <div class="van-hairline--top title">{{info}}</div>
    <slot/>
    <van-dropdown-menu>
      <van-dropdown-item title="IOT Status" v-model="value1" :options="itemsLiset.option1" @click="getIOT(value1)"/>
      <van-dropdown-item title="Frame Status" v-model="value2" :options="itemsLiset.option2" @click="getFrame(value2)"/>
      <van-dropdown-item title="Vechicle type" v-if="isShow" v-model="value3" :options="itemsLiset.option3" @click="getVechicle(value3)"/>
    </van-dropdown-menu>




  </div>

</template>

<script>
import {reactive, ref} from "vue";
import {useRoute} from 'vue-router'
import { defineEmits } from 'vue'
import {getAssetFilterItems} from '../http/requst/requst.ts';
export default {
  name: "MainHandler",
  props:['info','isShow'],

  setup(props, ctx){
    // 使用defineEmits创建名称，接受一个数组
    // const emit = defineEmits(['sift'])
    const route = useRoute();
    const scan2 = ref(route.meta.scan2);
    const value1 = ref(0);
    const value2 = ref(0);
    const value3 = ref(0);
    let itemsLiset = reactive({});


    const {option1, option2,option3} =[];
    if(props.info == 'Asset Management'){
      itemsLiset =  JSON.parse(sessionStorage.getItem("items"));
      console.log(itemsLiset);
    }

    let asset=reactive({
      "vechicleId":0,
      "iotStatusId":0,
      "frameStatusId":0,
    });
    const getIOT = (val)=>{
      if(asset.iotStatusId == val){
        asset.iotStatusId = 0;
        ctx.emit('sift',asset);
        return;
      }
      asset.iotStatusId=val;
      ctx.emit('sift',asset);
      return;
    }
    const getFrame = (val)=>{
      if(asset.frameStatusId == val){
        asset.frameStatusId = 0;
        ctx.emit('sift',asset);
        return;
      }
      asset.frameStatusId=val;
      // console.log(val);
      ctx.emit('sift',asset);
      return;
    }
    const getVechicle=(val)=>{
      if(asset.vechicleId == val){

        asset.vechicleId = 0;
        ctx.emit('sift',asset);
        return;
      }
      asset.vechicleId=val;
      ctx.emit('sift',asset);
      return;
    }
    return {
      value1,
      value2,
      option1,
      option2,
      scan2,
      value3,
      option3,
      getIOT,
      getFrame,
      getVechicle,
      itemsLiset
    };
  }

}
</script>

<style scoped>
  .title{
    margin-left: 10px;
    font-size: 20px;
  }
  .box{
    padding-top: 5%;
    background: white;
  }
</style>