<template>
  <div id="Register">
    <nav-bar>
      <div slot="left">
        <router-link to="/login" class="el-icon-arrow-left" tag="i"></router-link>
      </div>
      <div slot="center">京东注册</div>
    </nav-bar>

    <div v-if="!isshow" class="bigBox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="手机号快速注册" name="phone">
          <div class="inputBox">
            <span :v-model="region" @click="changeRegion">
              {{region}}
              <span class="el-icon-arrow-down"></span>
            </span>
            <el-input placeholder="请输入手机号" :oninput="changeValue()" v-model="phone" clearable></el-input>
          </div>
          <el-button type="danger" :disabled="isgo" @click="isshow = true">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="用户注册" name="user">
          <div class="inputBox">
            <i class="el-icon-user"></i>
            <el-input placeholder="请设置用户名" v-model="userName" clearable></el-input>
          </div>
          <div class="inputBox">
            <i class="el-icon-lock"></i>
            <el-input placeholder="请设置密码" show-password v-model="pwd" clearable></el-input>
          </div>
          <div class="inputBox">
            <i class="el-icon-mobile-phone"></i>
            <el-input placeholder="请填写手机号" v-model="phone" clearable></el-input>
          </div>
          <div class="inputBox">
            <i class="el-icon-message"></i>
            <el-input placeholder="请设置邮箱" v-model="email" clearable></el-input>
          </div>
          <el-button type="danger" disabled>确认注册</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else class="bigBox">
      <div class="inputBox">
        <i class="el-icon-lock"></i>
        <el-input placeholder="请设置登录密码" show-password v-model="pwd" clearable></el-input>
      </div>
      <el-button type="danger" :disabled="!pwd" @click="register()">完成</el-button>
      <p>
        <span>遇到问题? 请</span>
        <a>联系客服</a>
      </p>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
import { Register } from "network";
import { haveData } from "common/common";
export default {
  name: "Register",
  data() {
    return {
      region: "+86",
      isgo: false,
      phone: "",
      userName: "",
      pwd: "",
      email: "",
      isshow: false,
      activeName: "phone",
    };
  },
  components: {
    navBar,
  },
  methods: {
    register() {
      let obj = {
        telphone: this.phone,
        password: this.pwd,
      };
      haveData(Register, obj, (res) => {
        console.log(res);
        if (res.code != 200) {
          this.jumpPage("/login");
        } else {
          this.jumpPage("/home");
        }
      });
    },
    open() {
      let template =
        "<div><span>在您注册成为京东用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，</span><span style='text-decoration: underline;'>请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：</span><p>《京东用户注册协议》</p><p>《京东隐私政策》</p><p>《订单共享与安全》</p><p style='font-size:12px;'>点击同意即表示您已阅读并同意<a href='https:/in.m.jd.com/help/app/register_info.html'>《京东用户注册协议》</a>与<a href='https://in.m.jd.com/help/app/private_policy.html'>《京东隐私策》</a>并将您的订单信息共享给为完成此订单所必须的第三方合作方。关于 <a href='https://in.m.jd.com/help/app/order_sharing_info.html'>《订单共享与安全》</a></p></div>";
      this.$confirm(template, "注册协议及隐私政策", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
        showClose: false,
      })
        .then(() => {})
        .catch(() => {
          this.jumpPage("/login");
        });
    },
    changeValue() {
      let res = /^1[3|4|5|7|8][0-9]{9}$/;
      if (this.phone && this.phone.length == 11 && res.test(this.phone)) {
        this.isgo = false;
      } else {
        this.isgo = true;
      }
    },
    changeRegion() {
      alert("aaa");
    },
  },
  activated() {
    this.open();
  },
};
</script>
<style lang="less" scoped>
#Register {
  background-color: #fff;
  padding-top: 50px;
  height: calc(100vh - 50px);
  .bigBox {
    width: 90%;
    margin: 0 auto;
    .inputBox {
      display: flex;
      line-height: 54px;
      border-bottom: 1px solid rgb(236, 236, 236);
      color: black;
      span {
        flex: 1;
      }
      i {
        flex: 0.6;
        font-size: 20px;
        line-height: 54px;
      }
      .el-input {
        flex: 4;
      }
    }
    p {
      text-align: left;
      font-size: 16px;
      span {
        color: rgb(218, 218, 218);
      }
      a {
        color: rgb(110, 186, 248);
      }
    }
  }
}
</style>
<style lang='less'>
.el-message-box {
  width: 88%;
  padding: 0;
  border-radius: 20px;
  .el-message-box__header {
    text-align: center;
  }
  .el-message-box__content {
    padding: 15px 25px;
  }
  .el-message-box__btns {
    padding: 0;
    .el-button {
      border-radius: 0 0 0 20px;
      padding: 15px;
      font-size: 18px;
      margin: 0;
      width: 50%;
    }
    .el-button--primary {
      border: none;
      background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
      border-radius: 0 0 20px 0;
    }
  }
}
.el-input {
  flex: 4;
  width: 72%;
  .el-input__inner {
    border: 1px solid transparent;
    padding-left: 0;
  }
}
.el-button {
  width: 100%;
  border-radius: 50px;
  margin: 15% 0;
  height: 50px;
}
.el-tabs__nav {
  width: 100%;
  .el-tabs__item {
    width: 50%;
    font-size: 16px;
    color: #f10000;
  }
  .el-tabs__active-bar {
    background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
  }
}
</style>
