<template>

  <div>
    <van-search
        v-model="search_value"
        show-action
        placeholder="请输入搜索关键词"
        @update:modelValue="onSearch()"
        @cancel="onCancel"
    ><template #action>
      <van-icon name="scan" v-if="scan2"/>
    </template>
    </van-search>
  </div>



</template>

<script>
import {useRoute} from 'vue-router'
import {reactive, ref} from "vue";
import AssetCard from "./AssetCard.vue";
export default {
  name: "Search",

  setup(props,ctx) {


    let search = reactive({search_value:""})
    const route = useRoute();
    const search_value = ref();
    const scan2 = ref(route.meta.scan2);
    const onSearch = ()=>{
      setTimeout(()=>{
        search.search_value = search_value.value
        // asset.frameNumber = search_value.value
        // asset.iotNumber = search_value.value
        // console.log(search_value.value);
        ctx.emit('sift',search);
      },500);
    }
    return {scan2,onSearch,search_value}
  }
}
</script>

<style scoped>

</style>