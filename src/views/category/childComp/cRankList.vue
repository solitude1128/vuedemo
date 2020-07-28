<template>
  <div id="rankList">
    <scroll :probeType="3" @parentScroll="rlScroll">
      <!-- 导航 -->
      <nav-bar class="rl-nav-bar">
        <div slot="left">
          <router-link class="el-icon-arrow-left" to="/category" tag="i"></router-link>
        </div>
        <div slot="center">排行榜</div>
        <div slot="right">
          <i class="el-icon-more"></i>
        </div>
      </nav-bar>
      <!-- 列表导航 -->
      <div @click="drawer = true" class="list">
        <ul class="left">
          <li v-for="(i,key) in listData" :key="key">{{key}}</li>
        </ul>
        <span class="right">
          <span class="el-icon-arrow-down"></span>
        </span>
      </div>
      <div>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
        <p>啊啊啊</p>
      </div>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :direction="direction">
        <span>我来啦!</span>
      </el-drawer>
    </scroll>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
export default {
  name: "cRankList",
  data() {
    return {
      drawer: false,
      direction: "ttb",
      listData: {
        SSD固态硬盘: {
          data: [
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/88686/35/13539/283286/5e59dd0fEb6404004/eae87083e6211686.jpg!q70.dpg.webp",
              name: "金士顿(Kingston) 240GB SSD固态硬盘 SATA3.0接口 A400系列",
              price: 229,
              sales: 99
            },
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/97614/19/16996/86096/5e81890aE9b7ffd6f/7c6c265a1a08c0a7.jpg!q70.dpg.webp",
              name: "金士顿(Kingston) 240GB SSD固态硬盘 SATA3.0接口 A400系列",
              price: 519,
              sales: 98
            }
          ]
        },
        手机: {
          data: [
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg!q70.dpg.webp",
              name: "金士顿(Kingston) 240GB SSD固态硬盘 SATA3.0接口 A400系列",
              price: 5899,
              sales: 100
            },
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg!q70.dpg.webp",
              name: "金士顿(Kingston) 240GB SSD固态硬盘 SATA3.0接口 A400系列",
              price: 5899,
              sales: 98
            }
          ]
        },
        骑行运动: {
          data: [
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg!q70.dpg.webp",
              name: "平衡车",
              price: 599,
              sales: 97
            },
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg!q70.dpg.webp",
              name: "电瓶车",
              price: 769,
              sales: 97
            }
          ]
        },
        女装: {
          data: [
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg!q70.dpg.webp",
              name: "金士顿(Kingston) 240GB SSD固态硬盘 SATA3.0接口 A400系列",
              price: 5899,
              sales: 100
            },
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg!q70.dpg.webp",
              name: "金士顿(Kingston) 240GB SSD固态硬盘 SATA3.0接口 A400系列",
              price: 5899,
              sales: 98
            }
          ]
        },
        面部护肤: {
          data: [
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg!q70.dpg.webp",
              name: "平衡车",
              price: 599,
              sales: 97
            },
            {
              img:
                "//m.360buyimg.com/rank/s264x264_jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg!q70.dpg.webp",
              name: "电瓶车",
              price: 769,
              sales: 97
            }
          ]
        }
      }
    };
  },
  components: {
    navBar,
    Scroll
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    rlScroll(position) {
      console.log(position);
    }
  }
};
</script>
<style lang='less' scoped>
#rankList {
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  .rl-nav-bar {
    position: relative;
  }
  .list {
    padding-left: 3%;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid rgb(211, 211, 211);
    border-bottom: 1px solid rgb(211, 211, 211);
    ul {
      margin: 0;
      display: flex;
      width: 90%;
      overflow: hidden;
      li {
        flex-shrink: 0;
        width: 30%;
      }
    }
    .el-icon-arrow-down {
      width: 34px;
      font-size: 16px;
      border-left: 1px solid gray;
    }
  }
}
</style>