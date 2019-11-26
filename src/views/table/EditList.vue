<template>
  <div>
      <ul v-if="haslist" class="fwblist">
          <li v-for="item in list" :key="item.id">
              <h3>{{item.title}}</h3>
              <p v-html="item.container">{{item.container}}</p>
              <el-button type="primary" @click.native="deletefwb(item.id)">删除</el-button>
          </li>
      </ul>
      <ul v-else>
          <p>暂无数据</p>
          
      </ul>
      <!--分页-->
      <el-col class="pagelist">
       
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.pages.total">
        </el-pagination>
      </el-col>
  </div>
  
</template>

<script>
import {deletefwb, fwblist} from "@/api/api";

export default {
  components:{
    
  },
  data() {
    return {
      listLoading:false,
      haslist:false,
      list:[],
      pages: {
        page: 1,
        total: 0,
        pagesize: 10,
        
      },
    }
  },
  methods: {
    
    //切换每页显示条数
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pages.pagesize = val;
      this.getList();
    },
    //翻页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.pages.page = val;
      this.getList();
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选中某行
    handleSelectionChange(val) {
      this.multipleSelection = val;
      
      //this.sels = sels;
    },
   
    deletefwb:function(e){
        
        let data={
            id:e
        };
        this.listLoading = true;
      
        deletefwb(data).then(res => {
            
            this.$message({
                  type: "success",
                  message: "成功"
                });
             this.getList();
            this.listLoading = false;
        }).catch(err=>{
            this.listLoading = false;
        });
    },
    
    
    //获取列表
    getList() {
      let data = {
        
        page: this.pages.page,
        pagesize: this.pages.pagesize
      };
      this.listLoading = true;
      
      fwblist(data).then(res => {
         
        if(res.data.data==""){
            this.haslist=false;
            this.listLoading = false;
            return
        }
        this.haslist=true;
        this.list = res.data.data;
        this.listLoading = false;
       
        this.pages.total = res.data.total;
        
      }).catch(err=>{
        this.listLoading = false;
      });
    },
    
  
    
    
    
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scope>
.fwblist li{
    list-style: none;
    padding: 20px;
    margin-top: 20px;
    background-color: rgba(181, 18, 162,0.05);
    text-align: left;
    box-shadow: 2px 2px 9px 2px rgb(181, 18, 162)
}
</style>
