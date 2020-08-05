<template>
  <dd>
    <div class="inputBox">
      <el-checkbox-group v-model="checkedItem" @change="handleCheckedCitiesChange">
        <el-checkbox :key="itemData.goods_id"></el-checkbox>
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
        <img :src="$store.state.path+'/goods/'+itemData.img_cover" alt />
        <div>
          <p class="name">{{itemData.goods_name}}</p>
          <p class="gg">
            <span>
              {{itemData.norm}}
              <i class="el-icon-arrow-down"></i>
            </span>
          </p>
          <p class="gg">
            <span>
              {{itemData.norm}}
              <i class="el-icon-arrow-down"></i>
            </span>
          </p>
          <p class="num">
            <span class="money">{{itemData.money_now | fMoney}}</span>
            <span class="rightBox">
              <span v-if="itemData.num>0" class="minus" @click="changeNum(itemData.num,'minus')">-</span>
              <input type="text" v-model="itemData.num" />
              <span class="add" @click="changeNum(itemData.num,'add')">+</span>
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
</template>

<script>
export default {
  name: "cartdataItem",
  created() {},
  props: {
    itemData: {},
    checkedItem: null,
  },
  data() {
    return {
      checkAll: false,
    };
  },
  components: {},
  methods: {
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedItem.length;
    },
  },
  computed: {},
  mounted() {},
  activated() {},
  deactivated() {},
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
  .inputBox {
    flex: 1;
    height: auto;
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
</style>
