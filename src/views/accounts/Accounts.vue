<template>
  <div id="accounts">
    <scroll
      class="accounts-content"
      :probeType="3"
      @parentScroll="aScroll"
      :pull-up-load="true"
      ref="accScroll"
    >
      <!-- 顶部导航 -->
      <nav-bar class="aNav">
        <div slot="left">
          <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">确认订单</div>
      </nav-bar>
      {{order}}
      <!-- 配送地址 -->
      <div class="address">
        <div>
          <p>
            <span>{{userInfo?userInfo.name:''}}</span>
            <span>{{userInfo?userInfo.tel:''}}</span>
          </p>
          <span>高房子的边边儿倒三个拐拐儿转四个弯弯儿</span>
        </div>
        <span class="rightBox">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <!-- 订单展示 -->
      <order-shop v-for="(i,key) in order" :key="key" :shop="i">
        <div>
          <strong slot="header">
            <i class="el-icon-s-shop"></i>
            {{key}}
            {{i}}
          </strong>
          <!-- <div v-for="(j,index) in order[key]  ::key="index"">
            <img
              slot="imgBox"
              src="http://106.12.85.17:8090/public/image/goods/jd_wjyq_synl5_cover1.jpg"
              width="100%"
            />
            <div slot="shopBox">
              <p>{{i.}}</p>
            </div>
          </div>-->
        </div>
      </order-shop>
    </scroll>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import orderShop from "./childCom/orderShop";
export default {
  name: "Accounts",
  created() {
    if (!this.userInfo) {
      this.jumpPage("/login");
    }
    this.convert();
  },
  data() {
    return {
      order: {},
    };
  },
  components: {
    navBar,
    Scroll,
    orderShop,
  },
  methods: {
    aScroll(position) {
      if (position.y >= 0) {
        this.$refs.accScroll.scrollTo(0, 0, 100);
      }
    },
    convert() {
      // ----------------第一种方法-----------------
      // let arr = [],
      //   dest = [];
      // this.orderData.forEach((i) => {
      // // 如果在arr里没查着就往里push个对象
      //   if (arr.indexOf(i.shop_name) === -1) {
      //     dest.push({
      //       [i.shop_name]: [i],
      //     });
      //     arr.push(i.shop_name);
      //   } else {
      // // 否则如果查着了就判断dest里是否有重复的key,如果有重复的键并且此键的数组里面没有即将要添加的数据就往里push,然后停止
      //     for (let j = 0; j < dest.length; j++) {
      //       let key = Object.keys(dest[j]);
      //       if (key == i.shop_name && dest[j][key].indexOf(i) == -1) {
      //         dest[j][key].push(i);
      //         break;
      //       }
      //     }
      //   }
      // });
      // this.order = dest;
      // ----------------第二种方法-----------------
      let obj = {};
      this.orderData.forEach((item) => {
        // 从一个对象中取出一个键的值
        let { shop_name } = item;
        if (!obj[shop_name]) {
          obj[shop_name] = [];
        }
        obj[shop_name].push(item);
      });
      this.order = obj;
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
        ? this.$store.state.userInfo[0]
        : this.$store.state.userInfo;
    },
    orderData() {
      return JSON.parse(this.$route.params.shopId);
    },
  },
};
</script>

<style lang='less' scoped>
.accounts-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 50px;
  width: 100%;
  .aNav {
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid rgba(230, 230, 230, 0.691);
  }
  .address {
    display: flex;
    padding: 0 0 20px 10px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURf///4u16Oxtbezz/J3B7NDh9vSmprjS8vGNjfjDw/vd3f7w8O57e0EOI68AAABSSURBVCjPY2CAAE4l7GACVJ4hUBArEIXJL8KuXw0mz4xdv2ABVJ77EHYDGmAGmGDXLwKT58CuX2cDTIEjdgOcYfJJ2A3Qgsmz4/CBwWgQUiMIAXzCOFELLk/nAAAAAElFTkSuQmCC")
      #fff repeat-x bottom;
    background-size: 15%;
    div {
      text-align: left;
      flex: 9;
      p {
        font-weight: bold;
        color: black;
      }
    }
    .rightBox {
      line-height: 60px;
      flex: 1;
    }
  }
  .orderShop {
    padding: 10px;
  }
}
</style>
