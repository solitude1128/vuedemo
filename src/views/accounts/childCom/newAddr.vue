<template>
  <div id="newaddr">
    <!-- 导航 -->
    <nav-bar class="sC-nav-bar">
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">收货地址</div>
    </nav-bar>
    <div class="box">
      <div class="inputBox">
        <span>收货人</span>
        <div>
          <el-input v-model="name" placeholder="姓名"></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>联系方式</span>
        <div>
          <el-input v-model="phone" placeholder="手机号码" maxlength="11"></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>所在地区</span>
        <div @click="getAddr">
          <el-input v-model="nowAddr" suffix-icon="el-icon-arrow-right" placeholder="选择所在地区"></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>详细地址</span>
        <div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 3}"
            placeholder="详细地址需填写楼栋楼层或房间号信息"
            v-model="particular"
            clearable
          ></el-input>
        </div>
      </div>
      <div class="inputBox">
        <span>地址标签</span>
        <div>
          <el-radio-group v-model="tag" size="small">
            <el-radio-button label="公司"></el-radio-button>
            <el-radio-button label="家"></el-radio-button>
            <el-radio-button label="学校"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="inputBox">
        <div>
          <el-button
            @click="newAddress"
            :disabled="!name||!phone||!area||!particular||!tag"
            type="danger"
            round
          >{{addrId=='new' ? '保存并使用该地址' : '确认'}}</el-button>
        </div>
      </div>

      <el-drawer title="所在地区" :visible.sync="addr" direction="btt" size="80%">
        <el-tabs v-model="editableTabsValue">
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <scroll class="newAddr-content" :probeType="3" :pull-up-load="true">
              <div v-if="item.type=='province'">
                <p v-for="i in item.content" @click="addTab(item.type,i)" :key="i.id">{{i.province}}</p>
              </div>
              <div v-else-if="item.type=='city'">
                <p v-for="i in item.content" @click="addTab(item.type,i)" :key="i.id">{{i.city}}</p>
              </div>
              <div v-else>
                <p v-for="i in item.content" @click="addTab(item.type,i)" :key="i.id">{{i.area}}</p>
              </div>
            </scroll>
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import Scroll from "components/content/scroll/Scroll";
import { getProvinces, getCities, getAreas } from "network";
import { noData, haveData } from "common/common";
export default {
  name: "newAddr",
  created() {},
  data() {
    return {
      name: "",
      phone: "",
      area: "", //呈现在后台的地址
      nowAddr: "", //页面展示的地址
      particular: "", //详细地址
      tag: "",
      addr: false,
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "请选择",
          name: "1",
          type: "province",
          content: "Tab 1 content",
        },
      ],
      tabIndex: 1,
    };
  },
  components: { navBar, Scroll },
  methods: {
    getAddr() {
      this.addr = true;
      noData(getProvinces, (res) => {
        this.editableTabs[0].content = res.data;
      });
    },
    addTab(type, obj) {
      if (type == "province") {
        if (this.tabIndex == "1") {
          let newTabName = ++this.tabIndex + "";
          this.editableTabs.push({
            title: "请选择",
            name: newTabName,
            type: "city",
            content: "new tab",
          });
          this.editableTabsValue = newTabName;
        } else {
          this.editableTabsValue = this.tabIndex + "";
        }
        this.editableTabs[0].title = obj.province;
        haveData(getCities, obj.provinceid, (res) => {
          if (res.code != 200) return;
          this.editableTabs[1].content = res.data;
        });
      }
      if (type == "city") {
        if (this.tabIndex == "2") {
          let newTabName = ++this.tabIndex + "";
          this.editableTabs.push({
            title: "请选择",
            name: newTabName,
            type: "area",
            content: "new tab",
          });
          this.editableTabsValue = newTabName;
        } else {
          this.editableTabsValue = this.tabIndex;
        }
        this.editableTabs[1].title = obj.city;
        haveData(getAreas, obj.cityid, (res) => {
          if (res.code != 200) return;
          this.editableTabs[2].content = res.data;
        });
      }
      if (type == "area") {
        this.editableTabs[2].title = obj.area;
        for (let i in this.editableTabs) {
          this.nowAddr += this.editableTabs[i].title + " ";
          this.area += this.editableTabs[i].title + ",";
        }
        if (this.area.length > 0) {
          this.area = this.area.substr(0, this.area.length - 1);
        }
        this.addr = false;
      }
    },
    newAddress() {
      console.log(this.name);
      console.log(this.phone);
      console.log(this.area);
      console.log(this.particular);
      console.log(this.tag);
      console.log(this.addrId);
    },
  },
  computed: {
    addrId() {
      return this.$route.params.addrId;
    },
  },
  mounted() {},
};
</script>
<style lang='less' scoped>
.box {
  line-height: 44px;
  background-color: #fff;
  overflow: hidden;
  padding-top: 50px;
  .inputBox {
    border-top: 1px solid rgba(209, 209, 209, 0.37);
    display: flex;
    span {
      flex: 2;
      font-size: 13px;
      color: rgb(149, 149, 149);
    }
    div {
      text-align: left;
      flex: 8;
    }
  }
}
</style>
<style lang="less">
.el-input .el-input__inner,
.el-textarea .el-textarea__inner {
  border: 1px solid transparent;
  padding: 10px 0;
}
.el-button {
  width: 90%;
  margin: 20px;
}
.el-drawer {
  border-radius: 20px 20px 0 0;
  :focus {
    outline: 0;
  }
  .el-drawer__body {
    padding-left: 15px;
    .newAddr-content {
      height: 60vh;
      overflow: hidden;
      p {
        text-align: left;
        margin: 0;
      }
    }
    .el-tabs__item.is-active {
      color: #f2270c;
    }
    .el-tabs__active-bar {
      background-color: #f2270c;
    }
  }
  .el-drawer__header {
    font-weight: bold;
    color: black;
    font-size: 16px;
    padding: 6px;
    margin: 0;
  }
}
</style>
