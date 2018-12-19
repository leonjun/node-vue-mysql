<template>
 <div class="page">
     
     <el-col class="box" >
         
         <el-button @click="isShow = !isShow">click</el-button>
         <transition  name="fade" mode="out-in">
             <p v-if="isShow">123</p>
         </transition>
     </el-col>
     <el-col class="box">
         <el-button class="button" :class="{disabled: !this.canClick}" @click="countDown">{{content}}</el-button>


     </el-col>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
 return {
     isShow:true,
     content: '发送验证码',
     totalTime: 10,
     canClick: true, //添加canClick
        
 }
 },
 components: {

 },
 methods:{
     test:function(){
         alert("--------------");
     },
     countDown () {
        if (!this.canClick){
             return  
        }
        this.canClick = false;
        this.content = this.totalTime + 's后重新发送';
        let clock = window.setInterval(() => {
            this.totalTime--;
            this.content = this.totalTime + 's后重新发送';
            if (this.totalTime < 0) {
                window.clearInterval(clock)
                this.content = '重新发送验证码';
                this.totalTime = 10;
                this.canClick = true;  //这里重新开启
            }
        },1000)
    }
 },
 beforeCreate(){
    console.log( this.$el);
    console.log( this.$data);
    
    console.log("-------------组件创立前，什么都没有");
    
 },
 created(){
   console.log( this.$el);
    console.log( this.$data);
   
    console.log("-------------组件创建，无DOM有data")
    
 },
 beforeMount(){
    console.log( this.$el);
    console.log( this.$data);
   
    console.log("-----------挂载前，无DOM有data");
   
 },
 mounted(){
    console.log( this.$el);
    console.log( this.$data);
    
    
     console.log("----------挂载完成");
     
 },
 beforeUpdate(){
    
     console.log("-------------------beforeUpdate")
 },
 updated(){
     
     console.log("-------------------update");
     
 }
}
</script>

<style scope>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.box{
    padding: 20px 0;
    border-bottom: 1px solid blueviolet;
    border-top: 1px solid blueviolet;
    margin-top: 5px;
}
.disabled{
 background-color: #ddd;
 border-color: #ddd;
 color:#57a3f3;
 cursor: not-allowed; 
}
</style>
