<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav-bar">
      <div slot="left">
        <i class="el-icon-s-fold"></i>
      </div>
      <div slot="center">
        <div class="demo-input-suffix">
          <i></i>
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
    <div class="banner">
      <ul :style="{'left':bannerL + 'vw'}">
        <li v-for="(item,index) in banners" :key="index">
          <img :src="path+item.crs" />
        </li>
      </ul>
    </div>

    <!-- 分类列表 -->
    <div class="list">
      <div class="listBox" :style="{'left':leftL + 'vw'}">
        <a v-for="(item,index) in listArr" :key="index">
          <img :src="item.img" width="50%" />
          <p>{{item.name}}</p>
        </a>
      </div>
      <p>
        <span @click="leftL = 0">__&nbsp;</span>
        <span @click="leftL = -100">__</span>
      </p>
    </div>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
import * as base from "network/home";

export default {
  name: "home",
  data() {
    return {
      banners: {},
      path: "http://106.12.85.17:9091/public/image/banner/",
      bannerL: 0,
      leftL: 0,
      listArr: [
        {
          name: "京东超市",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp"
        },
        {
          name: "数码电器",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/135931/4/3281/5598/5efbf2c0Edbdc82c7/ed9861b4ddfb9f30.png.webp"
        },
        {
          name: "京东服饰",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/8/1804/3641/5efbf318E38bd5dad/0db99d859ab16ce9.png.webp"
        },
        {
          name: "京东生鲜",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf344Ebec23ae8/59712d986b10bb0a.png.webp"
        },
        {
          name: "京东到家",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/116602/7/11200/3796/5efbf375Ebba41029/f07cc166f368fa05.png.webp"
        },
        {
          name: "京口国际",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/142596/7/1864/4759/5efbf5a9E60c62b8a/49cdd24cb2bfecf5.png.webp"
        },
        {
          name: "京东拍卖",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/125193/15/5993/3443/5efbf5dbEa3327124/a4282d5cb2879c8b.png.webp"
        },
        {
          name: "唯品会",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/133947/24/3428/4213/5efbf625E7e1b4e98/95fda84d8748f88d.png.webp"
        },
        {
          name: "玩3c",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/145692/9/1817/4493/5efbf652E61c4f3ec/722840c121d67fc6.png.webp"
        },
        {
          name: "沃尔玛",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/118396/30/11271/2692/5efbf680Eb3a3cf32/c3e85c4d99746400.png.webp"
        },
        {
          name: "充值缴费",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/146390/3/1846/4909/5efbf39aEe5f5f797/300071558a9ab078.png.webp"
        },
        {
          name: "9.9元拼",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/143365/25/1824/3716/5efbf3c0E5175e1fb/88f6227257a29f1d.png.webp"
        },
        {
          name: "领券",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/113589/24/11332/4897/5efbf3feE705d87db/e5c12d5e943266b9.png.webp"
        },
        {
          name: "省钱",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/137117/29/3379/3674/5efc08f2E64aab27e/7426e99c5c0a8edb.png.webp"
        },
        {
          name: "PLUS会员",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/123730/37/5924/4189/5efbf567E0a226121/d04df7c74c87cf68.png.webp"
        },
        {
          name: "美妆馆",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/123571/19/6008/3747/5efbf6b2E03153a36/9ddc9036ba1c11a1.png.webp"
        },
        {
          name: "京东旅行",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/115003/18/11199/3519/5efbf6eaEe59cb7f6/dab44230606cd112.png.webp"
        },
        {
          name: "拍拍二手",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/142258/17/1800/4509/5efbf70aEb23e164e/61aaea8fe5221081.png.webp"
        },
        {
          name: "物流查询",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/116056/30/11288/4223/5efbf753Ee7cf2cd7/3977b5fe42b136e4.png.webp"
        },
        {
          name: "全部",
          img:
            "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/112559/35/11283/3523/5efbf774E285d108b/c0fa626df4979a21.png.webp"
        }
      ]
    };
  },
  components: {
    navBar
  },
  created() {
    this.getHomeBanner();
    this.move();
  },
  methods: {
    // 获取轮播图片
    getHomeBanner() {
      base.getHomeBanner().then(res => {
        this.banners = { ...res }; //解构赋值
        // 三个点代表数组的结构
      });
    },
    //移动
    move() {
      this.timer = setInterval(this.startmove, 3000);
    },
    //轮播开始移动
    startmove() {
      this.bannerL -= 93;
      if (this.bannerL <= -465) {
        this.bannerL = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.navbg {
  background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
  position: relative;
  top: 0;
  left: -25%;
  height: 20vh;
  width: 150%;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
}
.home-nav-bar {
  width: 100vw;
  background-color: #c82519;
  color: #ffffff;
  position: fixed;
  top: 0;
  z-index:10;
  .center i {
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
.banner {
  position: absolute;
  top: 8%;
  left: 3.6%;
  overflow: hidden;
  width: 93vw;
  height: 27vh;
  border-radius: 10px;
  ul {
    padding: 0;
    margin: 0;
    width: 465vw;
    position: relative;
    transition: left 1s;
    li {
      list-style: none;
      float: left;
    }
    img {
      width: 93vw;
    }
  }
}
.list {
  width: 100vw;
  margin-top: 17vh;
  overflow: hidden;
  .listBox {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 200vw;
    position: relative;
    transition: left 1s;
    a {
      width: 10%;
      font-size: 12px;
    }
  }
  > p {
    margin: 0;
  }
}
</style>

<style lang="less">
.home-nav-bar {
  .el-input__inner {
    background-color: #f6f6f6;
    border-radius: 50px;
    padding-left: 60px;
    height: 34px;
  }
  .el-input__prefix {
    left: 8vw;
  }
}
</style>