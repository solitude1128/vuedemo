<template>
  <div id="category">
    <!-- 导航 -->
    <nav-bar class="cg-nav-bar">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <el-input placeholder="电子琴" prefix-icon="el-icon-search" v-model="input"></el-input>
      </div>
      <div slot="right">
        <i class="el-icon-more"></i>
      </div>
    </nav-bar>
    <el-tabs tab-position="left">
      <el-tab-pane v-for="(item,index) in arr" :key="index" :label="item">
        <p>{{item}}</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "category",
  components: {
    navBar
  },
  data() {
    return {
      input: "",
      arr: [
        "啊啊啊",
        "呀呀呀",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊",
        "啊啊啊"
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#category {
  padding: 42px 0 50px 0;
  .cg-nav-bar {
    background-color: #fff;
    line-height: 40px;
  }
}
</style>
<style lang="less">
#category {
  .el-tabs--left {
    position: fixed;
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    .el-tabs__item.is-left {
      text-align: center;
      font-size: 12px;
      padding: 0 12px;
    }
    .el-tabs__item.is-active {
      background-color: #fff;
    }
  }
  .el-input__inner {
    border: 0;
    background-color: #f6f6f6;
    border-radius: 50px;
    height: 28px;
    font-size: 12px;
  }
}
</style>