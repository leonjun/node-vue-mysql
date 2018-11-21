import Vue from "vue";
import Router from "vue-router";

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
  ]
});
