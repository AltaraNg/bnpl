import router from "../router";
import Apis from "../services/ApiCalls.js";
import { handleSuccess, handleError } from "../utilities/GlobalFunctions";
import store from "../store";
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
export const CustomerDetails = ({ commit }, data) => {
  const response = store.state.Customers.find((customer)=>{
      return customer.phone_number == data
    })
            commit("CUSTOMER_DETAILS", response);

};
export const CreateCustomer = ({ commit }, data) => {
    commit("LOADING", true);
    Apis.createcustomer(data).then((response) => {
        if (response) {
            commit("CREATE_CUSTOMER", response);
            handleSuccess("Success");
          router.push({ name: "CreateOrder", params: { id: response?.result?.id } });
            commit("LOADING", false);
        } else {
            commit("LOADING", false);
            handleError("Please try again")
        }
    });
};

export const Calculate = ({ commit }, data) => {
    commit("LOADING", true);
   console.log(data, 'action');
   commit("LOADING", false);
};
