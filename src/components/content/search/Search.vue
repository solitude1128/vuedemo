<template>
  <div id="search">
    <!-- 导航 -->
    <nav-bar class="s-nav-bar">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <el-input placeholder="电子琴" prefix-icon="el-icon-search" v-model="input"></el-input>
      </div>
      <div slot="right">
        <button type="submit" class="rb">搜索</button>
      </div>
    </nav-bar>
    <div>
      <p>搜索的东西</p>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "search",
  data() {
    return {
      input: ""
    };
  },
  components: {
    navBar
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
#search {
  background-color: #fff;
  overflow: hidden;
  padding-top: 50px;
  .rb {
    border: 0;
    color: #fff;
    padding: 10% 12%;
    border-radius: 3px;
    background-color: #e93b3d;
  }
}
</style>
<style lang="less" >
.el-input__inner {
  border: 0;
  background-color: #f6f6f6;
  border-radius: 50px;
  height: 28px;
  font-size: 12px;
}
</style>
