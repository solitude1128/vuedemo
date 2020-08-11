<template>
  <div id="shopcart">
    <scroll
      class="shopCart-content"
      :probeType="3"
      @parentScroll="shopCartScroll"
      :pull-up-load="true"
      ref="shopScroll"
    >
      <!-- 导航 -->
      <nav-bar class="sC-nav-bar">
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">购物车</div>
        <div slot="right">
          <el-dropdown trigger="click" @command="pushRouter">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home" icon="el-icon-s-home">首页</el-dropdown-item>
              <el-dropdown-item command="/category" divided icon="el-icon-menu">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/shopcart" divided icon="el-icon-shopping-cart-2">购物车</el-dropdown-item>
              <el-dropdown-item command="/profile" divided icon="el-icon-user">我的京东</el-dropdown-item>
              <el-dropdown-item command="/category" divided icon="el-icon-s-order">浏览记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>
      <!-- 空购物车 -->
      <div class="scNull" v-if="!$store.state.shopCartLen">
        <el-image
          style="width: 100px; height: 100px"
          :src="$store.state.path+'/routine/cart_empty.png'"
          fit="contain"
        ></el-image>
        <p>购物车空空如也，去逛逛吧~</p>
      </div>
      <!-- 有数据的购物车 -->
      <div v-else class="showDataBox">
        <div class="address">
          <i class="el-icon-location-information"></i>
          {{$store.state.address}}
          <span class="right">编译商品</span>
          <p v-if="!userInfo">
            登录后可同步账户购物车中的商品
            <el-button @click="jumpPage('/login')" type="danger" round>登录</el-button>
          </p>
        </div>
        
        <cart-data
          v-for="(i,key) in shopCart"
          :key="key"
          :shopName="key"
          ref="cart_data"
          @checknorm="selectNorm"
          @ischeckshopall="is_check_shop_all"
        ></cart-data>
      </div>
    </scroll>
    <!-- 去结算底部导航 -->
    <div class="tabbar">
      <div class="inputBox">
        <el-checkbox v-model="allCheck" @change="isAllCheck">全选</el-checkbox>
      </div>
      <div class="money">
        总计:
        <span style="font-weight:bold;">{{totalPayment|fMoney}}</span>
      </div>
      <div class="button">
        <el-button type="danger" round>
          去结算
          <span>({{totalNum}}件)</span>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import cartData from "./childCom/cartData";
export default {
  name: "Shopcart",
  created() {
    this.getShopCart();
  },
  data() {
    return {
      allCheck: false,
    };
  },
  components: {
    navBar,
    Scroll,
    cartData,
  },
  methods: {
    pushRouter(path) {
      this.jumpPage(path);
    },
    getShopCart() {
      this.$store.dispatch("getShopCart", this.$store.state);
    },
    shopCartScroll(position) {
      if (position.y >= 0) {
        this.$refs.shopScroll.scrollTo(0, 0, 100);
      }
    },
    // 全选的按钮是否被选中
    is_check_shop_all() {
      let car_data = this.$refs.cart_data;
      let temp = 0;
      car_data.forEach((i) => {
        console.log(i.checkAll);
        if (i.checkAll) {
          temp++;
        }
      });
      if (temp == car_data.length) {
        this.allCheck = true;
      }
    },
    // 是否全选所有商铺的商品
    isAllCheck(val) {
      this.allCheck = val;
      let e = e || event;
      let car_data = this.$refs.cart_data;
      this.$store.state.totalPayment = val
        ? this.$store.state.shopCarMoneyAll
        : 0;
      this.$store.state.totalNum = val ? this.$store.state.shopCarNumAll : 0;
      car_data.forEach((i) => {
        i.checkAll = val ? true : false;
        // this.shopCart[i.shopName].forEach((j) => {
        //   j.ischeck = Number(e.target.checked).toString();
        // });
      });
      console.log(this.shopCart);
    },
    // 点击规格发生的事件
    selectNorm(obj) {
      console.log(obj);
    },
  },
  computed: {
    shopCart() {
      return this.$store.state.shopCart;
    },
    totalPayment() {
      return this.$store.state.totalPayment;
    },
    totalNum() {
      return this.$store.state.totalNum;
    },
    userInfo() {
      return this.$store.state.userInfo
        ? this.$store.state.userInfo[0]
        : this.$store.state.userInfo;
    },
  },
  filters: {
    fMoney(msg) {
      return "$ " + parseFloat(msg).toFixed(2);
    },
  },
};
</script>

<style lang="less" scoped>
.shopCart-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 110px;
  width: 100%;
  .sC-nav-bar {
    position: relative;
    background-color: #fff;
  }
  .scNull {
    padding-top: 60px;
  }
  .showDataBox {
    .address {
      background-color: #fff;
      margin: 0;
      line-height: 50px;
      text-align: left;
      padding: 0 15px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      p {
        text-align: center;
        margin: 0;
        .el-button {
          padding: 8px 16px;
        }
      }
    }
  }
}
.tabbar {
  width: 100%;
  border-top: 1px solid rgb(233, 233, 233);
  line-height: 50px;
  background-color: #fff;
  position: fixed;
  bottom: 60px;
  display: flex;
  .inputBox {
    flex: 2;
    height: auto;
  }
  .money {
    flex: 3;
    font-size: 16px;
    color: black;
  }
  .button {
    flex: 3;
    .el-button {
      padding: 12px 30px;
      background-color: red;
    }
  }
}
.el-dropdown-menu {
  text-align: left;
}
</style>
