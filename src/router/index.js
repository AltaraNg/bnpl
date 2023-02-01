import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import DashBoard from "@/views/DashBoard.vue";
import SignIn from "@/views/SignIn.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
    {
      path: "/dashboard",
      name: "DashBoard",
      component: DashBoard,
      meta: {
        noAuth: true,
      },
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: SignIn,
      meta: {
        noAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userdata = JSON.parse(localStorage.getItem("vuex"))?.userdata;
  const portalAccess = userdata?.result?.user?.portal_access;
  if (!to.matched.some((route) => route.meta.noAuth)) {
    portalAccess !== 1 ? next("login") : next();
    return;
  }

  next();
});

export default router;
