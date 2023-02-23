import { Apiservice } from "./ApiService";
const api = new Apiservice();

export default {
    resetpassword(data) {
        return api.post("reset/password", data, false);
    },
    login(data) {
        return api.post("auth/login", data);
    },
    createcustomer(data) {
        return api.post("customers", data);
    },
    repaymentduration() {
        return api.changeBaseURL(process.env.VUE_APP_URL).get("api/repayment_duration");
    },
    businesstype() {
        return api.changeBaseURL(process.env.VUE_APP_URL).get("api/business_type");
    },
    getcalculations() {
        return api.changeBaseURL(process.env.VUE_APP_URL).get("api/price_calculator");
    },
    downpayments() {
        return api.changeBaseURL(process.env.VUE_APP_URL).get("api/down_payment_rate");
    },
};
