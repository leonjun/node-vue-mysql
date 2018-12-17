<template>
 <div>
     <el-col :span="24" class="toolbar">
        <el-form :inline="true" style="text-align:center">
            <el-form-item>
                <el-input size="medium" v-model="todotext"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="addTodo">新增</el-button>
                
            </el-form-item>
        </el-form>
     </el-col>
     <el-col>
         <div class="clearfix" v-for="(item,index) in getTodoLists" :key="index">
             <el-col :span="12">
                  <span v-show="!item.isEdit"> {{item.text}}</span>
                <input v-show="item.isEdit" v-model="item.text" />
             </el-col>
            <el-col :span="12">
                <el-button v-show="!item.isEdit &&!item.isDone" size="small" @click="editTodo(item)">修改</el-button>
                <el-button v-show="item.isEdit &&!item.isDone" size="small" @click="okTodo(item)">确认</el-button>
                <el-button v-show="!item.isDone" size="small" @click="done(item)">完成</el-button>
            </el-col>
            
        </div>

     </el-col>
    <el-col>
        <el-button :class="{'activeType':select=='1'}" @click="change('1')">全部</el-button>
        <el-button :class="{'activeType':select=='2'}" @click="change('2')">已完成</el-button>
        <el-button :class="{'activeType':select=='3'}" @click="change('3')">未完成</el-button>
    </el-col>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         todotext:"",
         
     }
   },
   components: {

   },
   methods:{
       change:function(i){
           this.$store.dispatch("selectType",i);
       },
       addTodo:function(){
           if(this.todotext != ""){
               this.$store.dispatch("addTodo",this.todotext);
                this.todotext="";
           }
           
       },
       editTodo:function(item){
           item.isEdit=true;
       },
       done:function(item){
           this.$store.dispatch("doneTodo",item.id);
       },
       okTodo:function(item){
           item.isEdit=false;
       }
   },
   computed:{
       getTodoLists:function(){
          
           let select= this.$store.state.todo.selects;
           console.log(select)
           if(select=="1"){
               return this.$store.state.todo.todoInfos;
           }else if(select =="2"){
               return this.$store.getters.getDoneLists;

           }else if(select =="3"){
                return this.$store.getters.getNoDoneLists;
           }
           
       },
       select:function(){
           return  this.$store.state.todo.selects;
       }

   }
 }
</script>

<style scoped>
.activeType{
    background-color: #42b983 !important;
    color: white !important;
}
 input{
     line-height: 30px;
     border-color: #dcdfe6;
     outline: none;
     border: 1px solid #dcdfe6;
     padding: 0 4px;
     background: none;
    text-align: center;
 }
 .clearfix{
     width: 50%;
     margin: 0 auto;
     overflow: hidden;
 }
 .clearfix >div{
     margin: 6px 0;
     line-height: 32px;
 }
</style>
