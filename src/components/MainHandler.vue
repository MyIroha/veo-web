<template>
  <div class="box">
    <div class="van-hairline--top title">{{info}}</div>
<!--    <van-search-->
<!--        v-model="search_value"-->
<!--        show-action-->
<!--        placeholder="请输入搜索关键词"-->
<!--        @update:modelValue="onSearch()"-->
<!--        @cancel="onCancel"-->
<!--    >-->
<!--      <template #action>-->
<!--        <van-icon name="scan" v-if="scan2"/>-->
<!--      </template>-->
<!--    </van-search>-->
    <Search/>
    <van-dropdown-menu>
      <van-dropdown-item title="IOT Status" v-model="value1" :options="option1" @click="getIOT(value1)"/>
      <van-dropdown-item title="Frame Status" v-model="value2" :options="option2" @click="getFrame(value2)"/>
      <van-dropdown-item title="Vechicle type" v-if="isShow" v-model="value3" :options="option3" @click="getVechicle(value3)"/>
    </van-dropdown-menu>




  </div>

</template>

<script>
import {reactive, ref} from "vue";
import {useRoute} from 'vue-router'
import { defineEmits } from 'vue'
import Search from "./Search.vue";
export default {
  name: "MainHandler",
  components: {Search},
  props:['info','isShow'],

  setup(props, ctx){
    // 使用defineEmits创建名称，接受一个数组
    // const emit = defineEmits(['sift'])
    const route = useRoute();
    const scan2 = ref(route.meta.scan2);
    const value1 = ref(0);
    const value2 = ref(0);
    const value3 = ref(0);
    const search_value = ref();
    const option1 = [
      { text: 'IOT Status', value: null },
      { text: 'Offline', value: 1 },
      { text: 'Normal', value: 3 },
    ];
    const option2 = [
      { text: 'Frame Status', value: null },
      { text: 'Deployed', value: 2 },
      { text: 'Priority High', value: 4 },
    ];
    const option3 = [
      { text: 'Vechicle type', value: null },
      { text: 'VS4', value: 1 },
      { text: 'VS3 ', value: 2 },
      { text: 'Comos', value: 3 },
      { text: 'C9 ', value: 4 },
      { text: 'US1 ', value: 5 },
    ];

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

    // const onSearch = ()=>{
    //
    //   setTimeout(()=>{
    //     asset.frameNumber = search_value.value
    //     asset.iotNumber = search_value.value
    //     console.log(search_value.value);
    //     ctx.emit('sift',asset);
    //   },500);
    // }



    const getIOT = (val)=>{
      asset.iotStatus.statusId=val;
      ctx.emit('sift',asset);
      // console.log(val);
    }
    const getFrame = (val)=>{
      asset.frameStatus.statusId=val;
      // console.log(val);
      ctx.emit('sift',asset);
    }
    const getVechicle=(val)=>{
      asset.vechicleType.vechicleId=val;
      ctx.emit('sift',asset);
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
      search_value,
      // onSearch,
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