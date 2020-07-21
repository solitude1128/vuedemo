<template>
  <tab-bar>
    <tab-bar-item v-for="(i,index) in tabbar" :key="index" :path="i.src">
      <img slot="item-icon" :src="i.img" />
      <img slot="item-icon-active" :src="i.aimg" />
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import * as base from "network/mainTabbar";
import tabBar from "components/common/tabbar/TabBar";
import tabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabbar",
  components: {
    tabBar,
    tabBarItem
  },
  data() {
    return {
      tabbar: [
        {
          name: "首页",
          img:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/81741/30/12345/4140/5d9c4b13E726f0a1e/82c582e7c375e4b3.png",
          aimg:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/67550/26/12426/5094/5d9c4b13Eea435a3f/81328b0609c60a3c.png",
          src: "/home"
        },
        {
          name: "分类",
          img:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/56507/6/12787/3168/5d9c4b12Ef363dd8d/4af32f42575509d8.png",
          aimg:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/48787/24/12910/3390/5d9c4b12Ee63270e4/4481f5b3dbad979d.png",
          src: "/category"
        },
        {
          name: "京喜",
          img:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/70651/38/12417/3194/5d9d3eafE12cde68b/2467c20113c50451.png",
          aimg:
            "//img12.360buyimg.com/img/s80x80_jfs/t1/110059/39/6854/5337/5e5393feE18b8d779/b70a8d50bac3834f.png.webp",
          src: "/surprise"
        },
        {
          name: "购物车",
          img:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/64954/4/12406/3529/5d9c4b12Ee7a82735/f2fe0a88bf344736.png",
          aimg:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/45205/32/12889/3890/5d9c4b12E7bc2c425/dd60fafbde8542ca.png",
          src: "/shopcart"
        },
        {
          name: "我的",
          img:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/68400/36/12368/3153/5d9c4b13E0e0d80a8/876c40f17d91ce44.png",
          aimg:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/47480/36/12929/3209/5d9c4b13E97caa63a/4dc0ec8a7e47c2b7.png",
          src: "/my"
        }
      ],
      path: "http://106.12.85.17:9091/",
      bannerSrc: "public/image/banner/"
    };
  },
  mounted() {
    this.getTabbar();
  },
  methods: {
    getTabbar() {
      base.getTabBar().then(res => {
        console.log(res);
      });
    }
  }
};
</script>