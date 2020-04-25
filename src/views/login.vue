<template>
  <div class="container">
    <div class="content">
      <div class="main">
        <div class="login-left"></div>
        <div class="login-right">
          <el-form :model="loginModel" ref="loginform" :rules="rules" class="login-form">
            <el-form-item>
              <div class="login-title">欢迎登录</div>
            </el-form-item>
            <el-form-item prop="userNameOrEmailAddress" class="login-userName">
              <el-input
                type="text"
                v-model="loginModel.userNameOrEmailAddress"
                placeholder="请输入账号"
                @focus="changeSelected"
                @blur="changeUnselected"
              ></el-input>
              <img :src="userImage" class="user-avar" />
              <div style="width:1px;height:26px;" class="line"></div>
            </el-form-item>
            <el-form-item prop="password" class="login-passWord">
              <el-input
                :type="passType"
                v-model="loginModel.password"
                placeholder="请输入密码"
                @focus="changePassWordSelected"
                @blur="changePassWordUnselected"
              ></el-input>
              <img :src="passWordImage" class="pass-avar" />
              <div style="width:1px;height:26px;" class="line"></div>
              <img :src="eyeImg" alt class="eye" @click="changeType()" />
            </el-form-item>
            <el-form-item class="login-button">
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import iView from "iview";
import AbpBase from "../lib/abpbase";
const userImage1 = require("../assets/images/userUnselectedImage.png");
const userImage2 = require("../assets/images/userSelectedImage.png");
const openEye = require("../assets/images/openEye.png");
const closeEye = require("../assets/images/closeEye.png");
const passWordImage1 = require("../assets/images/passWordUnSelected.png");
const passWordImage2 = require("../assets/images/passWordSelected.png");
@Component({})
export default class Login extends AbpBase {
  loginModel = {
    userNameOrEmailAddress: "",
    password: ""
  };
  passType: string = "password";
  eyeImg: string = require("../assets/images/closeEye.png");
  userImage: string = require("../assets/images/userUnselectedImage.png");
  passWordImage: string = require("../assets/images/passWordUnSelected.png");
  async login() {
    (this.$refs.loginform as any).validate(async (valid: boolean) => {
      if (valid) {
        this.$Message.loading({
          content: this.L("LoginPrompt"),
          duration: 0
        });
        await this.$store.dispatch({
          type: "app/login",
          data: this.loginModel
        });
        location.reload();
      }
    });
  }
  changeSelected() {
    this.userImage = userImage2
  }
  changeUnselected() {
    this.userImage = userImage1
  }
  changePassWordSelected() {
    this.passWordImage = openEye
  }
  changePassWordUnselected() {
    this.passWordImage = closeEye
  }
  changeType() {
    this.passType = this.passType === "password" ? "text" : "password";
    this.eyeImg = this.eyeImg == closeEye ? openEye : closeEye;
  }
  rules = {
    userNameOrEmailAddress: [
      { required: true, message: "请输入账号", trigger: "blur" }
    ],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };
  created() {}
}
</script>
<style scoped>
.container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 100%;
  background-color: #f0f2f5;
  background: url("../assets/images/loginBackgroundImage.png") no-repeat;
  background-size: 100%;
  position: relative;
}
.content {
  -ms-flex: 1 1 0%;
  flex: 1 1 0%;
}
.main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 1200px;
  height: 730px;
  margin: 0 auto;
}
.login-left {
  width: 550px;
  height: 730px;
  border-radius: 25px 0 0 25px;
  background: url("../assets/images/loginLeftImg.png") no-repeat;
  float: left;
}
.login-right {
  width: 650px;
  height: 100%;
  float: left;
  padding: 0 50px 0 50px;
  border-radius: 0 25px 25px 0;
  background-color: #fff;
}
.login-title {
  width: 136px;
  height: 48px;
  font-size: 34px;
  color: #2dc896;
  text-align: center;
  margin: 70px auto;
}
.login-form {
  margin: 0 auto;
}
.login-userName {
  position: relative;
}
.login-userName .line {
  background-color: #e8e8e8;
  position: absolute;
  left: 40px;
  top: 10px;
}
.login-userName .user-avar {
  position: absolute;
  left: 5px;
  top: 10px;
}
.login-userName /deep/ .el-form-item__error {
  left: 215px;
}
.login-passWord /deep/ .el-form-item__error {
  left: 215px;
}
.login-passWord {
  position: relative;
  margin-bottom: 60px;
}
.login-passWord .line {
  background-color: #e8e8e8;
  position: absolute;
  left: 40px;
  top: 10px;
}
.el-input /deep/ .el-input__inner {
  border: none;
  outline: none;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 50px;
}
.login-passWord .eye {
  position: absolute;
  left: 520px;
  top: 15px;
}
.el-form-item {
  margin-bottom: 70px;
}
.login-passWord .pass-avar {
  position: absolute;
  left: 5px;
  top: 10px;
}
.login-button {
  text-align: center;
}
.login-button .el-button {
  width: 500px;
  height: 75px;
  background: #2dc896;
  border-radius: 4px;
  font-size: 24px;
}
</style>

