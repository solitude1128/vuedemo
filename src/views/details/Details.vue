<template>
  <div id="details">
    <!-- 初识顶部导航 -->
    <div>
      <i @click="back" :style="hideOpacity" class="topleft dCircle el-icon-arrow-left"></i>
      <el-dropdown
        :style="hideOpacity"
        class="dCircle topright"
        trigger="click"
        @command="pushRouter"
      >
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/home" icon="el-icon-s-home">首页</el-dropdown-item>
          <el-dropdown-item command="/category" divided icon="el-icon-menu">分类搜索</el-dropdown-item>
          <el-dropdown-item command="/shopCar" divided icon="el-icon-shopping-cart-2">购物车</el-dropdown-item>
          <el-dropdown-item command="/category" divided icon="el-icon-s-order">浏览记录</el-dropdown-item>
          <el-dropdown-item command="/my" divided icon="el-icon-sugar">我的关注</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 滚动后固定的导航 -->
    <nav-bar class="details-navbar" :style="showOpacity">
      <div slot="left">
        <i @click="back" class="el-icon-arrow-left"></i>
      </div>
      <el-tabs slot="center" ref="tabCenter" v-model="currentIndex" @tab-click="tabCenterClick">
        <el-tab-pane v-for="(item,index) in titleArr" :key="index" :label="item" :name="item"></el-tab-pane>
      </el-tabs>
      <div slot="right">
        <el-dropdown trigger="click" @command="pushRouter">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/home" icon="el-icon-s-home">首页</el-dropdown-item>
            <el-dropdown-item command="/category" divided icon="el-icon-menu">分类搜索</el-dropdown-item>
            <el-dropdown-item command="/shopCar" divided icon="el-icon-shopping-cart-2">购物车</el-dropdown-item>
            <el-dropdown-item command="/category" divided icon="el-icon-s-order">浏览记录</el-dropdown-item>
            <el-dropdown-item command="/my" divided icon="el-icon-sugar">我的关注</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav-bar>

    <scroll
      class="details-content"
      :probeType="3"
      :pull-up-load="true"
      @parentScroll="dScroll"
      ref="ds"
    >
      <div class="shop">
        <details-banner :cFea="detailsGoods.img_detalis_list"></details-banner>

        <details-base-info></details-base-info>

        <!-- 商品名字的盒子 -->
        <details-shop class="dNameBox">
          <div slot="shopDT">{{detailsGoods.name}}</div>
          <div>
            <i class="el-icon-time"></i>
            <br />降价提醒
          </div>
          <div>
            <i class="el-icon-sugar"></i>
            <br />收藏
          </div>
        </details-shop>
        <!-- 优惠的盒子 -->
        <details-shop>
          <div @click="yh = true" slot="shopDT">优惠</div>
          <div @click="yh = true">
            <p>
              <span class="left activeBox">满19减10</span>
              <span class="right el-icon-more"></span>
            </p>
            <p>
              <span class="activeBox">跨店铺满折</span>
              <span>满2件，总价打8折；满3件，总价打7折</span>
            </p>
            <p>
              <span class="activeBox">限购</span>
              <span>购买不超过30件时享受单件价￥55，超出数量以结算价为准</span>
            </p>
          </div>
        </details-shop>
        <!-- 已选的盒子 -->
        <details-shop style="margin:0;">
          <div @click="yx = true" slot="shopDT">已选</div>
          <div @click="yx = true">
            <p>
              <span class="left">9寸黄色拍拍球 1个</span>
              <span class="right el-icon-more"></span>
            </p>
            <p class="gray">本商品支持礼品包装，点击可选服务</p>
          </div>
        </details-shop>
        <!-- 送至的盒子 -->
        <details-shop class="contentBox">
          <div @click="sz = true" slot="shopDT">送至</div>
          <div @click="sz = true">
            <p>
              <span class="left">北京朝阳区三环到四环之间</span>
              <span class="right el-icon-more"></span>
            </p>
            <p>
              <span class="activeBox">现货</span>
              <span class="gray">23:10前下单，预计明天(07月30日)送达</span>
            </p>
          </div>
        </details-shop>
        <!-- 重量的盒子 -->
        <details-shop class="contentBox">
          <div slot="shopDT">重量</div>
          <span class="left">0.17kg</span>
        </details-shop>
        <!-- 售后的盒子 -->
        <details-shop class="shBox">
          <div @click="sh = true">
            <p>
              <span class="gray">99元免基础运费(20kg内)</span>
              <span class="right el-icon-more"></span>
            </p>
            <p>aaa</p>
            <p>aaa</p>
          </div>
        </details-shop>
      </div>
      <div style="height:800px;">评价组件</div>
      <div style="height:800px;">详情组件</div>
      <div style="height:800px;">推荐组件</div>
    </scroll>
    <details-tabbar></details-tabbar>

    <!-- ************************************* -->
    <el-drawer :visible.sync="yh" direction="btt" :with-header="false" append-to-body>
      <h3>
        优惠
        <span class="right" @click="yh=false">x</span>
      </h3>
    </el-drawer>
    <!-- ************************************* -->
    <el-drawer :visible.sync="yx" direction="btt" :with-header="false" append-to-body>
      <h3>
        已选
        <span class="right" @click="yx=false">x</span>
      </h3>
    </el-drawer>
    <!-- ************************************* -->
    <el-drawer :visible.sync="sz" direction="btt" :with-header="false" append-to-body>
      <h3>
        配送至
        <span class="right" @click="sz=false">x</span>
      </h3>
    </el-drawer>
    <!-- ************************************* -->
    <el-drawer :visible.sync="sh" direction="btt" :with-header="false" append-to-body>
      <h3>
        服务说明
        <span class="right" @click="sh=false">x</span>
      </h3>
    </el-drawer>
  </div>
</template>

<script>
// 引入公共组件
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import detailsBanner from "./childCom/detailsBanner";
import detailsShop from "components/common/detailsShop/DetailsShop";
import detailsBaseInfo from "./childCom/detailsBaseInfo";
import detailsTabbar from "./childCom/detailsTabbar";

import { getSearchGoods } from "common/common";
import { getGoodsId } from "network/goods.js";
export default {
  name: "Details",
  created() {
    this.getDgoods(this.$route.params.did);
  },

  data() {
    return {
      detailsGoods: {},
      titleArr: ["商品", "评价", "详情", "推荐"],
      isShowBackTop: false,
      showOpacity: { opacity: 0 },
      hideOpacity: { opacity: 1 },
      yh: false,
      yx: false,
      sz: false,
      sh: false,
      currentIndex: "商品",
    };
  },
  components: {
    navBar,
    Scroll,
    detailsBanner,
    detailsShop,
    detailsBaseInfo,
    detailsTabbar,
  },
  watch: {
    // 监听数据改变,做一些数据变化的事情
  },
  methods: {
    getDgoods(id) {
      getSearchGoods(getGoodsId, id, (res) => {
        console.log(res.data);
        this.detailsGoods = res.data.goodsData;
        console.log(this.detailsGoods);
      });
    },
    tabCenterClick(val) {
      // constructor	返回对创建此对象的 Number 函数的引用 || 验证val的数据类型
      console.log(val.constructor);
      let num = 0;
      if (/^\d{1,}$/.test(val)) {
        num = val;
        this.currentIndex = this.titleArr[val - 1];
      } else {
        let arr = val.$el.id.split("-");
        this.currentIndex = arr[arr.length - 1];
        this.titleArr.forEach((item, index) => {
          if (item == this.currentIndex) {
            num = index;
          }
        });
      }
      this.$refs.ds.scroll.scrollTo(0, num == 0 ? 0 : -num * 800, 200);
    },
    dScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      if (position.y >= 0) {
        this.$refs.ds.scrollTo(0, 0, 100);
      }
      if (-position.y >= 0 && -position.y <= 150) {
        let opacity =
          -position.y >= 120 ? 0 : -position.y > 0 ? 12 / -position.y : 1;
        this.hideOpacity = { opacity };
      }
      if (-position.y > 0 && -position.y <= 200) {
        let opacity = -position.y >= 180 ? 1 : -position.y / 180;
        this.showOpacity = { opacity };
      }
    },
    // 返回顶部
    toTop() {
      this.$refs.scrollCom.scrollTo(0, 0, 300);
    },
    back() {
      this.$router.go(-1);
    },
    pushRouter(path) {
      this.$router.push(path);
    },
  },
  filters: {
    fMoney(msg) {
      return "$ " + parseFloat(msg).toFixed(2);
    },
  },
};
</script>
<style lang='less' scoped>
.dCircle {
  position: absolute;
  top: 1%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.746);
  color: rgb(235, 235, 235);
  padding: 8px;
  font-size: 16px;
  border-radius: 50px;
}
.topleft {
  left: 2%;
}
.topright {
  right: 2.6%;
}
.details-navbar {
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  .left i,
  .right i {
    font-size: 18px;
  }
}
.details-content {
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100vh - 50px);
  width: 100%;
  .contentBox {
    margin: 0;
    border-radius: 0;
    border-top: 1px solid rgb(241, 241, 241);
  }
  .gray {
    color: gray;
    font-size: 12px;
  }
}
</style>

<style lang="less">
.el-dropdown-menu {
  text-align: left;
}
.el-drawer {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.el-drawer__body {
  position: relative;
  h3 {
    text-align: center;
    line-height: 20px;
  }
  .right {
    position: absolute;
    right: 5%;
    top: 7%;
    font-size: 12px;
    padding: 0.3% 2% 0.5% 2%;
    background-color: rgba(177, 177, 177, 0.637);
    border-radius: 50%;
  }
}
.el-tabs__header {
  margin: 0;
}
.el-tabs__nav {
  width: 100%;
  .el-tabs__active-bar {
    left: 7.5%;
    bottom: 8px;
    color: black;
    background-image: linear-gradient(90deg, #f5503a, #fad1cb);
  }
  .is-active {
    color: #000;
    font-weight: bold;
  }
}
.el-tabs__nav-wrap::after {
  height: 0;
}
.dNameBox dl {
  dt {
    flex: 6 !important;
    text-align: left;
    font-size: 16px;
  }
  dd {
    flex: 2 !important;
    div {
      text-align: center;
      margin-right: 5px;
      float: left;
    }
    i {
      font-size: 22px;
    }
  }
}
.shBox dl dt {
  flex: 0 !important;
}
</style>
