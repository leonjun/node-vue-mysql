<template>
 
     <!--新增弹窗-->
    <el-dialog :title="isAdd?'新增':'编辑'"  :visible.sync="showshow" >
      <el-form :model="addForm" ref="addForm" class="edit-add" :rules="addrule">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
						<el-radio class="radio" label="1">男</el-radio>
						<el-radio class="radio" label="0">女</el-radio>
					</el-radio-group>
        </el-form-item>

        <el-form-item label="角色">
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
          <el-upload name="test" :on-remove="remove" :on-change="onChangeUpload" :limit="1" :before-upload="beforeUpload" :auto-upload="false" action="http://localhost:8080/api/user/img"  accept="image/*"  :on-success="success">
            <el-button type="primary">选择图片</el-button>
          </el-upload>
          <el-button @click="tijiao">ok</el-button>

        </el-form-item>

        

        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="showshow = false">取消</el-button>
				<el-button type="primary"  @click="submit" :loading="loading">提交</el-button>
			</div>
    </el-dialog>
    <!--编辑弹窗结束-->
 
</template>

<script>
import util from "@/common/js/util";
import {updateUser, addUser ,upload} from "@/api/api";
//import {getUsers} from "@/views/table/Table"
 export default {
   //props:["abdc"],
   data () {
     return {
       
      loading:false,
      showshow:false,
      addshow:false,
      isAdd:true,
         //存放新增数据
      addForm: {
        imgsrc:"",
        password:"",
      },
      
      addrule: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
     }
   },
   methods:{
       init(){
           this.showshow=true;
           this.$nextTick(()=>{
             ///console.log(this.addForm)
              //console.log("131231232")
           });
       },
      success(file){
      
      },
      
      beforeUpload(file){
        var size=file.size/1024/1024;
        if(size>1){
          
          return false;
        }
      },
      remove(){
      
        this.addForm.imgsrc="";
      },
      onChangeUpload(file){
        this.addForm.imgsrc=file.raw;
      
      },
      tijiao(){
        
        var imgsrc=this.addForm.imgsrc;
        if(imgsrc){
          var size=imgsrc.size/1024/1024;
          if(size>1){
            alert("图片尺寸最大1兆")
            return false;
          }
          var formData= new FormData();
          formData.append('test',imgsrc);
          upload(formData).then(res=>{
                this.$message({
                  message:"上传成功"
                })
              }).catch(err=>{
                console.log(err)
          })
        }else{
          this.$message({
              message:"请选择图片"
          })
        }
        
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
                
                this.$refs["addForm"].resetFields();//重置
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
              this.$refs["addForm"].resetFields();//重置
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

 
</style>
