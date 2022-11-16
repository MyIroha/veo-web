<template>
<!--  <van-nav-bar-->
<!--      title="标题"-->
<!--      left-text=""-->
<!--      left-arrow-->
<!--      @click-left="onClickLeft"-->
<!--      @click-right="onClickRight"-->
<!--  >-->
<!--    <template #right>-->
<!--      <van-icon name="search" size="18" />-->
<!--    </template>-->
<!--  </van-nav-bar>-->
    <router-view></router-view>
    <van-tabbar v-model="active" @change="onChange" route="true">
      <van-tabbar-item icon="home-o" name="home" >Home</van-tabbar-item>
      <van-tabbar-item icon="search" name="asset" >Asset</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="repair">Repair</van-tabbar-item>
      <van-tabbar-item icon="setting-o" name="inventry">Inventry</van-tabbar-item>
    </van-tabbar>


</template>

<script setup>
import {useRouter} from 'vue-router'
import { ref } from 'vue';
import { Toast } from 'vant';

const route = useRouter();
const active = ref(0);
const onChange = (index) => {
  route.push({name:index})
};

</script>

<style scoped>

</style>