<template>
  <div id="shopcart">
    <!-- 导航 -->
    <nav-bar class="sC-nav-bar">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">购物车</div>
      <div slot="right">
        <i class="el-icon-more"></i>
      </div>
    </nav-bar>
    <!-- 空购物车 -->
    <div class="scNull">
      <el-image
        style="width: 100px; height: 100px"
        src="https://img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png"
        fit="contain"
      ></el-image>
      <p>购物车空空如也，去逛逛吧~</p>
    </div>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "shopcart",
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.sC-nav-bar {
  background-color: #fff;
}
.scNull {
  padding-top: 60px;
}
</style>