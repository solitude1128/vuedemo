<template>
  <div id="details">
    <div v-if="!isFixed">
      <i @click="back" class="left topleft dCircle el-icon-arrow-left"></i>
      <el-dropdown class="right dCircle topright" trigger="click" @command="pushRouter">
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

    <nav-bar v-if="isFixed">
      <div slot="left">
        <i @click="back" class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <span>商品</span>
        <span>商品</span>
        <span>商品</span>
        <span>商品</span>
      </div>
      <div slot="right">
        <el-dropdown trigger="click" @command="pushRouter">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/home" icon="el-icon-s-home">首页</el-dropdown-item>
            <el-dropdown-item command="/category" divided icon="el-icon-s-home">分类搜索</el-dropdown-item>
            <el-dropdown-item command="/shopCar" divided icon="el-icon-s-home">购物车</el-dropdown-item>
            <el-dropdown-item command="/my" divided icon="el-icon-s-home">我的京东</el-dropdown-item>
            <el-dropdown-item command="/category" divided icon="el-icon-s-home">浏览记录</el-dropdown-item>
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
      <details-banner :cFea="detailsGoods.img_detalis_list"></details-banner>
      <dl class="dNameBox">
        <dt class="left">
          <strong>{{detailsGoods.name}}</strong>
        </dt>
        <dd class="right">
          <i class="el-icon-sugar"></i>
          <br />收藏
        </dd>
      </dl>
      <dl @click="drawer=true">
        <dt>优惠</dt>
        <dd>
          <div class>
            <span class="left activeBox">满19减10</span>
            <span class="right el-icon-more"></span>
          </div>
          <div>
            <span class="activeBox">跨店铺满折</span>
            <span>满2件，总价打8折；满3件，总价打7折</span>
          </div>
          <div>
            <span class="activeBox">限购</span>
            <span>购买不超过30件时享受单件价￥55，超出数量以结算价为准</span>
          </div>
          <div>
            <span class="activeBox">限购</span>
            <span>购买不超过30件时享受单件价￥55，超出数量以结算价为准</span>
          </div>
        </dd>
      </dl>
      <dl @click="drawer=true">
        <dt>已选</dt>
        <dd>
          <div class>
            <span class="left activeBox">满19减10</span>
            <span class="right el-icon-more"></span>
          </div>
          <div>
            <span class="activeBox">跨店铺满折</span>
            <span>满2件，总价打8折；满3件，总价打7折</span>
          </div>
          <div>
            <span class="activeBox">限购</span>
            <span>购买不超过30件时享受单件价￥55，超出数量以结算价为准</span>
          </div>
          <div>
            <span class="activeBox">限购</span>
            <span>购买不超过30件时享受单件价￥55，超出数量以结算价为准</span>
          </div>
        </dd>
      </dl>
      <el-drawer :visible.sync="drawer" direction="btt" :with-header="false" append-to-body>
        <h3>
          优惠
          <span class="right" @click="drawer=false">x</span>
        </h3>
      </el-drawer>
    </scroll>
  </div>
</template>

<script>
// 引入公共组件
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import detailsBanner from "./childCom/detailsBanner";

import { getSearchGoods } from "common/common";
import { getGoodsId } from "network/goods.js";
export default {
  name: "Details",
  created() {
    this.getDgoods(this.$route.params.did);
    this.$parent.isShowJT = false;
    this.$parent.isShowMT = false;
  },
  data() {
    return {
      detailsGoods: {},
      titleArr: [],
      isFixed: false,
      drawer: false,
      isShowBackTop: false,
    };
  },
  components: {
    navBar,
    Scroll,
    detailsBanner,
  },
  watch: {
    // 监听数据改变,做一些数据变化的事情
  },
  methods: {
    getDgoods(id) {
      getSearchGoods(getGoodsId, id, (res) => {
        this.detailsGoods = res.data.goodsData;
        console.log(this.detailsGoods);
      });
    },
    dScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      if (position.y >= 0) {
        this.$refs.ds.scrollTo(0, 0, 100);
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
.topleft {
  left: 1%;
}
.topright {
  right: 1%;
}
.dCircle {
  position: absolute;
  top: 1%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.746);
  color: rgb(235, 235, 235);
  padding: 8px;
  font-size: 16px;
  border-radius: 50px;
}
.details-content {
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100vh - 50px);
  width: 100%;
  dl {
    display: flex;
    padding: 15px;
    background-color: #fff;
    color: black;
    border-radius: 10px;
    dt {
      flex: 1;
    }
    dd {
      flex: 10;
      font-size: 12px;
      margin-left: 15px;
      overflow: hidden;
      text-align: left;
      div {
        height: 30px;
        padding-top: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .activeBox {
          border: 1px solid red;
          color: red;
          padding: 0 1%;
          margin-right: 1%;
        }
      }
    }
  }
  .dNameBox {
    .left {
      flex: 6;
      text-align: left;
      font-size: 16px;
    }
    .right {
      text-align: center;
      flex: 1;
      i {
        font-size: 22px;
      }
    }
  }
}
</style>

<style lang="less">
.el-drawer {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.el-drawer__wrapper {
  z-index: 9999;
  .el-dropdown-menu {
    text-align: left;
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
}
</style>
