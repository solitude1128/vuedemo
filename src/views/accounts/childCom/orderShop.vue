<template>
  <div>
    <div v-for="(item,key) in shop" :key="key" class="orderShop">
      <div class="header">{{key}}</div>
      <div class="contentBox" v-for="(i,index) in item" :key="index">
        <div class="imgBox">
          <img :src="path+'/goods/'+i.img_cover" width="80%" />
        </div>
        <div class="shopBox">
          <p>
            <strong>{{i.goods_name}}</strong>
          </p>
          <p>
            <span>{{i.norm}}</span>
          </p>
          <p>
            <strong style="font-size:16px;color:red">{{i.money_now | fMoney}}</strong>
            <span style="float:right">x{{i.num}}</span>
          </p>
          <p>
            <span>
              <i class="el-icon-truck"></i>
              支持七天无理由退货
            </span>
            <span>
              <i class="el-icon-warning-outline"></i>价格说明
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="otherBox">
      <div class="leftBox">
        <p>
          <span>配送</span>
          <span class="right">快递运输</span>
        </p>
        <p class="gray">
          <span>中小件送货</span>
          <span class="right">工作日、双休日与节假日均可送货</span>
        </p>
      </div>
      <div class="rightBox">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="one">
      <div class="leftBox">
        <p>
          <span>退换无忧</span>
          <span class="gray">
            退换货预计可获得
            <span class="red">9.80元</span>
            运费赔付
            <i class="el-icon-warning-outline"></i>
          </span>
          <span class="right red">{{yunfeiixian | fMoney}}</span>
        </p>
      </div>
      <div class="rightBox">
        <el-checkbox @change="ispf" v-model="checked"></el-checkbox>
      </div>
    </div>
    <div class="orderShop">
      <div class="one">
        <div class="leftBox">
          <p>
            <span>发票信息</span>
            <span class="right">个人 商品明细</span>
          </p>
        </div>
        <div class="rightBox">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="one">
        <div class="leftBox">
          <p>
            <span>礼品卡</span>
            <span class="right gray">无可用</span>
          </p>
        </div>
        <div class="rightBox">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="one">
        <div class="leftBox">
          <p>
            <span>
              红包
              <i class="el-icon-warning-outline"></i>
            </span>
            <span class="right gray">无可用</span>
          </p>
        </div>
        <div class="rightBox">
          <i class="el-icon-discover"></i>
        </div>
      </div>
      <div class="one">
        <div class="leftBox">
          <p>
            <span>
              京豆
              <i class="el-icon-warning-outline"></i>
            </span>
            <span class="right gray">共12个，未满1000个，暂不可使用</span>
          </p>
        </div>
      </div>
    </div>
    <div class="orderShop">
      <p>
        <span>商品金额</span>
        <span class="right red">{{sMoney |fMoney}}</span>
      </p>
      <p>
        <span>
          运费
          <span class="gray">
            （总重：0.170kg）
            <i class="el-icon-warning-outline"></i>
          </span>
        </span>
        <span class="right red">{{yunfei|fMoney}}</span>
      </p>
      <p style="text-align:right">
        <strong>实付金额 :</strong>
        <span class="red">{{allMoney | fMoney}}</span>
      </p>
      <el-button type="primary" round @click="toPayment">在线支付</el-button>
      <p style="text-align:center" class="gray">--- 此订单不支持以下支付方式 ---</p>
      <div class="otherBox">
        <i style="font-size:30px;color:rgb(86, 204, 240);" class="el-icon-s-goods"></i>
        <div class="leftBox">
          <p>货到付款</p>
          <p class="gray">部分商品不支持货到付款，立即查看</p>
        </div>
        <div class="rightBox">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderShop",
  props: {
    shop: null,
    sMoney: Number,
  },
  created() {
    this.checked
      ? (this.allMoney += this.yunfeiixian + this.yunfei + this.sMoney)
      : (this.allMoney += this.yunfei + this.sMoney);
  },
  data() {
    return {
      checked: false,
      yunfeiixian: 0.8,
      allMoney: 0,
      yunfei: 8,
    };
  },
  components: {},
  methods: {
    toPayment() {
      this.$emit("cpayment", this.allMoney);
    },
    ispf(val) {
      console.log(val);
      this.allMoney = val
        ? this.allMoney + this.yunfeiixian
        : this.allMoney - this.yunfeiixian;
    },
  },
  computed: {
    path() {
      return this.$store.state.path;
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
.orderShop {
  margin-top: 20px;
  padding: 0 10px;
  background-color: #fff;
  border-radius: 10px;
  > div:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  > p {
    text-align: left;
    line-height: 40px;
    margin: 0;
  }
  .el-button {
    width: 100%;
    margin: 10px 0;
  }
  .gray {
    color: rgb(148, 147, 147);
    font-size: 12px;
  }
  .red {
    color: red;
    font-size: 12px;
  }
  .header {
    padding-left: 15px;
    text-align: left;
    line-height: 40px;
    font-size: 16px;
  }
  .contentBox {
    display: flex;
    padding-top: 20px !important;
    .imgBox {
      flex: 2;
      img {
        border-radius: 10px;
      }
    }
    .shopBox {
      text-align: left;
      flex: 6;
      p {
        margin: 8px 10px;
        height: auto;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        strong {
          color: #333;
        }
        span {
          color: rgb(148, 147, 147);
          font-size: 12px;
          i {
            color: rgb(93, 158, 184);
            font-size: 16px;
          }
        }
      }
    }
  }
  .otherBox,
  .one {
    display: flex;
    p {
      margin: 0;
    }
    .leftBox {
      flex: 15;
      text-align: left;
    }
    .rightBox {
      line-height: 50px;
      flex: 1;
    }
  }
  .one {
    line-height: 50px;
    padding: 0 10px;
  }
}
.otherBox,
.one {
  display: flex;
  background-color: #fff;
  > div:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  p {
    margin: 10px;
  }
  .gray {
    color: rgb(148, 147, 147);
    font-size: 12px;
  }
  .red {
    color: red;
    font-size: 12px;
  }
  .leftBox {
    flex: 15;
    text-align: left;
  }
  .rightBox {
    line-height: 50px;
    flex: 1;
  }
}
.one {
  line-height: 50px;
  padding: 0 10px;
  p {
    margin: 0;
  }
}
</style>
