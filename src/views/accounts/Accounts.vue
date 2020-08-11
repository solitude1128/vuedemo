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
    </scroll>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
export default {
  name: "Accounts",
  created() {
    if (!this.userInfo) {
      this.jumpPage("/login");
    }
  },
  data() {
    return {};
  },
  components: {
    navBar,
    Scroll,
  },
  methods: {
    aScroll(position) {
      if (position.y >= 0) {
        this.$refs.accScroll.scrollTo(0, 0, 100);
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
        ? this.$store.state.userInfo[0]
        : this.$store.state.userInfo;
    },
  },
  mounted() {},
  activated() {},
  deactivated() {},
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
}
</style>
