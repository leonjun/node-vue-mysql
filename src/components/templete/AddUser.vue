<template>
 
     <!--新增弹窗-->
    <el-dialog :title="isAdd?'新增':'编辑'"  :visible.sync="showshow" >
      <el-form :model="addForm" ref="addForm" class="edit-add" :rules="addrule">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="addForm.age" controls-position="right" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker v-model="addForm.birth" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
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
import {editUser, addUser } from "@/api/api";
//import {getUsers} from "@/views/table/Table"
 export default {
   props:["abdc"],
   data () {
     return {
      loading:false,
      showshow:false,
      addshow:false,
      isAdd:true,
         //存放新增数据
      addForm: {
        name: "",
        sex: "",
        addr: "",
        age: "",
        birth: ""
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
              console.log("131231232")
           });
       },
      submit() {
      let data = Object.assign({}, this.addForm);
     
      if(this.isAdd){
          this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交?", "提示", {}).then(() => {
              let data = Object.assign({}, this.addForm);
              data.birth = (!data.birth || data.birth == '') ? '' : util.formatDate.format(new Date(data.birth), 'yyyy-MM-dd');//日期转换格式
              
              this.loading = true;
              addUser(data).then(res => {
                this.loading = false;

                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                
                this.$refs["addForm"].resetFields();//重置
               // console.log(this.addForm)
                this.showshow = false;

                this.$emit('abd');
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
            data.birth = (!data.birth || data.birth == '') ? '' : util.formatDate.format(new Date(data.birth), 'yyyy-MM-dd');
            this.loading = true;
            
            editUser(data).then(res => {
              this.loading = false;

              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.$refs["addForm"].resetFields();//重置
              this.showshow = false;

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
   }
 }
</script>

<style>

 
</style>
