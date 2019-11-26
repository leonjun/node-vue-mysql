<template>
    <div class="tinymc-box">

        <el-form class="edit-add">
            <el-form-item label="标题">
                
                <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="内容">

                <TinymceEditor v-model="container"> 
                </TinymceEditor>

            </el-form-item>


        </el-form>
        <div>
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
//import TinymceEditor from '@/components/tiny-editor'
//import TinymceEditor from '@/components/tiny-editor'
import TinymceEditor from '@/components/Tinymce'
import {addfwb} from "@/api/api";
export default {
  components:{
      TinymceEditor
  },
  data(){

      return{
          title:"",
          container:""
      }
  },
  methods:{
      submit:function(){
          var activeEditor = tinymce.activeEditor;
          var editBody = activeEditor.getBody();
          activeEditor.selection.select(editBody);
          var t = activeEditor.selection.getContent( { 'format':'text'} );//未带标签的文本
          var text = activeEditor.selection.getContent();
          let data = {       
                title:this.title ,
                container: text
            };
            if(data.title=="" || t==""){
                this.$message({
                  type: "error",
                  message: "不能为空"
                  });
                return
            }
            this.listLoading = true;
            
            addfwb(data).then(res => {
                
              this.$message({
                  type: "success",
                  message: "成功"
                });
               this.title="";
               this.container="";
                this.listLoading = false;
            }).catch(err=>{
                this.listLoading = false;
            });  
      }
  }
}
</script>
<style lang="scss" scoped>
.tinymc-box{
    margin-top: 20px;
}
.edit-add {
  .el-form-item__label {
    float: left;
    text-align: right;
    width: 80px;
  }
  .el-form-item__content {
    margin-left: 80px;
    text-align: left;
  }
}
</style>
