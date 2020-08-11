<template>
  <div id="Register">
    <nav-bar>
      <div slot="left">
        <router-link to="/login" class="el-icon-arrow-left" tag="i"></router-link>
      </div>
      <div slot="center">京东注册</div>
    </nav-bar>
    <div v-if="!isshow">
      <div class="inputBox">
        <span :v-model="region" @click="changeRegion">
          {{region}}
          <span class="el-icon-arrow-down"></span>
        </span>
        <el-input placeholder="请输入手机号" :oninput="changeValue()" v-model="phone" clearable></el-input>
      </div>
      <el-button type="danger" :disabled="isgo" @click="isshow = true">下一步</el-button>
    </div>
    <div v-else>啊啊啊</div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "Register",
  data() {
    return {
      region: "+86",
      isgo: false,
      phone: "",
      isshow: false,
    };
  },
  components: {
    navBar,
  },
  methods: {
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
  .inputBox {
    display: flex;
    width: 90%;
    margin: 0 auto;
    line-height: 56px;
    border-bottom: 1px solid rgb(236, 236, 236);
    color: black;
    span {
      flex: 1;
    }
    .el-input {
      flex: 4;
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
  width: 90%;
  border-radius: 50px;
  margin: 15% 0;
  height: 50px;
}
</style>
