<template>
  <tab-bar>
    <tab-bar-item class="jxItem" v-for="(i,index) in tabbar" :key="index" :path="i.path">
      <img slot="item-icon" :src="$store.state.path+'/tabbar/'+i.img" />
      <img slot="item-icon-active" :src="$store.state.path+'/tabbar/'+i.aImg" />
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