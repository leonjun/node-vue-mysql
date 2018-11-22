<template>
 <el-row class="container">
   <!--顶部-->
     <el-menu class="el-menu-demo head" background-color="#20a0ff">
  <el-col :span="10">
				<div class="tools" @click="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
	</el-col>
  
  <el-col :span="4" class="user-info">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">{{sysName}}<img class="user-photo" :src="sysImg"/></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
	</el-col>
  
</el-menu>

<!--左侧导航-->
 <el-col :span="24" class="main" >
 
    <aside>

    
    <el-menu :default-active="this.$route.path"  router  class="el-menu-vertical-demo el-left-menu" @open="handleOpen" @close="handleClose"  @select="handleselect" :collapse="isCollapse">
        <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
          <el-submenu  :index="index+''"  :key="index" v-if="!item.leaf">
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group >   
              <el-menu-item   v-for="(child,i) in item.children" :index="child.path" :key="i" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-menu-item-group>          
          </el-submenu>          
          <el-menu-item v-if="item.leaf&&item.children.length>0" :key="index" :index="item.children[0].path"><i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span></el-menu-item>
        </template>

    </el-menu>
    </aside>
    <!--右侧内容--> 
    <div class="container-box">
      <div>
        <!--<strong class="title">{{$route.name}}</strong>-->
						<el-breadcrumb separator="/">

							<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" >
                {{ item.name }}
								
							</el-breadcrumb-item>
						</el-breadcrumb>

            
			
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
      
						
    </div>
    
  
</el-col> 

 </el-row>
</template>

<script>
export default {
  data() {
    return {
      //activeIndex: "this.$route.path",
      //activeIndex2: "1",
      isCollapse: false,
      sysName:"",
      sysImg:"",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    collapse: function() {
      this.isCollapse = !this.isCollapse;
    },
    handleselect:function(){

    }
  },
  mounted() {
    //console.log(this.$route.path);
    // console.log(this.$router.path);
    let session=sessionStorage.getItem("user");
    if(session){
      session=JSON.parse(session);
      console.log(session);
      this.sysName=session.name||"";
      this.sysImg=session.avatar||"";
      console.log(this.sysName)
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
  .user-photo{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-top: 10px;
    margin-left: 10px;
    float:right;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  .el-menu {
    height: 100%;
    background-color: #e4e8f1;
  }
}
.el-menu {
  background-color: #eef1f6;
  padding-left: 0;
}
.tools {
  padding: 0px 23px;
  width: 14px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .main {
    height: 100%;
    display: flex;
    aside {
      .el-menu {
        height: 100%;
      }
    }
    .container-box{
      width: 100%;
      padding: 20px;
    }
  }
  .el-submenu__title:hover{
    background-color: #d1dbe5;
  }
  .el-menu-item:focus, .el-menu-item:hover{
    background-color: #d1dbe5;
  }
}
</style>
