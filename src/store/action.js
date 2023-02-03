import router from "../router";
import Apis from "../services/ApiCalls.js";
import {  handleSuccess } from "../utilities/GlobalFunctions";

export const Login = ({ commit }, data) => {
  commit("LOADING", true);
  Apis.login(data).then((response) => {
    if (response) {
      commit("LOGIN", response);
      handleSuccess('Success')
      router.push({
          name: "Dashboard",
      });
      commit("LOADING", false);
    } else {
     
      commit("LOADING", false);
    }
  });
};
export const ResetPassword = ({ commit }, data) => {
  commit("LOADING", true);
  Apis.resetpassword(data).then((response) => {
    if (response) {
      commit("LOADING", false);
      commit("RESET_PASSWORD", response);
      handleSuccess("Success");
      router.push({
          name: "Dashboard",
      });
      commit("LOADING", false);
    } else {
      commit("LOADING", false);
    }
  });
};
