<template>
 
     <!--新增弹窗-->
    <el-dialog :title="isAdd?'新增':'编辑'"  :visible.sync="showshow" @close="close">
      <el-form :model="addForm" ref="addForm" class="edit-add" :rules="addrule">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
						<el-radio class="radio" label="1">男</el-radio>
						<el-radio class="radio" label="0">女</el-radio>
					</el-radio-group>
        </el-form-item>

        <el-form-item label="角色" v-show="addForm.level!=1">
          <el-radio-group v-model="addForm.level">
						<el-radio class="radio" label="2">管理员</el-radio>
						<el-radio class="radio" label="3">用户</el-radio>
					</el-radio-group>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="imgsrc">
         
          <el-upload
            name="file"
            class="avatar-uploader"
            action="http://localhost:8080/api/user/img"
            accept="image/*"
            :show-file-list="false"
            :on-remove="remove"
            :on-error="error"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            :on-change="onChangeUpload"
            :data="uploadData">
            
            <img v-if="imageUrl " :src="imageUrl" class="avatar">
           
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        

        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="cancle">取消</el-button>
				<el-button type="primary"  @click="submit" :loading="loading">提交</el-button>
			</div>
    </el-dialog>
    <!--编辑弹窗结束-->
 
</template>

<script>
import {mapActions} from 'vuex';
import util from "@/common/js/util";
import {updateUser, addUser ,upload} from "@/api/api";
//import {getUsers} from "@/views/table/Table"
 export default {
   //props:["abdc"],
   data () {
     var validatePass = (rule, value, callback) => {
       
        if (value == "" || value==undefined) {
          callback(new Error('请输入密码'));
          return;
        } 
        else {
          
          if(value.length<6){
             callback(new Error('密码长度最少6位'));
          }
          // if (this.ruleForm.checkPass !== '') {
          //   this.$refs.ruleForm.validateField('checkPass');
          // }
         
          callback();
        }
      };
      var validatePhone=(rule,value,callback)=>{
        var flag=/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/.test(value);
        
        if(!flag){
          callback(new Error('请输入正确格式的手机号'))
        }else{
          callback()
        }
      }
     return {
       uploadData:{},
       imageUrl:"",
      loading:false,
      showshow:false,
      addshow:false,
     // imgsrc:"",
      isAdd:true,
         //存放新增数据
      addForm: {
        imgsrc:"",
        password:"",
      },
      
      addrule: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password:[{required: true, validator: validatePass, trigger:['blur', 'change']  }],
        email:[ { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        phone:[ {required: true,validator:validatePhone, trigger: ['blur', 'change'] }],
      }
     }
   },
   methods:{
     close:function(){
       
       this.$refs["addForm"].resetFields();
       this.imageUrl="";
     },
     cancle:function(){
       this.showshow=false;
       this.$refs["addForm"].resetFields();
       this.imageUrl="";
     },
     handleAvatarSuccess(res, file) {
      this.addForm.imgsrc=file.response.data;
      this.imageUrl = URL.createObjectURL(file.raw);
       this.$message({
                  type: "success",
                  message: "上传成功!"
      }); 
      },
      error:function(){
        this.$message.error('上传失败');
      },
      
     ...mapActions(['changeImg']),
       init(){
           this.showshow=true;
           this.$nextTick(()=>{
             
           });
       },
      
      
      beforeUpload(file){
       
        const isLt2M = file.size / 1024 / 1024 < 2;

       
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        
        return isLt2M;
      },
      remove(){
      
        this.addForm.imgsrc="";
      },
      onChangeUpload(file){
        
      },
      
      
      submit() {
      
      let data = Object.assign({}, this.addForm);
     
      if(this.isAdd){
          this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交?", "提示", {}).then(() => {
              let data = Object.assign({}, this.addForm);
              
              data.password=this.addForm.password;
              //data.birth = (!data.birth || data.birth == '') ? '' : util.formatDate.format(new Date(data.birth), 'yyyy-MM-dd');//日期转换格式
              
              this.loading = true;
              addUser(data).then(res => {
                this.loading = false;
               
                if(res.data.BK_STATUS!="00"){
                  this.$message({
                  type: "error",
                  message: res.data.msg
                  });

                  return ;
                }
                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                this.changeImg(this.addForm.imgsrc);
                this.$refs["addForm"].resetFields();//重置
                this.imageUrl="";
               // console.log(this.addForm)
                this.showshow = false;
                this.remove();
                this.$emit('abd');
              }).catch(err=>{
                this.loading = false
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消新增"
              });
            });
        } else {
          return false;
        }
      });
      }else{
        
        this.$refs.addForm.validate((valid) =>{
        if(valid){
            this.$confirm("确认提交?", "提示", {}).then(() => {
            let data = Object.assign({}, this.addForm);

            
            
            //data.birth = (!data.birth || data.birth == '') ? '' : util.formatDate.format(new Date(data.birth), 'yyyy-MM-dd');
            this.loading = true;
            
            updateUser(data).then(res => {
              this.loading = false;

              this.$message({
                type: "success",
                message: "修改成功!"
              });
              
              this.changeImg(this.addForm.imgsrc);
              this.imageUrl="";
              this.$refs["addForm"].resetFields();//重置
               //console.log(this.addForm)
              this.showshow = false;
              this.remove();
              this.$emit('abd');
            });
          })
          .catch(() => {
            
            this.$message({
              type: "info",
              message: "已取消修改"
            });
          });

        }else{
          return false;
        }
      })
      }
      
    },
   },
   mounted(){
     
   }
 }
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
 .is-success .el-input__inner{
   border-color:green
 }
</style>
