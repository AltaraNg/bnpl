import router from "../router";
import Apis from "../services/ApiCalls.js";
import { handleError, handleSuccess } from "../utilities/GlobalFunctions";

export const Login = ({ commit }, data) => {
  commit("LOADING", true);
  Apis.login(data).then((response) => {
    if (response) {
      commit("LOGIN", response);
      handleSuccess('Success')
      router.push({
        name: "home",
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
      commit("RESET_PASSWORD", response);
      handleSuccess("Success");
      router.push({
        name: "home",
      });
      commit("LOADING", false);
    } else {
      handleError("Try Again");
      commit("LOADING", false);
    }
  });
};
