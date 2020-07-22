<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav-bar">
      <div slot="left">
        <router-link to="/category" class="el-icon-s-fold" tag="i"></router-link>
      </div>
      <div slot="center">
        <el-input
          placeholder="衣服"
          prefix-icon="el-icon-search"
          v-model="input"
          v-on:focus="toSearch"
        ></el-input>
      </div>
      <div slot="right">
        <router-link to="/login" tag="span">
          <span>登录</span>
          <!-- <i class="el-icon-user"></i> -->
        </router-link>
      </div>
    </nav-bar>
    <scroll
      class="home-content"
      :probeType="3"
      :pull-up-load="true"
      @parentScroll="homeScroll"
      ref="scrollCom"
      @pullingUp="loadMore"
    >
      <!-- 导航背景 -->
      <div class="navbg"></div>

      <!-- 主页轮播 -->
      <home-rotation :cbanners="banners"></home-rotation>

      <!-- 功能视图 -->
      <home-feature :cFea="feaArr"></home-feature>

      <!-- 商品展示 -->
      <button @click="changeDirection">改变商品数据排列</button>
      <div class="goodsTitle" v-for="(i,key) in goods" :key="key">
        <h2>{{key}}</h2>
      </div>
      <goods-list :cgoods="showGoodsList" :isDirection="direction"></goods-list>
    </scroll>
    <span @click="toTop" class="toTop" v-if="isShowBackTop">
      <span class="el-icon-upload2"></span>
    </span>
  </div>
</template>
<script>
// 引入公共组件
import navBar from "components/common/navbar/NavBar";
// 引入公共组件中跟项目
import Scroll from "components/content/scroll/Scroll";
import goodsList from "components/content/goods/GoodsList";
// 引入当前组件的子组件
import homeRotation from "./childComp/homeRotation";
import homeFeature from "./childComp/homeFeature";
// 引入其他文件
import * as base from "network/home";

export default {
  name: "home",
  data() {
    return {
      banners: null,
      feaArr: [],
      input: "",
      isShowBackTop: false,
      // 接收商品的obj
      goods: {
        recommend: {
          page: 0,
          list: [],
          img:
            "https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png"
        },
        news: {
          page: 10,
          list: []
        }
      },
      tabCurrentType: "recommend",
      direction: true,
      isLoadmore: true
    };
  },
  components: {
    navBar,
    Scroll,
    goodsList,
    homeRotation,
    homeFeature
  },
  created() {
    // 获取主页轮播数据
    this.getHomeBanner();
    // 获取功能视图数据
    this.getHomeFeature();
    this.getGoodsMax(this.tabCurrentType);
  },
  methods: {
    // 获取轮播图片
    getHomeBanner() {
      base.getHomeBanner().then(res => {
        this.banners = res; //解构赋值
      });
    },
    getHomeFeature() {
      base.getHomeFeature().then(res => {
        for (let i = 0; i < res.length / 10; i++) {
          this.feaArr.push([]);
          for (let j = 0; j < res.length; j++) {
            if (parseInt(j / 10) == i) {
              this.feaArr[i].push(res[j]);
            }
          }
        }
        console.log(this.feaArr);
      });
    },
    getGoodsMax(type) {
      let page = this.goods[type].page + 1;
      base.getHomeMax(page).then(res => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res);
        this.$refs.scrollCom.scroll.finishPullUp();
        this.isLoadmore = true;
      });
    },
    loadMore() {
      if (!this.isLoadmore) return;
      this.isLoadmore = false;
      this.getGoodsMax(this.tabCurrentType);
    },
    homeScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      if (position.y >= 0) {
        this.$refs.scrollCom.scrollTo(0, 0, 100);
      }
    },
    toTop() {
      this.$refs.scrollCom.scrollTo(0, 0, 300);
    },
    tabClick(type) {
      this.tabCurrentType = type;
    },
    toSearch() {
      this.$router.push("/search");
    },
    changeDirection() {
      this.direction = !this.direction;
    }
  },
  computed: {
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    }
  }
};
</script>

<style lang="less" scoped>
#home {
  position: relative;
  height: 100vh;
  overflow: hidden;
  .home-content {
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    .navbg {
      background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
      position: fixed;
      top: 0;
      left: -25%;
      height: 20vh;
      width: 150%;
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
      z-index: -1;
    }
    .goodsTitle {
      display: flex;
      h2 {
        flex: 1;
        margin: 0;
      }
    }
  }
  .toTop {
    position: absolute;
    bottom: 13%;
    right: 2%;
    background-color: rgb(235, 235, 235);
    padding: 6px 8px;
    border-radius: 50px;
    font-size: 20px;
    border: 1px solid rgb(114, 114, 114);
  }
}
</style>

<style lang="less">
.home-nav-bar {
  background-color: #c82519;
  color: #ffffff;
  .el-input__inner {
    background-color: #f6f6f6;
    border-radius: 50px;
    height: 34px;
  }
  .left i,
  .right i {
    font-size: 22px;
  }
}
</style>