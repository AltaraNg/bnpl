// import {vue} from "vue";
import Vuex from "vuex";
import state from "./state";
// import * as getters from "./getters";
// * means import everything from the directory
import * as actions from "./action";
import * as mutations from "./mutation";
import createPersistedState from "vuex-persistedstate";

// vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
  state,
  mutations,
  actions,
});
