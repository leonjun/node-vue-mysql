<template>
 <el-row class="container">
   <!--顶部-->
     <el-menu  class="el-menu-demo head" background-color="#42b983">
  <el-col :span="5" >
				<div :class="isCollapse?'tools2':'tools'" @click="collapse">
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


 <el-col :span="24" class="main">
   
    <!--左侧导航-->
    <aside :class="isCollapse?'menu-collapsed':'menu-expanded'">

    
    <el-menu  :default-active="this.$route.path" :unique-opened="true"  router  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  @select="handleselect" :collapse="isCollapse">
        <template v-for="(item,index) in this.$router.options.routes" >
          <template v-if="!item.hidden">
          <el-submenu  :index="index+''"  :key="index" v-if="!item.leaf">
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group >
              
              <el-menu-item   v-for="(child,i) in item.children" :index="child.path" :key="i" >
                <span v-if="!child.hidden">{{child.name}}</span>  
              </el-menu-item>
              
            </el-menu-item-group>          
          </el-submenu>          
          <el-menu-item v-if="item.leaf&&item.children.length>0" :key="index" :index="item.children[0].path"><i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span></el-menu-item>
          </template>
        
        </template>

    </el-menu>
    </aside>
    
    <!--右侧内容--> 
    <div :span="24" class="container-box" :class="isCollapse?'right-collapsed':'right-expanded'">
        <el-col :span="24">
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
        </el-col>
      
						
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

    },
    //退出
    logout(){
      let _this=this;
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }) .then(() => {
         sessionStorage.removeItem("user");
        _this.$router.push({path:"/login"})
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
      

    }
  },
  mounted() {
    //console.log(this.$route.path);
    // console.log(this.$router.path);
    let session=sessionStorage.getItem("user");
    
    if(session){
      session=JSON.parse(session);
      console.log(session)
      this.sysName=session.name
      //this.sysImg=session.avatar||"";
      
    }else{
      this.$router.push({ path: '/login' });
    }
    
    
  }
};
</script>

<style lang="scss">
.clear{
  clear: both;
}
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
  width: 150px;
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
  text-align: left;
  height: 60px;
  padding-left: 150px;
  line-height: 60px;
  cursor: pointer;
}
.tools2 {
  text-align: center;
  width: 60px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.container {
  
  width: 100%;
  position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
  
  .content-wrapper{
    box-sizing: border-box;
    
  }
  .main::before{
    display: table;
    content: "";
  }
  .main::after{
    display: table;
    content: "";
  }
  .main {
    position: absolute;
    top: 60px;
    display: flex;
    bottom: 0;
    overflow: hidden;
    
    aside{
      text-align: left;
      .el-menu {
        height: 100%;
      }
      .el-submenu__title i{
        margin-right: 4px;
      }
      .el-menu-item i{
        margin-right: 4px;
      }
    }
    
    .menu-collapsed{
				flex: 0 0 60px;
				width: 60px;
			}
		.menu-expanded{
        flex: 0 0 150px;
				width: 150px;
		}
    .el-submenu{
      .el-menu-item{
        min-width: 150px;
      }
    } 
    
      
    
    .container-box{
      
      padding: 20px;
      background-color: #ffffff;
      flex:1;
      overflow-y: scroll;
    }
    
  }
  .el-submenu__title:hover{
    background-color: #d1dbe5;
  }
  .el-menu-item:hover{
    background-color: #d1dbe5;
  }
  .el-menu-item:focus, .el-menu-item:hover{
     background-color: #d1dbe5;
  }
  
}
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 140px;
}
</style>
