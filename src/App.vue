<template>
  <div id="app">
    <!-- 
      缓存中会存有数据记录,所以在使用的时候,会出现数据不进行替换
      正常使用中,如果不使用keep-alive
    -->
    <keep-alive :exclude="keepExclude">
      <router-view />
    </keep-alive>

    <main-tabbar v-if="isShowMT"></main-tabbar>
    <jx-tabbar v-if="isShowJT"></jx-tabbar>
  </div>
</template>

<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar";
import jxTabbar from "components/content/jxTabbar/JxTabbar";
export default {
  name: "App",
  data() {
    return {
      isShowMT: true,
      isShowJT: false,
      userId: null,
      keepExclude: "Details,Cart",
    };
  },
  components: {
    MainTabbar,
    jxTabbar,
  },
};
</script>

<style>
@import "assets/src/base.css";
</style>