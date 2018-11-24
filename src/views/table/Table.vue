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
					<el-button type="primary" @click="handleAdd">新增</el-button>
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
      prop="age"
      label="年龄"
      sortable
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="birth"
      label="生日"
      sortable
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="addr"
      label="地址"
      sortable
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="编辑" v-show="editshow" :visible.sync="editshow" :close-on-click-modal="false" @close='editClose'>
      <el-form :model="editForm" ref="editForm" class="edit-add" :rules="rule">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="editForm.age" controls-position="right" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker v-model="editForm.birth" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="editCancle('editForm')">取消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="loading">提交</el-button>
			</div>
    </el-dialog>
    <!--编辑弹窗结束-->
    <!--新增弹窗-->
    <el-dialog title="新增" v-show="addshow" :visible.sync="addshow" >
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
				<el-button @click="addshow = false">取消</el-button>
				<el-button type="primary" @click="addSubmit" :loading="loading">提交</el-button>
			</div>
    </el-dialog>
    <!--编辑弹窗结束-->

  </el-col>
  </el-col>
  
</template>

<script>
import util from "@/common/js/util";
//import NProgress from 'nprogress'
import { getUserListPage, removeUser, editUser, addUser,batchRemoveUser } from "@/api/api";
export default {
  data() {
    return {
      pages: {
        page: 1,
        total: 0,
        pagesize: 10,
        name: ""
      },
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
        addr: "",
        age: "",
        birth: ""
      },
      //存放新增数据
      addForm: {
        name: "",
        sex: "",
        addr: "",
        age: "",
        birth: ""
      },
      //表单验证
      rule: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      addrule: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    
    //切换每页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pages.pagesize = val;
      this.getUsers();
    },
    //翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
      console.log(val);
      //this.sels = sels;
    },
    //批量删除
    batchDelete(){
      let ids= this.multipleSelection.map(item =>item.id).toString();
       
      let data={
        ids:ids
      }
      
      this.$confirm("是否删除所选用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }) .then(() => {
          batchRemoveUser(data).then(res => {
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
    //编辑按钮
    handleEdit(index, row) {
      this.editshow = true;
      this.editForm = Object.assign({}, row);

      console.log(this.editForm);
    },
    //编辑提交
    editSubmit() {
      
      
      this.$refs.editForm.validate((valid) =>{
        if(valid){
            this.$confirm("确认提交?", "提示", {}).then(() => {
            let data = Object.assign({}, this.editForm);
            data.birth = (!data.birth || data.birth == '') ? '' : util.formatDate.format(new Date(data.birth), 'yyyy-MM-dd');
            this.loading = true;
            editUser(data).then(res => {
              this.loading = false;

              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.$refs["editForm"].resetFields();//重置
              this.editshow = false;

              this.getUsers();
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
      
    },
    //新增按钮
    handleAdd() {
      this.addshow = true;
      this.addForm={
        name: "",
        sex: "",
        addr: "",
        age: "",
        birth: ""
      }
    },
    //新增提交
    addSubmit() {
      let data = Object.assign({}, this.addForm);
      console.log(data);
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交?", "提示", {}).then(() => {
              let data = Object.assign({}, this.addForm);
              data.birth = (!data.birth || data.birth == '') ? '' : util.formatDate.format(new Date(data.birth), 'yyyy-MM-dd');//日期转换格式
              console.log(data);
              this.loading = true;
              addUser(data).then(res => {
                this.loading = false;

                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                
                this.$refs["addForm"].resetFields();//重置
               // console.log(this.addForm)
                this.addshow = false;

                this.getUsers();
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
    },
    //删除
    handleDelete(index, row) {
      let data = {
        id: row.id
      };
      console.log(row);
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }) .then(() => {
          removeUser(data).then(res => {
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
    
    //获取用户列表
    getUsers() {
      let data = {
        name: this.pages.name,
        page: this.pages.page,
        pagesize: this.pages.pagesize
      };
      this.listLoading = true;
      getUserListPage(data).then(res => {
        console.log(res);
        this.users = res.data.users;
        this.pages.total = res.data.total;
        this.listLoading = false;
      });
    },
    //男女显示
    formatSex(row,column) {
      if(row.sex == 1){
        return "男";
      }else if(row.sex == 2){
        return "女";
        
      }else{
        return "未知"
      }
      //return row.sex == 1 ? '男' : row.sex == 0 ? '女' :  '未知' ;
    },
    refresh(){
      this.$router.push({ path: '/table' });
    }
  },
  mounted() {
    this.getUsers();
  }
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
      float: right;
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
