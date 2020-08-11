<template>
  <div ref="shop_cart_details">
    <dd v-for="(j,index) in cartdata" :key="index">
      <div class="inputBox">
        <el-checkbox-group v-model="goodsIdArr" @change="shopCheck(goodsIdArr,index)">
          <el-checkbox :label="j.goods_id"></el-checkbox>
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
                <input type="text" v-model="j.num" @click.stop @change="changeNum(index,'replace')" />
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
  </div>
</template>

<script>
export default {
  name: "cartData",
  created() {
    for (let i in this.cartdata) {
      if (this.cartdata[i].ischeck == 1) {
        this.goodsIdArr.push(this.cartdata[i].goods_id);
      }
    }
  },
  props: {
    shopName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      goodsIdArr: [],
    };
  },
  methods: {
    // 商品单选
    shopCheck(val, index) {
      let e = e || event;
      let temp = e.target.nextSibling.checked ? 1 : -1;
      this.$store.state.totalPayment +=
        this.cartdata[index].money_now * this.cartdata[index].num * temp;
      this.$store.state.totalNum += this.cartdata[index].num * temp;
      this.cartdata[index].ischeck = Number(
        e.target.nextSibling.checked
      ).toString();
      console.log(this.cartdata);
      // 如果选中的商品等于此对象下原有的长度
      if (val.length == this.cartdata.length) {
        // 则让此商铺选中
        this.$parent.$parent.checkShops.push(this.shopName);
      } else {
        // 否则不等于就查商铺的数组里是否包含此商铺
        let a = this.$parent.$parent.checkShops.indexOf(this.shopName);
        // 如果包含则在数组里删除此商铺
        if (a != -1) {
          this.$parent.$parent.checkShops.splice(a, 1);
        }
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
    //点击规格触发的事件
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
dd {
  border-bottom: 1px solid rgb(236, 236, 236);
  display: flex;
  padding: 15px;
  font-size: 12px;
  margin: 0;
  .inputBox {
    flex: 1;
    height: auto;
    line-height: 130px;
    label {
      width: 23px;
      overflow: hidden;
    }
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
</style>
