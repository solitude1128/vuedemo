<template>
  <div id="jxCategory">
    <!-- 导航 -->
    <nav-bar class="jc-nav-bar">
      <div slot="center">
        <el-input
          placeholder="面包"
          prefix-icon="el-icon-search"
          v-model="input"
          v-on:focus="toKeywords"
        ></el-input>
      </div>
    </nav-bar>
    <scroll class="one" ref="one">
      <tab-control
        controlId="categoryControl"
        :titleArr="oneData"
        ref="categoryControl"
        @tabClick="tcClick"
      >
        <div @click="tcClick(0)" :class="{active:oneIndex == 0}">
          <span>热门推荐</span>
        </div>
      </tab-control>
    </scroll>

    <scroll class="two" ref="one"></scroll>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import { getJdCategoryOne } from "network";
export default {
  name: "JxCategory",
  data() {
    return {
      input: "",
      oneData: [],
      oneIndex: 0,
      secMenuList: null, //可能是数组,也可能是对象
    };
  },
  components: {
    navBar,
    TabControl,
    Scroll,
  },
  created() {
    this.getJdCategoryOne();
  },
  methods: {
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
    getJdCategoryOne() {
      getJdCategoryOne().then((res) => {
        if (res.data) this.oneData = res.data;
      });
    },
    toSearch() {
      this.$router.push("/search");
    },
    toKeywords() {
      this.$router.push("/kw");
    },
  },
};
</script>
<style lang='less' scoped>
#jxCategory {
  display: flex;
  font-size: 12px;
  padding-top: 50px;
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
  }
  .jc-nav-bar {
    background-color: #fff;
    border-bottom: 1px solid rgb(214, 214, 214);
  }
}
</style>

<style lang="less">
.el-input__inner {
  width: 53vh;
  height: 30px;
  background-color: rgb(246, 246, 246);
  border-radius: 50px;
  margin: 2% 0;
}
</style>