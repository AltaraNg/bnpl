import router from "../router";
import Apis from "../services/ApiCalls.js";
import { handleSuccess } from "../utilities/GlobalFunctions";
import store from "../store";
// import { loader } from "./loader";
export const Login = ({ commit }, data) => {
    Apis.login(data).then((response) => {
        if (response) {
            commit("LOGIN", response);
            handleSuccess("Success");
            router.push({
                name: "Dashboard",
            });
        }
    });
};
export const ResetPassword = ({ commit }, data) => {
    Apis.resetpassword(data).then((response) => {
        if (response) {
            commit("RESET_PASSWORD", response);
            handleSuccess("Success");
            router.push({
                name: "Dashboard",
            });
        }
    });
};
export const CustomerDetails = ({ commit }, data) => {
    const response = store.state.Customers.find((customer) => {
        return customer.phone_number == data;
    });
    commit("CUSTOMER_DETAILS", response);
};
export const CreateCustomer = ({ commit }, data) => {
    Apis.createcustomer(data).then((response) => {
        if (response) {
            commit("CREATE_CUSTOMER", response);
            handleSuccess("Success");
            router.push({ name: "CreateOrder", params: { id: response?.result?.id } });
        } 
    });
};

export const VerifyCreditCheck = ({ commit }) => {
    Apis.verifycreditcheck().then((response) => {
        if (response) {
            handleSuccess("Success");
            commit("CREDIT_CHECK_VERIFICATION", response.result.credit_check_verification);
        } 
    });
};
export const InitiateCreditCheck = ({ commit }, data) => {
    Apis.initiatecreditcheck(data).then((response) => {
        if (response) {
            handleSuccess("Success");
            commit("CREDIT_CHECK_VERIFICATION", response.result.credit_check_verification);
            router.push({
                name: "Verification",
                params: {
                    verification_id: response.result.credit_check_verification.id,
                    verification_status: response.result.credit_check_verification.status,
                },
            });
            
        } 
    });
};

