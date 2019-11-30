import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Table from "./views/table/Table";
//import Form from "./views/table/Form";
import Login from "./views/Login";
import Echart from "./views/table/Echarts";
import Vuex from "@/views/vuex/components/vuex";
import LifeCycle from "./views/table/LifeCycle";
import Promise from "./views/table/Promise";
import Form from "./views/table/Form";
import EditList from "./views/table/EditList";
import notFound from './views/table/404'

//import AddUser from "./views/AddUser";
//import Register from "./views/Register";

Vue.use(Router);

export default new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      hidden: true,
      component:Login
    },
    {
      path: "/",
      name: "",
      hidden: true,
      redirect: { name: "login" }
    },
    // {
    //   path: "/adduser",
    //   name: "adduser", 
    //   hidden:true,
    //   component:AddUser
    // },
    // {
    //   path: "/register",
    //   name: "register", 
    //   hidden:true,
    //   component:Register
    // },
    {
      path: "/",
      component: Home,
      name: "table",
      iconCls: "fa fa-table", //图标样式class

      children: [
        { path: "/vuex", component: Vuex, name: "vuex" },
        { path: "/table", component: Table, name: "Table" }
        
      ]
    },
    {
      path: "/",
      component: Home,
      name: "生命周期",
      iconCls: "fa fa-id-card-o",
      children: [
        //{ path: "/page4", component: Form, name: "页面4" },
        { path: "/LifeCycle", component: LifeCycle, name: "LifeCycle" }
      ],
      // beforeEnter:(to,from,next)=>{
      //   console.log(to);
      //   console.log(from);
      //   console.log(next);
      // }
    },
    {
      path: "/",
      component: Home,     
      iconCls: "fa fa-file", //图标样式class
      leaf:true,
      children: [
        { path: "/promise", component: Promise, name: "Promise" ,leaf:true,},
        
      ]
    },
    {
      path: "/",
      component: Home,     
      iconCls: "fa fa-file", //图标样式class
      leaf:true,
      children: [
        { path: "/tinymce", component: Form, name: "富文本" ,leaf:true,},
        
      ]
    },
    {
      path: "/",
      component: Home,     
      iconCls: "fa fa-file", //图标样式class
      leaf:true,
      children: [
        { path: "/editlist", component: EditList, name: "富文本列表" ,leaf:true,},
        
      ]
    },
    {
      path: "/",
      component: Home,     
      iconCls: "fa fa-bar-chart", //图标样式class
      name:"eCharts",
      children: [
        { path: "/echart", component: Echart, name: "eCharts"},
        
      ]
    },
    
    {
      path: "/404",
      name: "notFound",
      component: notFound,
      hidden: true,
      }, 
      {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404",
      hidden: true,
      }
  ]
});
