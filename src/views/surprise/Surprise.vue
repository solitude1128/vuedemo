<template>
  <div id="surprise">
    <!-- 固定导航 -->
    <div class="fixed" v-if="isgtFixed">
      <div class="jxipt" @click="jumpPage('/kw')">
        <el-input v-model="input" placeholder="安踏短袖" prefix-icon="el-icon-search"></el-input>
      </div>
      <goods-title :goodsT="goods" ref="gt" :isActive="tabCurrentType"></goods-title>
    </div>
    <scroll
      class="surprise_content"
      :probeType="3"
      :pull-up-load="true"
      @parentScroll="surpriseScroll"
      ref="scrollCom"
      @pullingUp="loadMore"
    >
      <!-- 导航 -->
      <nav-bar class="sc-nav-bar">
        <div slot="left">
          <router-link to="/home" class="el-icon-arrow-left" tag="i"></router-link>
        </div>
        <div slot="center">京喜</div>
        <div slot="right">
          <el-dropdown trigger="click" @command="pushRouter">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home" icon="el-icon-s-home">首页</el-dropdown-item>
              <el-dropdown-item command="/category" divided icon="el-icon-menu">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/shopCar" divided icon="el-icon-shopping-cart-2">购物车</el-dropdown-item>
              <el-dropdown-item command="/my" divided icon="el-icon-user">我的京东</el-dropdown-item>
              <el-dropdown-item command="/category" divided icon="el-icon-s-order">浏览记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>

      <div class="navbg"></div>

      <div class="jxipt" @click="jumpPage('/kw')">
        <el-input v-model="input" placeholder="安踏短袖" prefix-icon="el-icon-search"></el-input>
      </div>

      <!-- 主页轮播 -->
      <jx-rotation @bannerImgLoad="bannerImgLoad" :cbanners="jxBanners"></jx-rotation>

      <!-- 功能视图 -->
      <jx-feature class="jxFeature" :cFea="feaArr"></jx-feature>

      <!-- 商品展示 -->
      <!-- 静态 -->
      <goods-title :goodsT="goods" ref="gt" :isActive="tabCurrentType" v-if="!isgtFixed"></goods-title>
      <goods-list :cgoods="showGoodsList"></goods-list>
    </scroll>

    <span @click="toTop" class="circle toTop" v-if="isShowBackTop">
      <span class="el-icon-upload2"></span>
    </span>
  </div>
</template>
<script>
// 引入公共组件
import navBar from "components/common/navbar/NavBar";
// 引入当前组件的子组件
import jxRotation from "./childComp/jxRotation";
import jxFeature from "./childComp/jxFeature";
// 引入公共组件中跟项目
import Scroll from "components/content/scroll/Scroll";
import goodsList from "components/content/goods/GoodsList";
import goodsTitle from "components/content/goods/GoodsTitle";
// 引入其他文件
import { getjxBanner, getGoods, getjxFeature } from "network";
import { debounce } from "common/utils";
import { noData, getFeature, haveData } from "common/common";

export default {
  name: "Surprise",
  components: {
    navBar,
    jxRotation,
    jxFeature,
    Scroll,
    goodsList,
    goodsTitle,
  },
  data() {
    return {
      jxBanners: [],
      feaArr: [],
      input: "",
      goods: {
        今日推荐: {
          page: 0,
          list: [],
        },
        京东商城: {
          page: 10,
          list: [],
        },
      },
      tabCurrentType: "今日推荐",
      isLoadmore: true,
      isShowBackTop: false,
      gtOffsetTop: 0,
      isgtFixed: false,
    };
  },
  created() {
    noData(getjxBanner, (res) => {
      this.jxBanners = res.data;
    });
    getFeature(getjxFeature, 10, (res, data) => {
      this.feaArr = data;
    });
    this.getGoods(this.tabCurrentType);
  },
  methods: {
    getGoods(type) {
      let data = {
        page: this.goods[type].page + 1,
      };
      haveData(getGoods, data, (res) => {
        if (res.code != 200) return;
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.scrollCom.scroll.finishPullUp();
        this.isLoadmore = true;
      });
    },
    titleClick() {
      this.tabCurrentType = "";
    },
    loadMore() {
      if (!this.isLoadmore) return;
      this.isLoadmore = false;
      this.getGoods(this.tabCurrentType);
    },
    bannerImgLoad() {
      // 获取tab页面距离页面顶部的准确高度
      this.gtOffsetTop = this.$refs.gt.$el.offsetTop;
      console.log(this.gtOffsetTop);
    },
    surpriseScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      if (position.y >= 0) {
        this.$refs.scrollCom.scrollTo(0, 0, 100);
      }
      // 变成吸顶条
      // 在滑动的时候,判断 tab距离页面的高度 小于滚动的高度
      this.isgtFixed = -position.y > this.gtOffsetTop;
    },
    toTop() {
      this.$refs.scrollCom.scrollTo(0, 0, 300);
    },
    pushRouter(path) {
      this.$router.push(path);
    },
  },
  computed: {
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.scrollCom.refresh, 50);
    this.$bus.$on("goodsImageLoad", () => {
      refresh();
    });
  },
};
</script>

<style lang="less" scoped>
.fixed {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #f1503b;
}
.surprise_content {
  position: absolute;
  top: 0;
  bottom: 50px;
  left: 0;
  .sc-nav-bar {
    position: relative;
    background-color: #fff;
    line-height: 40px;
  }
  .navbg {
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
  }
  .jxipt {
    width: 93%;
    margin: 0 auto;
  }
  .jxFeature {
    background-color: #fff;
  }
}
</style>

<style lang="less">
.el-input__inner {
  background-color: rgb(246, 246, 246);
  border-radius: 50px;
  margin: 2% 0;
}
.el-dropdown-menu__item {
  text-align: left;
}
</style>