<template>
 <div class="head">
     
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#42b983"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>
  
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
.head {
  height: 60px;
  line-height: 60px;
}
.user-info {
  float: right;
  color: white;
  .userinfo-inner {
    color: white;
    cursor: pointer;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
