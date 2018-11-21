<template>
 <div class="head">
     
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#20a0ff"
  text-color="#fff"
  active-text-color="#ffd04b">
  
  
  <el-col :span="4" class="user-info">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">李军leonlonbde</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
	</el-col>
  
</el-menu>


 </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
.head{
  height: 60px;
  line-height: 60px;
}
.user-info {
  float: right;
  color: white;
  .userinfo-inner{
    color: white;
  }
}
</style>
