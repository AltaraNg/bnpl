import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Settings from "@/views/Settings.vue";
import Profile from "@/views/Profile.vue";
import GetStarted from "@/views/GetStarted.vue";
import Offer from "@/views/Offer.vue";
import CustomerRegistration from "@/views/CustomerRegistration.vue";
import CustomerDetails from "@/views/CustomerDetails.vue";
import Verification from "@/views/Verification.vue";
import AllOrders from "@/views/AllOrders.vue";
import AllTransactions from "../views/AllTransactions.vue"
import Commission from "../views/Commission.vue";
import CreateCustomer from "../views/CreateCustomer.vue";
import CreateOrder from '../views/CreateOrder.vue'
import SuccessfulVerification from "@/views/SuccessfulVerification.vue";
import FailedVerification from "@/components/FailedVerification.vue"
import OTP from "@/views/OTP.vue"
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
            path: "/:telephone/create-customer",
            name: "CreateCustomer",
            component: CreateCustomer,
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
            path: "/signup",
            name: "CustomerRegistration",
            component: CustomerRegistration,
            meta: {
                noAuth: true,
            },
        },
        {
            path: "/verification/:phone_number/:verification_id/pending",
            name: "Verification",
            component: Verification,
        },
        {
            path: "/verification/:phone_number/:verification_id/failed",
            name: "FailedVerification",
            component: FailedVerification,
        },
        {
            path: "/success/:phone_number/:verification_id/:OTPvalidate",
            name: "SuccessfulVerification",
            component: SuccessfulVerification,
        },
        {
            path: "/:phone_number/OTP/:verification_id",
            name: "OTP",
            component: OTP,
        },
        {
            path: "/:phone_number/customer-details",
            name: "CustomerDetails",
            component: CustomerDetails,
        },
        {
            path: "/all-orders",
            name: "AllOrders",
            component: AllOrders,
        },
        {
            path: "/all-transactions",
            name: "AllTransactions",
            component: AllTransactions,
        },
        {
            path: "/commission",
            name: "Commission",
            component: Commission,
        },
        {
            path: "/:id/:telephone/create-order",
            name: "CreateOrder",
            component: CreateOrder,
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
