<template>
  <div id="detailsTabbar">
    <div v-for="(i,index) in tabObj" :key="index" @click="jumpPage(i.path)">
      <i :class="i.icon"></i>
      <br />
      {{i.name}}
    </div>
    <el-row class="buttonBox">
      <el-button type="danger" round>加入购物车</el-button>
      <el-button type="warning" round>立即购买</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "detailsTabbar",
  data() {
    return {
      tabObj: [
        { name: "客服", icon: "el-icon-user-solid", path: "" },
        { name: "店铺", icon: "el-icon-s-shop", path: "" },
        {
          name: "购物车",
          icon: "el-icon-shopping-cart-full",
          path: "/shopcart",
        },
      ],
    };
  },
};
</script>
<style lang='less' scoped>
#detailsTabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  line-height: 20px;
  background-color: #fff;
  display: flex;
  div {
    flex: 1;
    font-size: 12px;
    i {
      font-size: 20px;
    }
  }
  .buttonBox {
    flex: 4;
    .el-button--danger {
      background-color: red;
    }
    .el-button--warning {
      background-image: linear-gradient(135deg, #ffba0d, #ffc30d 69%, #ffcf0d);
    }
    .el-button.is-round {
      padding: 12px 16px;
      border: none;
    }
  }
}
</style>
