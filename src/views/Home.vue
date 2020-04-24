<template>
 <el-row class="container">
   <!--顶部-->
    <div class="head">
      
      <div :class="isCollapse?'logo2':'logo'">logo</div>
      <div class="top-nav">

        <div>
          <div :class="isCollapse?'tools2':'tools'" @click="collapse">
              <i :class="isCollapse?'fa fa-outdent':'fa fa-indent'"></i>
          </div>
        </div>
        <div class="user-info">

          <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">{{sysName}}<img class="user-photo" :src="img"/></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </div>
        

      </div>
    </div>
     <!-- <el-menu  class="el-menu-demo" background-color="#42b983">
      
      <el-col :span="5" >
            <div :class="isCollapse?'tools2':'tools'" @click="collapse">
              <i class="fa fa-align-justify"></i>
            </div>
      </el-col>
      
      <el-col :span="4" class="user-info">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">{{sysName}}<img class="user-photo" :src="img"/></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
      </el-col>
  
    </el-menu> -->


 <el-col :span="24" class="main">
   
    <!--左侧导航-->
    <aside :class="isCollapse?'menu-collapsed':'menu-expanded'">

    
    <el-menu  :default-active="this.$route.path" :unique-opened="true"  router  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  @select="handleselect" :collapse="isCollapse">
        
        <template v-for="(item,index) in routes" >
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
  <footer>
    <a href="http://beian.miit.gov.cn/" target="_blank" class="item">蜀ICP备19037277号-1</a>
  </footer>
 </el-row>
</template>

<script>
//import {mapActions,mapGetters} from 'vuex';
export default {
  data() {
    return {
      //activeIndex: "this.$route.path",
      //activeIndex2: "1",
      isCollapse: false,
      sysName:"",
      sysImg:"",
     
      routes:[]
    };
  },
  methods: {
   // ...mapActions(['changeImg']),
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
      

    },
    
  },
  computed:{
    img(){
      
      let session=sessionStorage.getItem("user");
    
      if(session){
        session=JSON.parse(session);
        
        this.sysName=session.name;
        var srcs=this.$store.getters.getImgsrc;
        
        if(srcs=="" || srcs==null){
          srcs=session.imgsrc||""
          this.sysImg=srcs;
        
        }else{
          this.sysImg=srcs;
        }
        
        
        return this.sysImg
      }
    }
  },
  mounted() {
    
    
    this.routes=this.$router.options.routes;
    let session=sessionStorage.getItem("user");
    let routers=this.routes;
    routers=routers.filter(o=>!o.hidden);
    
    
    if(session){
      session=JSON.parse(session);
      
      this.sysName=session.name;
      if(session.id!="999999"){
        
        let r1=routers.filter(a=>!a.leaf);
        let r2=routers.filter(a=>a.leaf);
        for(var i=0;i<r2.length;i++){
          r2[i].children=r2[i].children.filter(c=>c.name!="富文本");
          r2[i].children=r2[i].children.filter(c=>c.name!="富文本列表")
        }
        
        this.routes=[...r1,...r2];
      }
      console.log(this.routes)
      this.userId=session.id;
      this.isId= (this.userId==this.iddd);


      var srcs=this.$store.getters.getImgsrc;
     
      if(srcs=="" || srcs==null){
        srcs=session.imgsrc||""
        this.sysImg=srcs;
        
      }else{
         this.sysImg=srcs;
      }
      
     
     
      
    }else{
      this.$router.push({ path: '/login' });
    }
   
    
  }
};
</script>

<style lang="scss">
footer{
    position: absolute;
    bottom: 0;
    text-align: right;
    width: 100%;
    a{
      color:rgba(0,0,0,0.3);
      text-decoration: none;
    }
}
.clear{
  clear: both;
}
.head {
  background-color: #b512a2;
  height: 60px;
  line-height: 60px;
  display: flex;
  flex:1;
  width:100%;
  color: white;
  .top-nav{
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
  .logo{
    width: 150px;
  }
  .logo2{
    width:64px;
  }
}
.user-info {
  float: right;
  color: white;
  margin-right: 40px;
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
    
  }
}
.el-menu {
  
  padding-left: 0;
}

.tools {
  text-align: center;
  height: 60px;
  width: 60px;
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
      
      flex:1;
      overflow-y: scroll;
    }
    
  }
  
 
  
  
}
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 140px;
}
</style>
