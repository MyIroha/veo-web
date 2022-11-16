<template>
  <MainHandler :info="title"></MainHandler>

</template>

<script>
import MainHandler from "../components/MainHandler.vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
export default {
  name: "Inventry",
  setup() {
    const route = useRoute();
    const title = ref(route.meta.title);
    return {
      title
    }
  }
}
</script>

<style scoped>

</style>