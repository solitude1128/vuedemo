<template>
  <div id="app">
    <!-- 
      缓存中会存有数据记录,所以在使用的时候,会出现数据不进行替换
      正常使用中,如果不使用keep-alive
    -->
    <keep-alive :exclude="$store.state.keepExclude">
      <router-view />
    </keep-alive>
    <jd-tabbar v-if="isJdTabBar"></jd-tabbar>
    <jx-tabbar v-if="isJxTabBar"></jx-tabbar>
  </div>
</template>

<script>
import jdTabbar from "components/content/mainTabbar/JdTabbar";
import jxTabbar from "components/content/mainTabbar/JxTabbar";
import { requestCity } from "network/request";
export default {
  name: "App",
  created() {
    requestCity().then((res) => {
      // 如果没有用户登录,则配送地址为获取的地址
      this.$store.state.address = eval(
        "(" + res.slice(res.indexOf("=") + 1, res.length - 1) + ")"
      ).cname;
    });
  },
  components: {
    jdTabbar,
    jxTabbar,
  },
  computed: {
    isJdTabBar() {
      return this.$store.state.TabBar.isJdTabBar;
    },
    isJxTabBar() {
      return this.$store.state.TabBar.isJxTabBar;
    },
    user() {
      return (
        this.$store.state.userInfo != "" &&
        this.$store.state.userInfo != null &&
        this.$store.state.userInfo != undefined
      );
    },
  },
};
</script>

<style>
@import "assets/src/base.css";
</style>