<template>
  <tab-bar>
    <tab-bar-item v-for="(i,index) in tabbar" :key="index" :path="i.src">
      <img slot="item-icon" :src="i.img" />
      <img slot="item-icon-active" :src="i.aimg" />
      <div slot="item-text">{{i.name}}</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "@/components/tabbar/TabBar";
import tabBarItem from "@/components/tabbar/TabBarItem";
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
          name: "主页",
          img: require("@/assets/images/tabbar/home.svg"),
          aimg: require("@/assets/images/tabbar/home_active.svg"),
          src: "/home"
        },
        {
          name: "分类",
          img: require("@/assets/images/tabbar/category.svg"),
          aimg: require("@/assets/images/tabbar/category_active.svg"),
          src: "/category"
        },
        {
          name: "购物车",
          img: require("@/assets/images/tabbar/shopcart.svg"),
          aimg: require("@/assets/images/tabbar/shopcart_active.svg"),
          src: "/shopcart"
        },
        {
          name: "我的",
          img: require("@/assets/images/tabbar/profile.svg"),
          aimg: require("@/assets/images/tabbar/profile_active.svg"),
          src: "/my"
        }
      ]
    };
  }
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  color: #1c2631;
  background-color: #41b883;
  border-top: 2px solid #776a47;
}
#tab-bar .tab-bar-item {
  flex: 1;
  font-size: 14px;
}
#tab-bar .tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 5px 0 2px 0;
  vertical-align: middle;
}
.active {
  color: rgb(97, 18, 31);
}
</style>