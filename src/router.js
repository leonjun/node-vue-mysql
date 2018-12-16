import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Table from "./views/table/Table";
import Form from "./views/table/Form";
import Login from "./views/Login";
import Echart from "./views/table/Echarts";
import Vuex from "@/views/vuex/components/vuex";
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
    {
      path: "/",
      component: Home,
      name: "导航一",
      iconCls: "fa fa-table", //图标样式class

      children: [
        { path: "/vuex", component: Vuex, name: "vuex" },
        { path: "/table", component: Table, name: "Table" }
        
      ]
    },
    {
      path: "/",
      component: Home,
      name: "导航二",
      iconCls: "fa fa-id-card-o",
      children: [
        { path: "/page4", component: Form, name: "页面4" },
        { path: "/page5", component: Form, name: "页面5" }
      ]
    },
    {
      path: "/",
      component: Home,     
      iconCls: "fa fa-file", //图标样式class
      leaf:true,
      children: [
        { path: "/form", component: Form, name: "导航三" ,leaf:true,},
        
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
    }
  ]
});
