<template>
  <el-row :loading="listLoading">
            
            <el-col :span="24" >
                <div id="userInfo" style="width:100%; height:400px;"></div>
            </el-col>
            
        </el-row>
</template>

<script>
 import echarts from 'echarts'
import util from "@/common/js/util";
import { getUserList,getUserListPage} from "@/api/api";
export default {
 data() {
 return {
     page:1,
     pagesize:10,
     users:[],
    total:0,
    name:"",
     listLoading:false
 }
 },
 components: {

 },
 methods:{
     getUsers() {
      let data = {
        name:this.name,       
        page: this.page,
        pagesize: this.pagesize,
        total:this.total
      };
      this.listLoading = true;
      getUserList(data).then(res => {
        //console.log(res);
        this.users = res.data.users;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    usersChart() {
                this.chartColumn = echarts.init(document.getElementById('userInfo'));
                let names = this.users.map(item => item.name);
                //console.log("-------");
                 //console.log(this.users);
                //console.log(names);
                let ages =this.users.map(item => item.age);
                this.chartColumn.setOption({

                  title: { text: '用户年龄' },
                  tooltip: {},
                  
                  xAxis: {
                      //data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                      data:names
                  },
                  yAxis: {},
                  series: [{
                      name: '',
                      type: 'bar',
                     // data: [5, 20, 36, 10, 10, 20]
                     data:ages
                    }]
                });
    },
    
 },
 mounted() {
    //console.log(this.$route.path);
    // console.log(this.$router.path);
    // let session=sessionStorage.getItem("user");
    // if(session){
    //   session=JSON.parse(session);
    //   console.log("adfsadf"+session);
     
    // }
    this.getUsers();
    
  },
  updated(){
      this.usersChart();
  }
}
</script>

<style>
</style>
