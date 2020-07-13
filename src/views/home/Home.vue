<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav-bar">
      <div slot="left">
        <i class="el-icon-s-fold"></i>
      </div>
      <div slot="center">
        <div class="demo-input-suffix">
          <i class="jd"></i>
          <el-input type="search" placeholder="衣服" prefix-icon="el-icon-search"></el-input>
        </div>
      </div>
      <div slot="right">
        <i class="el-icon-user"></i>
      </div>
    </nav-bar>
    <!-- 导航背景 -->
    <div class="navbg"></div>

    <!-- 主页轮播 -->
    <home-rotation :cbanners="banners"></home-rotation>

    <!-- 功能视图 -->
    <home-feature :cFea="feaArr"></home-feature>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
import homeRotation from "./childComp/homeRotation";
import homeFeature from "./childComp/homeFeature";
import * as base from "network/home";

export default {
  name: "home",
  data() {
    return {
      banners: [],
      feaArr: []
    };
  },
  components: {
    navBar,
    homeRotation,
    homeFeature
  },
  created() {
    // 获取主页轮播数据
    this.getHomeBanner();
    // 获取功能视图数据
    this.getHomeFeature();
  },
  methods: {
    // 获取轮播图片
    getHomeBanner() {
      base.getHomeBanner().then(res => {
        this.banners = res; //解构赋值
      });
    },
    getHomeFeature() {
      base.getHomeFeature().then(res => {
        for (let i = 0; i < res.length / 10; i++) {
          this.feaArr.push([]);
          for (let j = 0; j < res.length; j++) {
            if (parseInt(j / 10) == i) {
              this.feaArr[i].push(res[j]);
            }
          }
        }
        console.log(this.feaArr);
      });
    }
  },
  filter: {
    filterFeature(data, i) {
      console.log(data);
      console.log(i);
    }
  }
};
</script>

<style lang="less" scoped>
.navbg {
  background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
  position: fixed;
  top: 0;
  left: -25%;
  height: 20vh;
  width: 150%;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  z-index: -1;
}
</style>

<style lang="less">
.home-nav-bar {
  background-color: #c82519;
  color: #ffffff;
  .el-input__inner {
    background-color: #f6f6f6;
    border-radius: 50px;
    padding-left: 60px;
    height: 34px;
  }
  .el-input__prefix {
    left: 8vw;
  }
  .center .jd {
    width: 5vw;
    height: 2.2vh;
    position: absolute;
    left: 16vw;
    top: 3vh;
    z-index: 1;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOo8Puo7Peo7Pek7Peo7Pe0/Qek7PvE+SP9SUuo7Peo7Peo7Pus8P+o7Peo7Pek7PZSxd20AAAAQdFJOUwBV8eG+hyGkEQbGmWs/rthNA0r+AAAA5klEQVQ4y63T0RaDIAgAUEDRUjP//2u3CI/T1vJhvM3uVBAANGx5xwLgiwSZ3TI6uMYANSyuc7AUs03CUvgHRMTEflcZ76FezDGJTE/wTYNI9whhDePhNxAcDVveQWDJbgK6Y8FPQDBH2WdgPlZmYNQvj5D7tP8Ap4+2s8lQX56g4AK34bGPshJ8gbl/wrXoASOUDanlgvVFB3g2T5sGZ2on9xCp23BJ8tusPVzw7O/zhuxtHSIZDYGRo891WUemjeVZgsu4kmY8ju8Ifb2f/i3WV+/gzq0Zgs0xba0eHCSsj4zLR91f1fAfiWsqzlEAAAAASUVORK5CYII=)
      no-repeat;
    background-size: 100% 100%;
  }
  .left i,
  .right i {
    font-size: 22px;
  }
}
</style>