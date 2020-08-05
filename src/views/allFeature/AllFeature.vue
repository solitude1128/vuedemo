<template>
  <div id="allF">
    <scroll class="all-content">
      <nav-bar class="allNavBar">
        <div slot="left" @click="jumpPage('/home')">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">百宝箱</div>
        <div slot="right">
          <el-dropdown trigger="click" @command="pushRouter">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home" icon="el-icon-s-home">首页</el-dropdown-item>
              <el-dropdown-item command="/category" divided icon="el-icon-menu">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/shopCar" divided icon="el-icon-shopping-cart-2">购物车</el-dropdown-item>
              <el-dropdown-item command="/my" divided icon="el-icon-user">我的京东</el-dropdown-item>
              <el-dropdown-item command="/category" divided icon="el-icon-s-order">浏览记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>
      <dl v-for="(i,key) in allData" :key="key">
        <dt>
          <img
            src="//m.360buyimg.com/mobilecms/jfs/t19375/228/2147833578/3539/56b9e876/5ae95f90N06fb6b8e.png.webp"
            width="100%"
          />
        </dt>
        <dd v-for="(j,index) in i" :key="index">
          <!-- <img :src="$store.state.path+'/feature/'+j.imgsrc" alt="啊啊啊" /> -->
          <img
            src="//m.360buyimg.com/mobilecms/s80x80_jfs/t1/110682/29/897/4880/5e7344b3E8fb10394/9c44e06113d83d21.png.webp"
            width="50%"
          />
          <p>{{j.Title}}</p>
        </dd>
      </dl>
    </scroll>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import { getHomeFeature } from "network/home";
import { getAllFeature } from "common/common";
export default {
  name: "AllFeature",
  created() {
    getAllFeature(getHomeFeature, (res, data) => {
      this.allData = data;
      console.log(this.allData);
    });
  },
  data() {
    return {
      allData: [],
    };
  },
  components: {
    navBar,
    Scroll,
  },
  methods: {
    pushRouter(path) {
      this.jumpPage(path);
    },
  },
  computed: {},
  mounted() {},
  deactivated() {},
};
</script>
<style lang='less' scoped>
#allF {
  background-color: #fff;
  .all-content {
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
    .allNavBar {
      position: relative;
    }
    dl {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      dd {
        width: 20%;
        margin: 0;
      }
    }
  }
}
</style>
