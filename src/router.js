import Vue from "vue";
import Router from "vue-router";
import Home from './views/Home.vue';
import Table from './views/table/Table';
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    //首页
    {
      path: '/Login',
      name: 'login',
      component: () => import("./views/Login")
    },
    {
        path: '/',
        redirect: {name: 'login'}
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [          
            { path: '/table', component: Table, name: 'Table' },        
            
        ]
    },
  ]
});
