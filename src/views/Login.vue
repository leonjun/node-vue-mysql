<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="login-box">
      <h3>登陆系统</h3>
      <el-form-item prop="account">
        <el-input v-model="ruleForm2.account" placeholder="默认账号：admin" @keyup.enter.native="submit"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm2.password" placeholder="默认密码:123456" @keyup.enter.native="submit"></el-input>
      </el-form-item>
      <el-form-item prop="verify">
        <el-col :span="16">
            <el-input  v-model="ruleForm2.verify" placeholder="请输入验证码" @keyup.enter.native="submit"></el-input>
        </el-col>
                  <!-- 验证码 -->
        <el-col :span="8" >
            <div id="v_container"></div>
            <span class="el-form-item__error" v-show="codeTooltip">验证码错误</span>
        </el-col>
        
      </el-form-item>
      <el-form-item>
        <el-button class="sub-button" type="primary" @click="submit" :loading="loading">登陆</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/register">注册</router-link>
      </el-form-item>
  </el-form>
</template>

<script>
import {requestLogin} from '@/api/api'
import GVerify from "@/utils/gVerify.js";
export default {
  name: 'login',
  components: {
    
  },
  data(){
      return{
          
          verifyCode:null,
        codeTooltip:false,
        loading:false,
        ruleForm2: {
          account: '',
          password: '',
          verify:"",
        },
          rules2: {

            account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            verify:[
                { required: true, message: '请输入验证码', trigger: 'blur' },
            ]
          }
      }
  },
  mounted(){
       this.verifyCode = new GVerify("v_container");
  },
  methods:{
      submit(){
          this.$refs.ruleForm2.validate((valid)=>{
            if(valid){
                //this.loading=true;
                this.codeTooltip = false;
                let bool = this.verifyCode.validate(this.ruleForm2.verify);
                if (!bool) {
                    this.loading=false;
                    return (this.codeTooltip = true);
                }
                //var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.password };
                var loginParams={
                  name:this.ruleForm2.account,
                  password:this.ruleForm2.password
                }
                requestLogin(loginParams).then(data => {
                console.log(data)
              // NProgress.done();
              //   let { msg, code, user } = data;
              //   if (code !== 200) {
              //       this.$message({
              //       message: msg,
              //        type: 'error'
              //       });
              //       this.loading=false;
              //   } else {
              //       this.loading=false;
              //       sessionStorage.setItem('user', JSON.stringify(user));
              //       this.$router.push({ path: '/table' });
              //       }
                });
                
            }else{
                
                return false;
            }
          })
      },
  },
  created(){
      sessionStorage.removeItem("user");
  }
}
</script>

<style>
    .login-box{
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .sub-button{
        width: 100%;
    }
    #verifyCanvas{
        height: 40px;
        width: 100%
    }
    #v_container{
        height: 40px;
    }
</style>
