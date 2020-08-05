<template>
  <div id="search">
    <nav-bar>
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
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "Search",
  data() {
    return {
      input: "",
    };
  },
  components: { navBar },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less' >
.el-input__inner {
  border: 0;
  background-color: rgb(246, 246, 246);
  border-radius: 50px;
  height: 28px;
  font-size: 12px;
}
</style>
