<template>
  <div id="payment">
    <nav-bar>
      <div slot="left" @click="open('您的订单在23小时59分钟内未支付将被取消,请尽快完成支付。','确认要离开收银台?', 'back')">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">京东收银台</div>
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
    <h2>{{allMoney|fMoney}}</h2>
    <scroll class="payment-content" :probeType="3" :pull-up-load="true">
      <div class="jdzf box">
        <i>
          <span class="icon"></span>
        </i>
        <div>
          <b>小易支付</b>
        </div>
        <div class="rightBox"></div>
      </div>
      <div class="dbt box">
        <i>
          <span class="icon"></span>
        </i>
        <div>
          <strong>打白条</strong>
          <p class="gray">一键激活并支付，可享立减优惠</p>
        </div>
        <div class="rightBox">
          <span class="lj">立减25元</span>
          <el-radio v-model="radio" label="dbt"></el-radio>
        </div>
      </div>
      <div class="newCard box">
        <i>
          <span class="icon"></span>
        </i>
        <div>
          <b>使用新卡支付</b>
        </div>
        <div class="rightBox">
          <span class="lj">立减3元</span>
          <el-radio v-model="radio" label="newCard"></el-radio>
        </div>
      </div>
      <div class="zs box">
        <i>
          <span class="icon"></span>
        </i>
        <div>
          <b>首次添加银联卡</b>
        </div>
        <div class="rightBox">
          <span class="lj">立减5元</span>
          <el-radio v-model="radio" label="zs"></el-radio>
        </div>
      </div>
      <div class="box" @click="drawer=true">
        <i></i>
        <div>
          <b>全部付款方式</b>
        </div>
        <div class="rightBox">
          <span>查看</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="wx box">
        <i>
          <span class="icon"></span>
        </i>
        <div>
          <strong>微信支付</strong>
          <p class="gray">仅安装微信6.0.2 及以上版本客户端使用</p>
        </div>
        <div class="rightBox">
          <el-radio v-model="radio" label="wx"></el-radio>
        </div>
      </div>
      <el-drawer title="付款方式" :visible.sync="drawer" direction="btt" append-to-body>
        <div class="dbt box">
          <i>
            <span class="icon"></span>
          </i>
          <div>
            <strong>打白条</strong>
            <p class="gray">一键激活并支付，可享立减优惠</p>
          </div>
          <div class="rightBox">
            <span class="lj">立减25元</span>
            <el-radio v-model="radio" label="dbt"></el-radio>
          </div>
        </div>
        <div class="newCard box">
          <i>
            <span class="icon"></span>
          </i>
          <div>
            <b>使用新卡支付</b>
          </div>
          <div class="rightBox">
            <span class="lj">立减3元</span>
            <el-radio v-model="radio" label="newCard"></el-radio>
          </div>
        </div>
        <div class="zs box">
          <i>
            <span class="icon"></span>
          </i>
          <div>
            <b>首次添加招商银行借记卡</b>
          </div>
          <div class="rightBox">
            <span class="lj">立减5元</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="bj box">
          <i>
            <span class="icon"></span>
          </i>
          <div>
            <b>首次添加北京银行借记卡</b>
          </div>
          <div class="rightBox">
            <span class="lj">立减10元</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </el-drawer>
    </scroll>
    <div class="tabbar" @click="open('您确定要点击确定嘛?请您再确定确定!','提示','go')">
      <el-button v-if="radio=='dbt'">开通白条并支付{{allMoney-25 | fMoney}}</el-button>
      <el-button v-else-if="radio=='newCard'">使用新卡支付{{allMoney-3 | fMoney}}</el-button>
      <el-button v-else-if="radio=='zs'">使用银联卡支付{{allMoney-5 | fMoney}}</el-button>
      <el-button v-else>微信支付{{allMoney | fMoney}}</el-button>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import { updateOrderState } from "network";
import { haveData } from "common/common";
export default {
  name: "payment",
  created() {
    let obj = {
      order_id: this.orderId,
      state: 1,
    };
    haveData(updateOrderState, obj, (res) => {
      console.log(res);
    });
  },
  data() {
    return {
      radio: "dbt",
      drawer: false,
    };
  },
  components: {
    navBar,
    Scroll,
  },
  methods: {
    pushRouter(path) {
      this.jumpPage(path);
    },
    open(a, b, c) {
      this.$confirm(a, b, {
        confirmButtonText: "确认离开",
        cancelButtonText: "继续支付",
        center: true,
      })
        .then(() => {
          if (c == "back") {
            this.jumpPage("/shopcart");
          } else {
            let obj = {
              order_id: this.orderId,
              state: 2,
            };
            haveData(updateOrderState, obj, (res) => {
              console.log(res);
              if (res.code != 200) return;
              this.jumpPage("/pok");
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "穷的叮当响",
          });
        });
    },
  },
  computed: {
    orderId() {
      return this.$route.params.orderId;
    },
    allMoney() {
      return this.$route.params.allMoney;
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
.box {
  display: flex;
  text-align: left;
  border-radius: 20px 20px 0 0;
  padding: 15px;
  i {
    flex: 1;
    .icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("https://cdnpay.360buyimg.com/image/pay/home-pay-icon-39d557c44d7afdb354da160af4ed0ff1.png")
        no-repeat;
      background-size: 100%;
    }
  }
  div {
    flex: 6;
    b {
      line-height: 33px;
    }
    p {
      margin: 5px 0;
      color: rgb(134, 134, 134);
      font-size: 12px;
    }
  }
  .rightBox {
    flex: 3;
    text-align: right;
    line-height: 36px;
    font-size: 12px;
    span {
      margin-right: 10px;
    }
    .lj {
      color: red;
      border: 1px solid red;
      padding: 0 3px;
    }
    .el-radio {
      width: 20px;
      overflow: hidden;
    }
  }
}
.box:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.jdzf {
  background: linear-gradient(90deg, #fef5f4 0, #fef0ef 100%);
  font-size: 16px;
  color: rgb(233, 18, 18);
  i .icon {
    background-position: 0 -60px;
  }
}
.dbt i .icon {
  background-position: 0 -30px;
}
.newCard i .icon {
  background-position: 0 -90px;
}
.wx i .icon {
  background-position: 0 -120px;
}
#payment {
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  position: relative;
  letter-spacing: 0.6px;
  h2 {
    position: fixed;
    width: 100%;
    top: 50px;
    text-align: center;
    color: red;
  }
  .payment-content {
    width: 100%;
    position: absolute;
    top: 110px;
    bottom: 100px;
    left: 0;
  }
  .tabbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    .el-button {
      width: 90%;
      background: linear-gradient(
        135deg,
        #fa200c 0,
        #fa360c 45%,
        #fa510c 83%,
        #fa5c0c 100%
      );
      text-align: center;
      color: white;
      border-radius: 30px;
    }
  }
}
</style>
<style lang="less">
.el-drawer {
  border-radius: 30px 30px 0 0;
  height: 66% !important;
  :focus {
    outline: 0;
  }
  .el-drawer__header {
    font-weight: bold;
    text-align: left;
    color: black;
    font-size: 18px;
  }
}
.el-message-box {
  width: 90%;
  border-radius: 20px;
  padding-bottom: 0;
  .el-message-box__btns {
    padding: 0;
    margin-top: 15px;
    .el-button {
      margin: 0;
      width: 50%;
      line-height: 26px;
      border: none;
      border-top: 1px solid rgb(194, 194, 194);
    }
    .el-button--primary {
      background-color: #f15353;
    }
  }
}
</style>
