<template>
  <div id="surprise">
    <!-- 导航 -->
    <nav-bar class="sC-nav-bar">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">京喜</div>
      <div slot="right">
        <i class="el-icon-more"></i>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "surprise",
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