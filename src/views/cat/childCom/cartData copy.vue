<template>
  <div ref="shop_cart_details">
    <dl class="showDataBox" v-if="cartdata.length > 0">
      <dt>
        <div class="inputBox">
          <el-checkbox v-model="checkAll" @change="shopCheckAll"></el-checkbox>
        </div>
        <div class="leftR">
          <span>
            <i class="el-icon-s-shop"></i>
            <span>&nbsp;{{shopName}}</span>
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
      <dd v-for="(j,index) in cartdata" :key="index">
        <div class="inputBox">
          <el-checkbox-group v-model="checkedCities" @change="shopCheck">
            <el-checkbox :label="j"></el-checkbox>
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
          <div class="contentBox" @click="jumpPage('/details/'+j.goods_id)">
            <img :src="$store.state.path+'/goods/'+j.img_cover" alt />
            <div>
              <p class="name">{{j.goods_name}}</p>
              <p class="gg" @click.stop="checkNorm(j)">
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
                  <span v-if="j.num>0" class="minus" @click.stop="changeNum(index,'minus')">-</span>
                  <input
                    type="text"
                    v-model="j.num"
                    @click.stop
                    @change="changeNum(index,'replace')"
                  />
                  <span class="add" @click.stop="changeNum(index,'add')">+</span>
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
</template>

<script>
export default {
  name: "cartData",
  created() {},
  props: {
    // 接收传递过来的购物车中的店铺名
    shopName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
    };
  },
  methods: {
    // 商品全选
    shopCheckAll(val) {
      console.log(this.cartdata);
      console.log(val);
      this.checkedCities = val ? this.cartdata : [];
      // let e = e || event;
      // let btnAll = this.$refs.shop_cart_details.querySelectorAll(
      //   "dd .inputBox input"
      // );
      // console.log(btnAll);
      // let temp = -1;
      // if (e.target.checked) {
      //   temp = 1;
      // }
      // for (let i = 0; i < btnAll.length; i++) {
      //   // 如果当前商品复选框的checked为true并且店铺复选框也为true,则跳过当前循环,执行下一次循环
      //   // 因为如果当前商品是选中的状态,那么支付总价是不需要增加价钱的,所以直接跳过当前循环的后续代码执行
      //   if (btnAll[i].checked && e.target.checked) {
      //     continue;
      //   }
      //   this.$store.state.totalPayment +=
      //     this.cartdata[i].money_now * this.cartdata[i].num * temp;
      //   this.$store.state.totalNum += this.cartdata[i].num * temp;
      //   btnAll[i].checked = e.target.checked;
      //   this.cartdata[i].ischeck = Number(e.target.checked).toString();
      //   console.log(btnAll[i]);
      //   console.log(btnAll[i].checked);
      // }
      // this.$emit("ischeckshopall");
      // console.log(e.target.checked);
      // console.log(this.cartdata);
    },
    // 商品单选
    shopCheck(value) {
      console.log(value);
      this.checkedCities = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cartdata.length;
      // let e = e || event;
      // console.log(e.target.label);
      // e.target.value = e.target.checked ? 1 : 0;
      // let temp = e.target.checked ? 1 : -1;
      // this.$store.state.totalPayment +=
      //   this.cartdata[index].money_now * this.cartdata[index].num * temp;
      // this.$store.state.totalNum += this.cartdata[index].num * temp;
      // this.cartdata[index].ischeck = Number(e.target.checked).toString();
      this.isCheckAll();
    },
    // 是否全选此商铺下的商品
    isCheckAll() {
      let btnAll = this.$refs.shop_cart_details.querySelectorAll(
        "dd .inputBox input"
      );
      let temp = 0;
      btnAll.forEach((obj) => {
        if (obj.checked == true) {
          temp++;
        }
      });
      if (temp == btnAll.length) {
        this.checkAll = true;
        this.checkedCities = this.cartdata;
        this.$emit("ischeckshopall");
      } else {
        this.checkAll = false;
      }
    },
    // 改变购买商品的数量
    changeNum(index, type) {
      let e = e || event;
      if (type == "minus") {
        this.cartdata[index].num -= 1;
        // 获取下一个兄弟元素,改变值
        e.target.nextSibling.value = e.target.nextSibling.value * 1 - 1;
        this.$store.state.totalNum -= 1 * 1;
        this.$store.state.totalPayment -= this.cartdata[index].money_now * 1;
      }
      if (type == "add") {
        this.cartdata[index].num += 1;
        // 获取上一个兄弟元素,改变值
        e.target.previousSibling.value = e.target.previousSibling.value * 1 + 1;
        this.$store.state.totalNum += 1 * 1;
        this.$store.state.totalPayment += this.cartdata[index].money_now * 1;
      }
      if (type == "replace") {
        console.log(this.$store.state.shopCart);
        let num = 0,
          money = 0;
        for (let i in this.$store.state.shopCart) {
          for (let j in this.$store.state.shopCart[i]) {
            if (this.$store.state.shopCart[i][j].ischeck == 1) {
              num += this.$store.state.shopCart[i][j].num * 1;
              money +=
                this.$store.state.shopCart[i][j].money_now *
                this.$store.state.shopCart[i][j].num *
                1;
            }
          }
        }
        console.log(num);
        console.log(money);
        this.$store.state.totalNum = num;
        this.$store.state.totalPayment = money;
      }
    },
    checkNorm(obj) {
      this.$emit("checknorm", obj);
    },
  },
  computed: {
    // 当前页面需要用到的商品,通过传递过来的店铺名 从shopCart中获取
    cartdata() {
      return this.$store.state.shopCart[this.shopName];
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
          flex: 4;
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
</style>
