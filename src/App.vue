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
export default {
  name: "App",
  created() {
    if (localStorage.autocode) {
      this.$store.dispatch("getUserInfo", localStorage.autocode);
    } else {
      this.jumpPage("/login");
    }
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
  },
};
</script>

<style>
@import "assets/src/base.css";
</style>