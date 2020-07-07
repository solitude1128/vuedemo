<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <Main-tabbar></Main-tabbar>
  </div>
</template>

<script>
import MainTabbar from "@/components/content/mainTabbar/MainTabbar";
export default {
  name: "App",
  components: {
    MainTabbar
  }
};
</script>

<style>
@import "assets/src/base.css";
</style>
