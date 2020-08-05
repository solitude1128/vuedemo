<template>
  <div id="login">
    <nav-bar>
      <div slot="left">
        <router-link to="/home" class="el-icon-arrow-left" tag="i"></router-link>
      </div>
      <div slot="center">京东登录注册</div>
    </nav-bar>

    <div class="bigBox">
      <div class="loginBox">
        <div class="inputBox">
          <span :v-model="region" @click="changeRegion">
            {{region}}
            <span class="el-icon-arrow-down"></span>
          </span>
          <el-input placeholder="请输入手机号" v-model="phone" clearable></el-input>
        </div>
        <div class="inputBox">
          <el-input placeholder="请输入收到的验证码" v-model="code" clearable></el-input>
          <span style="color:#e2231a;">获取验证码</span>
        </div>
        <el-button type="danger" disabled>登录</el-button>
        <el-button type="danger" plain>一键登录</el-button>
        <p>
          <span class="left">账号密码登录</span>
          <span class="right">手机快速注册</span>
        </p>
      </div>
      <div class="striping">
        <h4>其他方式</h4>
      </div>
      <p class="other">
        <a>
          <i class="el-icon-potato-strips"></i>
          <div>QQ</div>
        </a>
        <a>
          <i class="el-icon-ice-drink"></i>
          <div>微信</div>
        </a>
      </p>
      <p>
        未注册的手机号验证后将自动创建京东账号, 登录即代表您已同意
        <a href="//in.m.jd.com/help/app/private_policy.html">京东隐私政策</a>
      </p>
    </div>
  </div>
</template>

<script>
import navBar from "components/common/navbar/NavBar";
export default {
  name: "Login",
  data() {
    return {
      region: "+86",
      phone: "",
      code: "",
    };
  },
  components: {
    navBar,
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    changeRegion() {
      alert("aaa");
    },
  },
};
</script>
<style lang='less' scoped>
#login {
  background-color: #fff;
  padding-top: 50px;
  height: 100vh;
  .bigBox {
    width: 90%;
    margin: 0 auto;
    .loginBox {
      font-size: 16px;
      .inputBox {
        display: flex;
        line-height: 56px;
        border-bottom: 1px solid rgb(223, 223, 223);
        color: black;
        span {
          flex: 1;
        }
      }
    }
    p {
      min-height: 40px;
      line-height: 24px;
      color: rgb(172, 172, 172);
    }
    .striping {
      margin-top: 20%;
      border-top: 1px solid rgb(182, 182, 182);
      h4 {
        color: rgba(0, 0, 0, 0.2);
        width: 36%;
        margin: -0.6rem auto 0;
        background: #fff;
        text-align: center;
      }
    }
    .other a {
      display: inline-block;
      width: 30%;
      i {
        font-size: 26px;
        padding: 10%;
        background-color: rgb(238, 251, 255);
        color: rgb(78, 19, 187);
        border-radius: 50px;
        margin-bottom: 3%;
      }
    }
  }
}
</style>

<style lang='less'>
.el-input {
  width: 72%;
  .el-input__inner {
    border: 1px solid transparent;
    padding-left: 0;
  }
}
.el-button {
  width: 100%;
  border-radius: 50px;
  margin: 3% 0;
  height: 50px;
}
.el-button + .el-button {
  margin-left: 0;
  background-color: #fff;
  border-color: rgb(224, 60, 60);
}
</style>