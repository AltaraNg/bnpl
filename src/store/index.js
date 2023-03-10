// import {vue} from "vue";
import Vuex from "vuex";
import state from "./state";
// import * as getters from "./getters";
// * means import everything from the directory
import * as actions from "./action";
import * as mutations from "./mutation";
import notification from "./notification";
import { loader } from "./loader";

// vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        notification,
        loader,
    },
    state,
    mutations,
    actions,
});
