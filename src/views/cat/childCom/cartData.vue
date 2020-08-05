<template>
  <div>
    <dl class="showDataBox" v-if="cartdata.length > 0">
      <dt>
        <div class="inputBox">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
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
      <cart-data-item
        v-for="(j,index) in cartdata"
        :key="index"
        :itemData="j"
        :checkedItem="checkedCities"
      ></cart-data-item>
      <!-- <dd v-for="(j,index) in cartdata" :key="index">
        <div class="inputBox">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox :key="j.goods_id"></el-checkbox>
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
                  <span v-if="j.num>0" class="minus" @click="changeNum(j.num,'minus')">-</span>
                  <input type="text" v-model="j.num" />
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
      </dd>-->
    </dl>
  </div>
</template>

<script>
import cartDataItem from "./cartDataItem";
export default {
  name: "cartData",
  created() {},
  props: {
    cartdata: null,
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
  components: { cartDataItem },
  methods: {
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedCities = val ? this.cartdata : [];
    },
    changeNum(num, type) {
      if (type == "minus") {
        num--;
      } else if (type == "add") {
        num++;
      }
      console.log(num);
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
</style>
