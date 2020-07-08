<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">&lt;</div>
      <div slot="center">
        <input type="search" placeholder="衣服" />
      </div>
      <div slot="right">登录</div>
    </nav-bar>
    <ul class="banner">
      <li v-for="(item,index) in banners" :key="index">
        <img :src="path+item.crs" />
      </li>
    </ul>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
import * as base from "network/home";
export default {
  name: "home",
  data() {
    return {
      banners: {},
      path: "http://106.12.85.17:9091/public/image/banner/"
    };
  },
  components: {
    navBar
  },
  created() {
    //vue实例在创建时的钩子函数
    // 页面在创建的时候,我们需要请求数据
    this.getHomeBanner();
  },
  methods: {
    getHomeBanner() {
      base.getHomeBanner().then(res => {
        console.log(res);
        this.banners = { ...res }; //解构赋值
        // 三个点代表数组的结构
      });
    }
  }
};
</script>

<style lang="less" scoped>
#home {
  padding-top: 40px;
  height: 100vh;
  .home-nav-bar {
    width: 100vw;
    background: #41b883;
    color: white;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    input {
      width: 95%;
      padding: 3px 9px;
    }
  }
  .banner {
    padding: 0;
    margin: 0;
    width: 100vw;
    li {
      list-style: none;
    }
    img {
      width: 98vw;
    }
  }
}
</style>