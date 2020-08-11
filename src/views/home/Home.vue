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
          v-on:focus="jumpPage('/kw')"
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
      <goods-title :goodsT="goods"></goods-title>
      <goods-list :cgoods="showGoodsList" :isDirection="direction"></goods-list>
    </scroll>

    <span @click="toTop()" class="circle toTop" v-if="isShowBackTop">
      <span class="el-icon-upload2"></span>
    </span>
    <span @click=" this.direction = !this.direction" class="circle">
      <span class="el-icon-menu"></span>
    </span>
  </div>
</template>
<script>
// 引入公共组件
import navBar from "components/common/navbar/NavBar";
// 引入公共组件中跟项目
import Scroll from "components/content/scroll/Scroll";
import goodsList from "components/content/goods/GoodsList";
import goodsTitle from "components/content/goods/GoodsTitle";
// 引入当前组件的子组件
import homeRotation from "./childComp/homeRotation";
import homeFeature from "./childComp/homeFeature";
// 引入其他文件
import { getHomeBanner, getHomeFeature } from "network";
import { debounce } from "common/utils";
import { noData, haveData, getFeature } from "common/common";
import { getGoods } from "network/goods.js";

export default {
  name: "Home",
  created() {
    // 网络请求
    noData(getHomeBanner, (res) => {
      this.banners = res.data;
    });
    getFeature(getHomeFeature, 10, (res, data) => {
      this.feaArr = data;
    });
    this.getGoodsData(this.tabCurrentType);
  },
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
          img:
            "//img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png",
          list: [],
        },
      },
      tabCurrentType: "recommend",
      direction: false,
      isLoadmore: true,
      saveY: 0, //滚动条y的值
    };
  },
  components: {
    navBar,
    Scroll,
    goodsList,
    goodsTitle,
    homeRotation,
    homeFeature,
  },
  activated() {
    console.log("组件激活状态");
    // 在组件激活的时候,调整滚动条的位置
    this.$refs.scrollCom.scrollTo(0, this.saveY, 0);
    this.$refs.scrollCom.refresh();
  },
  deactivated() {
    console.log("组件未激活状态");
    // 在组件离开的时候,记录滚动条的位置
    this.saveY = this.$refs.scrollCom.scroll.y;
  },
  methods: {
    // 每加载一次这个事件会从数据库里取50条数据,且当前数组的页数加1
    getGoodsData(type) {
      let data = {
        page: this.goods[type].page + 1,
        pagesize: 10,
      };
      haveData(getGoods, data, (res) => {
        if (res.code != 200) return;
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        console.log(this.goods[type].list);
        this.$refs.scrollCom.scroll.finishPullUp();
        this.isLoadmore = true;
      });
    },
    // 加载更多
    loadMore() {
      if (!this.isLoadmore) return;
      this.isLoadmore = false;
      this.getGoodsData(this.tabCurrentType);
    },
    // 主页滚动时的一些事件
    homeScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      if (position.y >= 0) {
        this.$refs.scrollCom.scrollTo(0, 0, 100);
      }
    },
    // 返回顶部
    toTop() {
      this.$refs.scrollCom.scrollTo(0, 0, 300);
    },
    // 切换控制器选中的点击事件
    tabClick(type) {
      this.tabCurrentType = type;
    },
  },
  computed: {
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    },
  },
  mounted() {
    // 使用防抖方法,放置图片刷新被多次循环调用,在指定时间内,如果没有图片加载完成,我们在刷新scroll高度
    const refresh = debounce(this.$refs.scrollCom.refresh, 50);
    this.$bus.$on("goodsImageLoad", () => {
      // 当图片加载完成,通过$bus总线执行当前方法然后对BScroll 进行重新计算高度
      refresh();
    });
  },
};
</script>

<style lang="less" scoped>
.home-nav-bar {
  background-color: #c82519;
  color: #ffffff;
  .left i,
  .right i {
    font-size: 22px;
  }
}
.home-content {
  position: absolute;
  bottom: 50px;
  left: 0;
  top: 50px;
  .navbg {
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
  }
}
</style>

<style lang="less">
.el-input__inner {
  background-color: #f6f6f6;
  border-radius: 50px;
  height: 34px;
}
</style>