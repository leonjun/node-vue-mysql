<template>
  <el-col class="table">
    <el-table
    ref="multipleTable"
    :data="users"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
      
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      :formatter="formatSex"
      >
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="birth"
      label="生日"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
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



      <div class="block">
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </el-col>
  
  
</template>

<script>
import util from '@/common/js/util'
	//import NProgress from 'nprogress'
import { getUserListPage} from '@/api/api';
export default{
  data(){
    return{
      currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
      users: [/*{
          date: '2016-05-03',
          name: '王小虎',
          sex:"女",
          age:"15",
          address: '上海市普陀区金沙江路 1518 弄'
        },{
         date: '2016-05-03',
          name: '王小虎',
          sex:"女",
          age:"15",
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          sex:"女",
          age:"15",
          address: '上海市普陀区金沙江路 1518 弄'
        }*/]
    }
  },
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row){
        console.log(row)
      },
      getUsers(){
        let data={
          page:1
        };
        getUserListPage(data).then((res) =>{
          this.users = res.data.users;
        })
      },
      formatSex(row){
          return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      }
    },
    mounted(){
      this.getUsers();

    }
}
</script>

<style lang="scss">
.table{
  border: 1px solid rgba(128, 128, 128,0.3);
  margin-top: 15px;
}
</style>
