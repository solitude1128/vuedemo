<template>
  <tab-bar>
    <tab-bar-item class="jxItem" v-for="(i,index) in tabbar" :key="index" :path="i.path">
      <img slot="item-icon" :src="path+i.img" />
      <img v-if="i.aImg" slot="item-icon-active" :src="path+i.aImg" />
      <router-link v-else to="/my"></router-link>
      <span slot="item-text">{{i.name}}</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "components/common/tabbar/TabBar";
import tabBarItem from "components/common/tabbar/TabBarItem";
import * as base from "network/jxTabbar";
export default {
  name: "JxTabbar",
  components: {
    tabBar,
    tabBarItem,
  },
  data() {
    return {
      tabbar: [],
      path: "http://106.12.85.17:8090/public/image/tabbar/",
    };
  },
  mounted() {
    this.getTabbar();
  },
  methods: {
    getTabbar() {
      base.getjxTabBar().then((res) => {
        this.tabbar = res.data;
      });
    },
  },
};
</script>

<style lang="less">
.jxItem img {
  width: 20% !important;
}
</style>