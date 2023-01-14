import router from "../router";
import Apis from "../services/ApiCalls.js";

export const Login = ({ commit }, data) => {
  Apis.login(data).then((response) => {
    commit("LOGIN", response.data);
    
  })
};
export const ResetPassword = ({ commit }, data) => {
  Apis.resetpassword(data).then((response) => {
    commit("RESET_PASSWORD", response.data.token);
    if (response) {
    }
  });
};

;