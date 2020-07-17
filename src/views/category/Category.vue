<template>
  <div id="category">
    <!-- 导航 -->
    <nav-bar class="cg-nav-bar">
      <div slot="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <el-input placeholder="电子琴" prefix-icon="el-icon-search" v-model="input"></el-input>
      </div>
      <div slot="right">
        <i class="el-icon-more"></i>
      </div>
    </nav-bar>
    <div class="one">
      <tab-control controlId="categoryControl" :titleArr="oneData" ref="categoryControl">
        <div @click="tcClick(0)" :class="{active:oneIndex == 0}">
          <span>热门推荐</span>
        </div>
      </tab-control>
    </div>

    <div class="two">
      <div v-if="oneIndex===0">
        <dl v-if="historyData.length">
          <dt>
            <h3>
              浏览足迹
              <el-button type="text" @click="rmHistory">清空</el-button>
            </h3>
          </dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>
            <h3>热门分类</h3>
          </dt>
          <dd>
            <a href v-for="(i,key) in secMenuList" :key="key">
              <img :src="categorySrc+i.c3_img" width="50%" />
              <p>{{i.c3_name}}</p>
            </a>
          </dd>
        </dl>
      </div>
      <div v-if="oneIndex!=0">
        <dl v-for="(item,index) in secMenuList" :key="index">
          <dt>
            <h3>{{index}}</h3>
          </dt>
          <dd>
            <a :href="'/search/'+i.c3_id" v-for="(i,key) in item" :key="key" @click="saveHistoryData(i)">
              <img :src="categorySrc+i.c3_img" width="50%" />
              <p>{{i.c3_name}}</p>
            </a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import TabControl from "components/content/tabControl/TabControl";
import navBar from "components/common/navbar/NavBar";
import * as base from "network/jd_category";
export default {
  name: "category",
  components: {
    navBar,
    TabControl
  },
  data() {
    return {
      input: "",
      categorySrc: "http://106.12.85.17:8090/public/image/jd_category/",
      oneData: [],
      twoData: [],
      threeData: [],
      oneIndex: 0,
      secMenuList: null, //可能是数组,也可能是对象
      historyData: [] //已经浏览的记录,在发生页面跳转后,在路由守卫中记录当前请求的数据,并在页面跳转前,存储到historyData中(把整个)
    };
  },
  created() {
    this.getJdCategoryOne();
    this.getJdCategoryTwo();
    this.getJdCategoryThree();
  },
  beforeRouteLeave(to, from, next) {
    console.log("组件离开守卫导航被触发");
    console.log(this.$route.path);
    next();
  },
  methods: {
    // 定义网页相关事件
    tcClick(index) {
      // 传递进来的参数用于判断按钮是否被选中
      this.oneIndex = index;
      // 回传数据给子组件 / 修改子组件的数据
      // ref = categoryControl 的组件的值
      this.$refs.categoryControl.itemIndex = index;

      if (index === 0) {
        this.secMenuList = [];
        // 循环遍历表3,取出ishot=1的值存到secMenuList中
        this.secMenuList = [
          ...this.threeData.filter(threeList => {
            if (threeList.c3_ishot == 1) {
              return true; //条件成立 存到新数据
            }
            return false; //条件不成立 不存
          })
        ];
      } else {
        this.secMenuList = {};
        this.twoData.forEach(twoList => {
          if (twoList.c1_id == index) {
            this.secMenuList[twoList.c2_name] = {};
            this.threeData.forEach(threeList => {
              if (threeList.c2_id == twoList.c2_id) {
                this.secMenuList[twoList.c2_name][
                  threeList.c3_name
                ] = threeList;
              }
            });
          }
        });
        console.log(this.secMenuList);
      }
    },
    rmHistory() {
      let that = this;
      this.$confirm("确认要清空浏览足迹吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.historyData = [];
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    saveHistoryData(a) {
      console.log(a);
    },
    //网络请求
    getJdCategoryOne() {
      base.getJdCategoryOne().then(res => {
        if (res) this.oneData = res;
      });
    },
    getJdCategoryTwo() {
      base.getJdCategoryTwo().then(res => {
        if (res) this.twoData = res;
      });
    },
    getJdCategoryThree() {
      base.getJdCategoryThree().then(res => {
        this.threeData = res;
        this.tcClick(this.oneIndex);
      });
    }
  }
};
</script>

<style lang="less" scoped>
#category {
  display: flex;
  font-size: 12px;
  padding: 42px 0 50px 0;
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
    dt h3 {
      width: 100%;
      text-align: left;
      color: #666;
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