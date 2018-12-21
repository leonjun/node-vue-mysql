<template>
 <div class="page">
     <el-input  v-model="name" @blur="check" placeholder="123abc=true"></el-input>
 </div>
</template>

<script>
export default {
 data() {
 return {
     name:""
 }
 },
 methods:{
     tpromise(){
         var p = new Promise(function(resolve, reject){
    //做一些异步操作
        setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            if(num<5){
                resolve('随便什么数据'+num);
                console.log('执行完成');
            }else{
                reject("数字太大"+num)
            }                      
            }, 2000);
        });
        return p;
     },
     checkHas(){
        var aa=this.name;                        
        const promise = new Promise(function(resolve,reject) {
        if(aa=='123abc'){
                resolve(true);
        }else{
                reject(false);               
              }
        })            
        return promise;         
    },
    
    check(){
        this.checkHas().then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    }
 },
 components: {

 },
 created(){
    // this.tpromise().then((data)=>{
    //     console.log(data)
    // },(err) =>{
    //     console.log(err)
    // }).then( ()=> {
    //     console.log("test test")
    // })
    this.tpromise().then((data)=>{
        console.log(this.tpromise)
        console.log(data)
    }).catch((error)=>{
        console.log(this.tpromise)
        console.log(error)
    });
   
 }
}
</script>

<style>
</style>
