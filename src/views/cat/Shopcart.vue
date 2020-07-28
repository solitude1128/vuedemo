<template>
  <div id="shopcart">
    <!-- 导航 -->
    <nav-bar class="sC-nav-bar">
      <div slot="left">
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
            <el-dropdown-item command="/category" divided icon="el-icon-s-home">分类搜索</el-dropdown-item>
            <el-dropdown-item command="/shopCar" divided icon="el-icon-s-home">购物车</el-dropdown-item>
            <el-dropdown-item command="/my" divided icon="el-icon-s-home">我的京东</el-dropdown-item>
            <el-dropdown-item command="/category" divided icon="el-icon-s-home">浏览记录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  name: "Shopcart",
  components: {
    navBar,
  },
  methods: {
    pushRouter(path) {
      this.$router.push(path);
    },
  },
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