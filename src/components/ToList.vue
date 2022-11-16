<template>

    <div>
<!--        <AssetCard></AssetCard>-->
      <slot></slot>
    </div>



</template>

<script>
import {ref} from "vue";
import {Toast} from "vant";
// import AssetCard from "./AssetCard.vue";
export default {
  name: "ToList",

  setup() {
    // const list = [1,2,3,4];
    //
    // return {list}
  }
}
</script>

<style scoped>

</style>