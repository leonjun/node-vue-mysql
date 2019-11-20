<template>
  <el-col>
    <!--搜索框-->
    <el-col :span="24" class="toolbar"> 
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="pages.name" placeholder="输入姓名查询"></el-input>
        </el-form-item>
        <el-form-item>
					<el-button type="primary" @click="getUsers">查询</el-button>
				</el-form-item>
			
        <el-form-item>
					<el-button type="primary" @click="handleAddTest"  >新增</el-button>
           
				</el-form-item>
        
      </el-form>
    </el-col>
  <!--搜索框-->
  <!--表格-->
  <el-col  class="table">
     
    <el-table
    ref="multipleTable"
    :data="users"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    v-loading="listLoading">
    <el-table-column
      type="selection"
      width="55"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
     
      sortable
      >
      
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      
      sortable
      :formatter="formatSex"
      >
    </el-table-column>
    
    <el-table-column
      prop="phone"
      label="电话"
     
      sortable
      >
    </el-table-column>

    <el-table-column
      prop="email"
      label="邮箱"
      show-overflow-tooltip
      sortable
      >
    </el-table-column>


    
    <el-table-column
      prop="address"
      label="地址"
      sortable
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="role"
      label="角色信息"
      sortable
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="add_dt"
      label="注册时间"
      sortable
      
      :formatter="row => formatDate(row, 'add_dt')"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="last_md_dt"
      label="上次修改时间"
      sortable
      
      :formatter="row => formatDate(row, 'last_md_dt')"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column label="操作" width="170">
      <template slot-scope="scope">
       
        <el-button
          size="mini"
          @click="handleEditout(scope.$index, scope.row)">编辑
        </el-button>
       
        <el-button
          v-show="showdel"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
        
        
      </template>
    </el-table-column>
  </el-table>
  <!--表格-->

      <!--分页-->
      <el-col class="pagelist">
        <el-button type="danger" :disabled="multipleSelection.length===0" @click="batchDelete">批量删除</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
       
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.pages.total">
      </el-pagination>
    </el-col>
    <!--分页结束-->
    <!--编辑弹窗-->
    

  </el-col>
  <addtest ref="addtest" v-if="addtestshow" @abd="getUsers"></addtest>
  </el-col>
  
</template>

<script>
import util from "@/common/js/util";
import addtest from "@/components/templete/AddUser";
import {init} from "@/components/templete/AddUser";
//import NProgress from 'nprogress'
import { getUserListPage,batchDelete,deleteUser,userListPage, updateUser, removeUser, editUser, addUser,batchRemoveUser } from "@/api/api";
export default {
  components:{
    addtest
  },
  data() {
    return {
      addtestshow:false,
      pages: {
        page: 1,
        total: 0,
        pagesize: 10,
        name: ""
      },
      showdel:false,
      multipleSelection:[],
      listLoading: false, //列表loading
      users: [], //用户列表数据
      editshow: false, //编辑窗口显示隐藏
      loading: false, //编辑提交按钮loading
      addshow: false, //新增窗口显示隐藏
      //存放编辑数据
      editForm: {
        id: "",
        name: "",
        sex: "",
        address: "",
        phone: "",
        email: ""
      },
      //存放新增数据
      addForm: {
        name: "",
        sex: "",
        address: "",
        phone: "",
        email: ""
      },
      //表单验证
      rule: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      addrules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    
    //切换每页显示条数
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pages.pagesize = val;
      this.getUsers();
    },
    //翻页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.pages.page = val;
      this.getUsers();
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
    //批量删除
    batchDelete(){
      
      

      let session=sessionStorage.getItem("user");
      session=JSON.parse(session);
      
      let id= this.multipleSelection.map(item =>item.id);
      let ids=id.filter(item => item!=session.id)
      let datas={
        ids:ids
      }
     // let data=datas.names.split(",")
     this.deleteUser(datas)
      
    },
    deleteUser(param){
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }) .then(() => {
          batchDelete(param).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });

            this.getUsers();
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
      });

    },
    //编辑关闭X
    editClose(){
      this.editshow=false;
      this.$refs.editForm.resetFields();
    },
    //编辑取消
    editCancle(rel){
      this.editshow=false;
      this.$refs[rel].resetFields();
    },
    //编辑按钮（外部页面）
    handleEditout(index, row){
      //console.log(row)
      this.addtestshow=true;
      this.$nextTick(()=>{
        
        this.$refs.addtest.init();
        this.$refs.addtest.isAdd=false;
        this.$refs.addtest.imageUrl=row.imgsrc;
        this.$refs.addtest.addForm=Object.assign({}, row);
      })
    },
    
    //删除
    handleDelete(index, row) {
      let session=sessionStorage.getItem("user");
      session=JSON.parse(session);

      if(session.name == row.name){
        this.$message({
            type: "error",
            message: "不能删除本人!"
        });
        return
      }
      if(session.level>row.level){
        this.$message({
            type: "error",
            message: "不能删除级别比你高的人!"
        });
        return
      }

     
      let datas={
        ids:[row.id]
      }
      this.deleteUser(datas)
      // let data = {
      //   id: row.id
      // };
      
      
    },
    
    //获取用户列表
    getUsers(v) {
      let data = {
        name: this.pages.name,
        page: this.pages.page,
        pagesize: this.pages.pagesize
      };
      this.listLoading = true;
      
      userListPage(data).then(res => {
        // console.log(1)
        // let session=sessionStorage.getItem("user");
        // session=JSON.parse(session);
        this.users = res.data.data;
        // this.users=this.users.filter(item=>{
        //   return item.id!=session.id;
        // })
       
        this.pages.total = res.data.total;
        this.listLoading = false;
      }).catch(err=>{
        this.listLoading = false;
      });
    },
    //男女显示
    formatSex(row){
      
      if(row.sex =="1"){
        return "男";
      }else if(row.sex == "0"){
        return "女";       
      }else{
        return "未知"
      }
      //return row.sex == 1 ? '男' : row.sex == 0 ? '女' :  '未知' ;
    },
    refresh(){
      this.$router.push({ path: '/table' });
    },
    //新增引外部页面
    handleAddTest(){
      
      this.addtestshow=true;
      this.$nextTick(()=>{
        
        this.$refs.addtest.init();
        this.$refs.addtest.isAdd=true;
       
       
        this.$refs.addtest.imageUrl="";
        this.$refs.addtest.addForm={
            name: "",
            sex: "",
            address: "",
            imgsrc:""
            //age: "",
            //birth: ""
        }
      })
    },
    
    //换算时间
    formatDate(row, dt) {

      let dat;
      
      
      let _this=this;
      if(dt === "add_dt" && row.add_dt ){
        dat=row.add_dt;
        var date = new Date(dat);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
      }
      if(dt==="last_md_dt" &&row.last_md_dt){
         dat=row.last_md_dt;
         var date = new Date(dat);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
      } 
      
    }
  },
  mounted() {
    this.getUsers();
    let session=sessionStorage.getItem('user');
    session=JSON.parse(session)
    if(session.level>1){
      this.showdel=false
    }else{
      this.showdel=true
    }
  },
};
</script>

<style lang="scss">
.table {
  border: 1px solid rgba(128, 128, 128, 0.3);
  margin-top: 15px;
  .pagelist{
    background-color: #f2f2f2;
    padding: 10px;
    text-align: left;
    .el-pagination{
      float: left;
    }
  }
}
.toolbar {
  text-align: left;
  background-color: #f2f2f2;
  padding: 10px;
  margin-top: 20px;
  .el-form--inline {
    .el-form-item {
      margin-bottom: 0;
      
    }
  }
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
