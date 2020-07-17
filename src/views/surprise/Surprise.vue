<template>
  <div id="surprise">
    <!-- 导航 -->
    <nav-bar class="sc-nav-bar">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">京喜</div>
      <div slot="right">
        <i class="el-icon-more"></i>
      </div>
    </nav-bar>
    <div class="navbg"></div>
    <!-- 主页轮播 -->
    <jx-rotation :cbanners="banners"></jx-rotation>

    <!-- 功能视图 -->
    <jx-feature :cFea="feaArr"></jx-feature>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
import jxRotation from "./childComp/jxRotation";
import jxFeature from "./childComp/jxFeature";
import * as base from "network/home";
export default {
  name: "surprise",
  components: {
    navBar,
    jxRotation,
    jxFeature
  },
  data() {
    return {
      banners: [],
      feaArr: []
    };
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
  }
};
</script>

<style lang="less" scoped>
#surprise {
  padding: 40px 0;
  .sc-nav-bar {
    background-color: #fff;
    line-height: 40px;
  }
  .navbg {
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
    position: fixed;
    top: 0;
    left: -25%;
    height: 30vh;
    width: 150%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    z-index: -1;
  }
}
</style>