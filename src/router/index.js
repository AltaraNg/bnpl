import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        noAuth: true,
      },
    },
    {
      path: "/change/password/otp=:otp&username=:username",
      name: "change_password",
      component: () => import("../views/ChangePassword.vue"),
      // redirect:"/change/password",
      meta: {
        noAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userdata = JSON.parse(localStorage.getItem("vuex"))?.userdata;
  if ( !to.matched.some((route) => route.meta.noAuth)) {
    !userdata ? next("login") : next();
    return;
  }

  
  next();
});

export default router
