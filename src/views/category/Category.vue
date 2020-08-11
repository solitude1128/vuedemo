<template>
  <div id="category">
    <!-- 顶部导航 -->
    <nav-bar class="cg-nav-bar">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <el-input
          placeholder="电子琴"
          prefix-icon="el-icon-search"
          v-model="input"
          v-on:focus="jumpPage('/kw')"
        ></el-input>
      </div>
    </nav-bar>

    <!-- 左侧导航 -->
    <scroll class="one" ref="one">
      <tab-control
        :titleArr="oneData"
        ref="categoryControl"
        @tabClick="tcClick"
        :isDirection="false"
      >
        <div @click="tcClick(0)" :class="{active:oneIndex == 0}">
          <span>热门推荐</span>
        </div>
      </tab-control>
    </scroll>
    <!-- 右侧导航 -->
    <scroll class="two" ref="two" @parentScroll="contentScroll">
      <tab-content :cIndex="oneIndex"></tab-content>
      <div v-if="oneIndex===0">
        <!-- 浏览记录 -->
        <dl v-if="historyData.length">
          <dt>
            <span class="left">浏览足迹</span>
            <el-button class="right" type="text" @click="rmHistory">
              <span class="el-icon-delete"></span>
              清空
            </el-button>
          </dt>
          <dd>
            <a v-for="(i,key) in historyData" :key="key" @click="saveData(i)">
              <img :src="path+'/jd_category/'+i.c3_img" width="50%" @load="cImageLoad" />
              <p>{{i.c3_name}}</p>
            </a>
          </dd>
        </dl>
        <!-- 热门推荐 -->
        <dl>
          <dt>
            <span class="left">热门分类</span>
            <router-link class="right" to="/category/rl" tag="span">
              <span class="el-icon-s-data" style="color:red"></span>
              <span>&nbsp;排行榜</span>
              <span class="el-icon-arrow-right"></span>
            </router-link>
          </dt>
          <dd>
            <a v-for="(i,key) in secMenuList" :key="key" @click="saveData(i)">
              <img :src="path+'/jd_category/'+i.c3_img" width="50%" @load="cImageLoad" />
              <p>{{i.c3_name}}</p>
            </a>
          </dd>
        </dl>
      </div>
      <div v-if="oneIndex!=0">
        <!-- 手机数码等其他 -->
        <dl v-for="(item,index) in secMenuList" :key="index">
          <dt>{{index}}</dt>
          <dd>
            <a v-for="(i,key) in item" :key="key" @click="saveData(i)">
              <img :src="path+'/jd_category/'+i.c3_img" width="50%" @load="cImageLoad" />
              <p>{{i.c3_name}}</p>
            </a>
          </dd>
        </dl>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/content/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import TabContent from "components/content/tabContent/TabContent";
import navBar from "components/common/navbar/NavBar";
import {
  getJdCategoryOne,
  getJdCategoryTwo,
  getJdCategoryThree,
} from "network";
import { debounce } from "common/utils";
import { noData } from "common/common";

export default {
  name: "Category",
  components: {
    navBar,
    TabControl,
    Scroll,
    TabContent,
  },
  data() {
    return {
      input: "",
      oneData: [],
      twoData: [],
      threeData: [],
      oneIndex: 0,
      secMenuList: null, //可能是数组,也可能是对象
      historyData: [], //已经浏览的记录,在发生页面跳转后,在路由守卫中记录当前请求的数据,并在页面跳转前,存储到historyData中(把整个)
    };
  },
  created() {
    this.getJdCategoryOne();
    this.getJdCategoryTwo();
    this.getJdCategoryThree();
    this.historyData =
      localStorage.historyData &&
      JSON.parse(localStorage.historyData).length > 0
        ? JSON.parse(localStorage.historyData)
        : [];
  },
  methods: {
    // 定义网页相关事件
    tcClick(index) {
      // 传递进来的参数用于判断按钮是否被选中
      this.oneIndex = index;
      // 回传数据给子组件 / 修改子组件的数据
      // ref = categoryControl 的组件的值
      this.$refs.categoryControl.itemIndex = index;
      console.log(index);
      if (index === 0) {
        this.secMenuList = [];
        // 循环遍历表3,取出ishot=1的值存到secMenuList中
        this.secMenuList = [
          ...this.threeData.filter((threeList) => {
            if (threeList.c3_ishot == 1) {
              return true; //条件成立 存到新数据
            }
            return false; //条件不成立 不存
          }),
        ];
      } else {
        this.secMenuList = {};
        this.twoData.forEach((twoList) => {
          if (twoList.c1_id == index) {
            this.secMenuList[twoList.c2_name] = {};
            this.threeData.forEach((threeList) => {
              if (threeList.c2_id == twoList.c2_id) {
                this.secMenuList[twoList.c2_name][
                  threeList.c3_name
                ] = threeList;
              }
            });
          }
        });
      }
    },
    rmHistory() {
      let that = this;
      this.$confirm("确认要清空浏览足迹吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.historyData = [];
          localStorage.removeItem("historyData");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    cImageLoad() {
      const refresh = debounce(this.$refs.two.refresh, 1000);
      refresh();
    },
    contentScroll() {
      console.log("twoScroll");
    },
    saveData(a) {
      if (localStorage.historyData) {
        let obj = JSON.parse(localStorage.historyData);
        for (var i in obj) {
          if (a.c3_id == obj[i].c3_id) {
            obj.splice(i, 1);
          }
        }
        this.historyData = [];
        obj.unshift(a);
        for (var j in obj) {
          if (j <= 5) {
            this.historyData.push(obj[j]);
          }
        }
      } else {
        this.historyData = [a];
      }
      console.log(this.historyData);
      localStorage.historyData = JSON.stringify(this.historyData);
      this.jumpPage("/search/" + a.c3_id);
    },
    //网络请求
    getJdCategoryOne() {
      noData(getJdCategoryOne, (res) => {
        this.oneData = res.data;
      });
    },
    getJdCategoryTwo() {
      noData(getJdCategoryTwo, (res) => {
        this.twoData = res.data;
      });
    },
    getJdCategoryThree() {
      noData(getJdCategoryThree, (res) => {
        this.threeData = res.data;
        this.tcClick(this.oneIndex);
      });
    },
  },
  computed: {
    path() {
      return this.$store.state.path;
    },
  },
};
</script>

<style lang="less" scoped>
#category {
  display: flex;
  font-size: 12px;
  padding-top: 42px;
  height: calc(100vh - 92px);
  overflow: hidden;
  .one {
    flex: 1;
    .active {
      background-color: #fff;
      color: #c82519;
    }
  }
  .two {
    flex: 4;
    background-color: #fff;
    padding: 0 10px;
    margin-left: 2px;
    dl {
      margin: 0;
      dt {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: left;
        color: #666;
        font-weight: bold;
        .left {
          float: left;
        }
        .right {
          font-size: 12px;
          float: right;
          color: rgb(126, 126, 126);
        }
      }
      dd {
        display: flex;
        margin: 0;
        flex-wrap: wrap;
        a {
          width: 33%;
          text-decoration: none;
          color: #666;
        }
      }
    }
  }
  .cg-nav-bar {
    background-color: #fff;
    line-height: 40px;
  }
}
</style>
<style lang="less">
.el-input__inner {
  border: 0;
  background-color: #f6f6f6;
  border-radius: 50px;
  height: 28px;
  font-size: 12px;
}
.el-message-box {
  width: 90%;
}
</style>