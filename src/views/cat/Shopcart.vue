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
              <el-dropdown-item command="/shopCar" divided icon="el-icon-shopping-cart-2">购物车</el-dropdown-item>
              <el-dropdown-item command="/my" divided icon="el-icon-user">我的京东</el-dropdown-item>
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
        <p class="address">
          <i class="el-icon-location-information"></i>
          朝阳区三环到四环之间
          <span class="right">编译商品</span>
        </p>
        <dl v-for="(i,key) in $store.state.shopCart" :key="key">
          <dt v-if="i.length > 0">
            <div class="inputBox">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              ></el-checkbox>
            </div>
            <div class="leftR">
              <span>
                <i class="el-icon-s-shop"></i>
                <span>&nbsp;{{key}}</span>
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
          <dd v-for="(j,index) in i" :key="index">
            <div class="inputBox">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="box">
              <p>
                <span class="left">
                  <span class="mj">满减</span>
                  <span>已满269元,已减26元</span>
                </span>
                <span class="right">
                  查看活动
                  <i class="el-icon-arrow-right"></i>
                </span>
              </p>
              <div class="contentBox">
                <img :src="$store.state.path+'/goods/'+j.img_cover" alt />
                <div>
                  <p class="name">{{j.goods_name}}</p>
                  <p class="gg">
                    <span>
                      {{j.norm}}
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </p>
                  <p class="gg">
                    <span>
                      {{j.norm}}
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </p>
                  <p class="num">
                    <span class="money">{{j.money_now | fMoney}}</span>
                    <span class="rightBox">
                      <span v-if="num>0" class="minus" @click="changeNum(j.num,'minus')">-</span>
                      <input type="text" v-model="num" />
                      <span class="add" @click="changeNum(j.num,'add')">+</span>
                    </span>
                  </p>
                </div>
              </div>
              <p class="gn">
                <span>移入关注</span>
                |
                <span>删除</span>
              </p>
            </div>
          </dd>
        </dl>
      </div>
    </scroll>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
export default {
  name: "Shopcart",
  created() {
    // 如果用户存在,则网络请求shopCart数据
    if (this.$store.state.userInfo) {
      this.getShopCart();
      this.getAddress();
    } else {
      // this.jumpPage("/login");
    }
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      num: 0,
    };
  },
  components: {
    navBar,
    Scroll,
  },
  methods: {
    getAddress() {
      console.log(this.$store.state.address);
    },
    pushRouter(path) {
      this.jumpPage(path);
    },
    getShopCart() {
      this.$store.dispatch("getShopCart", this.$store.state);
    },
    handleCheckAllChange(val) {
      console.log(val);
      // this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;
    },
    shopCartScroll(position) {
      if (position.y >= 0) {
        this.$refs.shopScroll.scrollTo(0, 0, 100);
      }
    },
    changeNum(num, type) {
      if (type == "minus") {
        this.num--;
      } else if (type == "add") {
        this.num++;
      }
      console.log(this.num);
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
  bottom: 50px;
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
      font-size: 12px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    dl {
      background-color: #fff;
      border-radius: 5px;
      dt,
      dd {
        display: flex;
        padding: 15px;
        font-size: 12px;
        margin: 0;
        .inputBox {
          flex: 1;
          height: auto;
        }
      }
      dt {
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
      dd {
        border-bottom: 1px solid rgb(236, 236, 236);
        .inputBox {
          line-height: 130px;
        }
        .box {
          flex: 8;
          p {
            margin: 0;
            height: 30px;
          }
          .gn {
            text-align: right;
            line-height: 40px;
            color: black;
          }
          .mj {
            background-color: red;
            color: white;
            padding: 0 3px;
            margin-right: 3px;
          }
          .contentBox {
            display: flex;
            img {
              width: 35%;
              border-radius: 10px;
              flex: 1;
            }
            div {
              flex: 8;
              text-align: left;
              p {
                margin: 10px 5px;
                height: auto;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .gg span {
                padding: 0 5px;
                background-color: rgb(230, 230, 230);
                border-radius: 10px;
              }
              .num {
                display: flex;
                margin-bottom: 0;
                .money {
                  flex: 2;
                  color: red;
                  font-size: 16px;
                  font-weight: bold;
                }
                .rightBox {
                  flex: 1;
                  color: rgb(59, 59, 59);
                  font-weight: bold;
                  span {
                    padding: 0 3px;
                  }
                  input {
                    width: 42%;
                    text-align: center;
                    background-color: rgb(231, 231, 231);
                    border: none;
                    outline: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.el-dropdown-menu {
  text-align: left;
}
</style>
