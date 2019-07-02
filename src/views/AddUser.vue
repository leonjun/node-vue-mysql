<template>
 <div>
     <form>
         <input type="password" v-model="user.password" />
         <input v-model="user.name" />
         <button @click="adduser">submit</button>
         <button @click="query">query</button>
     </form>
 </div>
</template>

<script>

 export default {
   data () {
     return {
         user:{
            password:"",
            name:""
         }
         
     }
   },
   methods:{
       adduser(){
           var _this=this;
           this.$axios.post('/api/user/queryUser',{
               name:_this.user.name
           }).then((res)=>{
               if(res.data!=""){
                   alert("用户已存在")
                   return
               }else{
                    this.$axios.post('/api/user/addUser',{
                        name:_this.user.name,
                        password:_this.user.password
                    }).then((res)=>{
                        console.log(res)
                    }).catch((err)=>{
                        console.log(err)
                    })
               }
           }).catch((err)=>{
               console.log(err)
           })

          
       },
       query(){
           var _this=this
           
       }
   },
   components: {

   }
 }
</script>

<style>

 
</style>
