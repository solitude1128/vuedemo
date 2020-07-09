<template>
  <div id="profile">
    <!-- 导航 -->
    <nav-bar class="pf-nav-bar">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">我的京东</div>
      <div slot="right">
        <i class="el-icon-more"></i>
      </div>
    </nav-bar>

    <!-- 导航背景 -->
    <div class="navbg">
      <el-avatar
        class="toux"
        src="http://img3.imgtn.bdimg.com/it/u=2381468826,3029522659&fm=11&gp=0.jpg"
      ></el-avatar>
      <div class="myname">
        <span>我是昵称</span>
        <p>用户名:123456789</p>
      </div>
    </div>

    <div class="myCell">
      <a v-for="(i,index) in cellArr" :key="index">
        <img :src="i.img" width="20%" />
        <p>{{i.name}}</p>
      </a>
    </div>
    <div class="myCell">
      <a v-for="(i,index) in cellArr2" :key="index">
        <p class="red">{{i.name}}</p>
        <img
          v-if="i.name == ''"
          src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t20329/11/1228908740/243/73a7934c/5b235f37Ne85fdb85.png"
          width="15%"
        />
        <p>{{i.text}}</p>
      </a>
    </div>
    <div class="myCell">
      <a v-for="(i,index) in cellArr3" :key="index">
        <span>{{i.count}}</span>
        <p>{{i.text}}</p>
      </a>
    </div>
    <div class="myCell">
      <a class="bfb" v-for="(i,index) in cellArr4" :key="index">
        <img :src="i.img" width="20%" />
        <p>{{i.text}}</p>
      </a>
    </div>
    <p class="khfw">
      <span>客户服务</span>
      <i class="el-icon-arrow-right"></i>
    </p>
  </div>
</template>
<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "my",
  data() {
    return {
      cellArr: [
        {
          name: "待付款",
          img:
            "https://img11.360buyimg.com/jdphoto/s40x40_jfs/t14911/113/1615678148/168/7734f24f/5a53578eN0e2811b6.png"
        },
        {
          name: "待收货",
          img:
            "https://img11.360buyimg.com/jdphoto/s40x40_jfs/t14608/2/1636876268/266/b4ebb3f2/5a535791N627c296c.png"
        },
        {
          name: "退货/售后",
          img:
            "https://img11.360buyimg.com/jdphoto/s40x40_jfs/t15049/345/1573771240/492/7ef15694/5a5357eaNab882dcb.png"
        },
        {
          name: "全部订单",
          img:
            "https://img30.360buyimg.com/jdphoto/jfs/t14953/346/2113764063/185/1a1dcd24/5a6d7b8bN8431ea1a.png"
        }
      ],
      cellArr2: [
        {
          name: "0张",
          text: "京东券"
        },
        {
          name: "开通有礼",
          text: "白条"
        },
        {
          name: "12个",
          text: "京豆"
        },
        {
          name: "0元",
          text: "红包"
        },
        {
          name: "",
          text: "我的资产"
        }
      ],
      cellArr3: [
        {
          count: 0,
          text: "商品收藏"
        },
        {
          count: 0,
          text: "店铺收藏"
        },
        {
          count: 0,
          text: "我的足迹"
        }
      ],
      cellArr4: [
        {
          img:
            "https://img14.360buyimg.com/jdphoto/jfs/t1/24988/22/12030/2316/5c94d6d4E7cdcf995/c8fe8e84d89685f7.png.webp",
          text: "我的预约"
        },
        {
          img:
            "https://img12.360buyimg.com/img/s64x64_jfs/t1/97016/19/15154/2382/5e6b8e86E17a7527c/eeed6fdf78de3847.png.webp",
          text: "高价回收"
        },
        {
          img:
            "https://img10.360buyimg.com/jdphoto/jfs/t12931/150/1327543095/1276/e9e67341/5a1e9ee2Nb5baf153.png.webp",
          text: "京东火车票"
        },
        {
          img:
            "https://img13.360buyimg.com/jdphoto/jfs/t13612/121/1346421356/1355/9014e74f/5a1e9f1cNab886864.png.webp",
          text: "应用推荐"
        },
        {
          img:
            "https://img10.360buyimg.com/jdphoto/jfs/t18940/299/476632277/2164/4453d9e4/5a813897N7c80dea2.png.webp",
          text: "京东机票"
        },
        {
          img:
            "https://img20.360buyimg.com/jdphoto/jfs/t16390/157/2010422417/341/bb4c68c4/5a8138f2Nfd5de7b7.png.webp",
          text: "京东酒店"
        },
        {
          img:
            "https://img12.360buyimg.com/img/s64x64_jfs/t1/102785/29/14987/2346/5e6b8ed9Ee5ab6266/d6d34952c182fb1b.png.webp",
          text: "闲置换钱"
        }
      ]
    };
  },
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
.pf-nav-bar {
  background-color: #fff;
}
.navbg {
  background-image: linear-gradient(90deg, #eb3c3c, #ff7459);
  position: relative;
  top: 0;
  left: -25%;
  height: 20vh;
  width: 150%;
  color: #fff;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  .toux {
    position: absolute;
    left: 19%;
    top: 10%;
    width: 60px;
    height: 60px;
  }
  .myname {
    position: absolute;
    left: 33%;
    top: 12%;
    text-align: left;
    p {
      margin: 5px 0;
      font-size: 12px;
    }
  }
}
.myCell {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  overflow: hidden;
  margin: 15px 0;
  padding-top: 10px;
  background-color: #fff;
  a {
    flex: 1;
    font-size: 12px;
    .red {
      color: #e93b3d;
    }
  }
  a.bfb {
    flex: none;
    width: 25%;
  }
}
.khfw{
    padding: 10px;
    background-color: #fff;
    text-align: left;
    i{
        float:right;
    }
}
</style>