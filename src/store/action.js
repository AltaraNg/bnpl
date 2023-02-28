import router from "../router";
import Apis from "../services/ApiCalls.js";
import { handleSuccess } from "../utilities/GlobalFunctions";
import store from "../store";
export const Login = ({ commit }, data) => {
    commit("LOADING", true);
    Apis.login(data).then((response) => {
        if (response) {
            commit("LOGIN", response);
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
    const response = store.state.Customers.find((customer) => {
        return customer.phone_number == data;
    });
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
        }
    });
};

export const VerifyCreditCheck = ({ commit }) => {
    commit("LOADING", true);
    Apis.verifycreditcheck().then((response) => {
        if (response) {
            handleSuccess("Success");
            // commit("CREDIT_CHECK_VERIFICATION", response.result.credit_check_verification);
            console.log(response);
            commit("LOADING", false);
        } else {
            commit("LOADING", false);
        }
    });
};
export const InitiateCreditCheck = ({ commit }, data) => {
    commit("LOADING", true);
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
            Apis.verifycreditcheck();
            setInterval(() => {
                const res = Apis.verifycreditcheck().then((verification_status) => {
                    console.log(verification_status);
                    const status = verification_status.data.result.status;
                    console.log(verification_status);

                    console.log(status);
                });
                console.log(res);
            }, 0.5 * 30 * 1000);
            // if (intervalID) {
            //     clearInterval(intervalID); // Stop the interval if the condition holds true
            // }

            commit("LOADING", false);
        } else {
            commit("LOADING", false);
        }
    });
};
