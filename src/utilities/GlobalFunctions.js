
import store from "../store"
import router from "@/router";
export const handleError = (message) => {
    // time is the count down, default to 5, 0 to persist
    store.commit("notification/notify", { type: "error", message: message });
};
export const handleSuccess = (message) => {
    // time is the count down, default to 5, 0 to persist
    store.commit("notification/notify", { type: "success", message: message, time: 5 });
};
export const userdata = JSON.parse(localStorage.getItem("vuex"))?.result?.user;
export const  goBack=()=>{
    router.go(-1)
 }