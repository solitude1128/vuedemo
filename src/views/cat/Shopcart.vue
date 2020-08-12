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
        <div v-for="(item,index) in shopNameArr" :key="index">
          <dl>
            <dt>
              <div class="inputBox">
                <el-checkbox-group v-model="checkShops" @change="shopAllCheck(index)">
                  <el-checkbox :label="item" :key="item"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="leftR">
                <span>
                  <i class="el-icon-s-shop"></i>
                  <span>&nbsp;{{item}}</span>
                </span>
              </div>
              <div class="rightR">
                <span>
                  <i class="el-icon-warning-outline"></i>
                  需支付运费
                </span>
                |
                <span class="yhq">优惠券</span>
              </div>
            </dt>
            <cart-data ref="cart_data" :shopName="item"></cart-data>
          </dl>
        </div>
      </div>
    </scroll>
    <!-- 去结算底部导航 -->
    <div class="tabbar">
      <div class="inputBox">
        <el-checkbox v-model="allCheck" @change="CheckAllChange">全选</el-checkbox>
      </div>
      <div class="money">
        总计:
        <span style="font-weight:bold;">{{totalPayment|fMoney}}</span>
      </div>
      <div class="button">
        <el-button type="danger" round :disabled="totalNum==0" @click="accounts">
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
    console.log(this.shopNameArr);
  },
  data() {
    return {
      allCheck: false,
      checkShops: [],
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
    // 店铺全选操作
    shopAllCheck(index) {
      console.log(this.checkShops);
      let a = this.checkShops.indexOf(this.shopNameArr[index]);
      let arr = this.shopCart[this.shopNameArr[index]];
      arr.forEach((item) => {
        if (a != -1) {
          if (
            this.$refs.cart_data[index].goodsIdArr.indexOf(item.goods_id) == -1
          ) {
            this.$refs.cart_data[index].goodsIdArr.push(item.goods_id);
            item.ischeck = 1;
            this.$store.state.totalPayment += item.money_now * item.num * 1;
            this.$store.state.totalNum += item.num * 1;
          }
        } else {
          this.$refs.cart_data[index].goodsIdArr = [];
          item.ischeck = 0;
          this.$store.state.totalPayment += item.money_now * item.num * -1;
          this.$store.state.totalNum += item.num * -1;
        }
      });
      // 当前checkShops的长度是否等于所有店铺的长度
      this.allCheck = this.checkShops.length === this.shopNameArr.length;
    },
    // 全选店铺操作
    CheckAllChange(val) {
      this.checkShops = val ? this.shopNameArr : [];
      this.$refs.cart_data.forEach((item) => {
        let label = item.$el.querySelectorAll(".el-checkbox");
        if (val) {
          label.forEach((text) => {
            if (item.goodsIdArr.indexOf(text.innerText) == -1) {
              item.goodsIdArr.push(text.innerText);
            }
          });
        } else {
          item.goodsIdArr = [];
        }
      });
      this.$store.state.totalPayment = val
        ? this.$store.state.shopCarMoneyAll
        : 0;
      this.$store.state.totalNum = val ? this.$store.state.shopCarNumAll : 0;
    },
    // 去结算 操作
    accounts() {
      if (this.userInfo) {
        let arr = [];
        for (let i in this.shopCart) {
          for (let j in this.shopCart[i]) {
            if (this.shopCart[i][j].ischeck == "1") {
              arr.push(this.shopCart[i][j]);
            }
          }
        }
        this.jumpPage("/accounts/" + JSON.stringify(arr));
      } else {
        this.jumpPage("/login");
      }
    },
    //
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
    shopNameArr() {
      return this.$store.state.shopNameArr;
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
    dl {
      background-color: #fff;
      border-radius: 5px;
      dt {
        display: flex;
        padding: 15px;
        font-size: 12px;
        margin: 0;
        .inputBox {
          flex: 1;
          height: auto;
          label {
            width: 23px;
            overflow: hidden;
          }
        }
      }
      dt {
        .inputBox {
          flex: 1;
          height: auto;
        }
        .leftR {
          flex: 4;
          text-align: left;
          font-weight: bold;
          i {
            font-size: 14px;
          }
        }
        .rightR {
          text-align: right;
          flex: 4;
          .yhq {
            background-color: rgb(253, 213, 213);
            color: red;
            border-radius: 20px;
            padding: 2px 5px;
          }
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
    .is-disabled {
      background-color: #fab6b6;
    }
  }
}
.el-dropdown-menu {
  text-align: left;
}
</style>
