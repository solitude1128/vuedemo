<template>
  <div id="keywords">
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
    <!-- 热门搜索盒子 -->
    <div class="hotSearch">
      <p>
        <span class="left">热门搜索</span>
        <span @click="isShow = !isShow" v-if="isShow" class="right">隐藏</span>
        <span @click="isShow = !isShow" v-else class="right">显示</span>
      </p>
      <div v-if="isShow" class="hotBox">
        <router-link to="/home" v-for="(i,index) in arr" :key="index" tag="span">{{i.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "Keywords",
  data() {
    return {
      input: "",
      isShow: true,
      arr: [
        {
          href: "#",
          name: "三只松鼠",
        },
        {
          href: "#",
          name: "电视机",
        },
        {
          href: "#",
          name: "电饭锅",
        },
        {
          href: "#",
          name: "电饼铛",
        },
        {
          href: "#",
          name: "电冰箱",
        },
        {
          href: "#",
          name: "电脑",
        },
      ],
    };
  },
  components: {
    navBar,
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
#keywords {
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
  .hotSearch {
    padding: 0 4%;
    p {
      color: rgb(184, 184, 184);
      height: 20px;
    }
    .hotBox {
      display: flex;
      flex-wrap: wrap;
      span {
        background-color: rgb(226, 226, 226);
        padding: 2%;
        margin: 2%;
        border-radius: 20px;
      }
    }
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
