<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="login-box">
      <h3>登陆系统</h3>
      <el-form-item prop="account">
        <el-input :model="ruleForm2.account" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" :model="ruleForm2.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="sub-button" type="primary" @click="submit">登陆</el-button>
      </el-form-item>
  </el-form>
</template>

<script>


export default {
  name: 'login',
  components: {
    
  },
  data(){
      return{
        ruleForm2: {
          account: '123',
          password: '123123'
        },
          rules2: {

            account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ]
          }
      }
  },
  methods:{
      submit(){
          this.$refs.ruleForm2.validate((valid)=>{
            if(valid){
                alert("success")
            }else{
                alert("没验证")
                return false;
            }
          })
      }
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
</style>
