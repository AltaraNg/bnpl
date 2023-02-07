import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Settings from "@/views/Settings.vue";
import Profile from "@/views/Profile.vue";
import GetStarted from "@/views/GetStarted.vue";
import Offer from "@/views/Offer.vue";
import CustomerRegistration from "@/views/CustomerRegistration.vue";
import SignUp from "../views/SignUp.vue";
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Dashboard",
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
            path: "/settings",
            name: "Settings",
            component: Settings,
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
        },
        {
            path: "/signup",
            name: "SignUp",
            component: SignUp,
            meta: {
                noAuth: true,
            },
        },
        {
            path: "/get-started",
            name: "GetStarted",
            component: GetStarted,
        },
        {
            path: "/offer",
            name: "Offer",
            component: Offer,
        },
        {
            path: "/register-customer",
            name: "CustomerRegistration",
            component: CustomerRegistration,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const userdata = JSON.parse(localStorage.getItem("vuex"));
    const portalAccess = userdata?.result?.user?.portal_access;
    if (!to.matched.some((route) => route.meta.noAuth)) {
        portalAccess !== 1 ? next("login") : next();
        return;
    }
    next();
});

export default router;
