import router from "../router";
import Apis from "../services/ApiCalls.js";

export const Login = ({ commit }, data) => {
  commit("LOADING", true)
  Apis.login(data).then((response) => {
    if(response){
      commit("LOGIN", response);
      console.log(response,'cation');
      router.push({
        name: "home",
      });
      commit("LOADING", false);
    }else{
      alert("The provided credentials are incorrect");
      commit("LOADING", false);
    }
    
  })
};
export const ResetPassword = ({ commit }, data) => {
  commit("LOADING", true);
  Apis.resetpassword(data).then((response) => {
    if (response) {
      commit("RESET_PASSWORD", response);
      router.push({
        name: "home",
      });
      commit("LOADING", false);
    } else {
      alert("Try again");
      commit("LOADING", false);
    }
   
  });
};

;