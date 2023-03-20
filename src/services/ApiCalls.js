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
        return api.changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/repayment_duration");
    },
    businesstype() {
        return api.changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/business_type");
    },
    getcalculations() {
        return api.changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/price_calculator");
    },
    downpayments() {
        return api.changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/down_payment_rate");
    },
    repaymentcycle() {
        return api.changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/repayment_cycle");
    },
    initiatecreditcheck(data) {
        return api.post("initiate/credit/check", data);
    },
    verifycreditcheck(verification_id) {
        return api.getWithoutLoader(`verify/credit/check/${verification_id}`);
    },
    allcustomers() {
        return api.get("customers");
    },
    customerdetails(phone_number) {
        return api.get(`customers/${phone_number}`);
    },
    searchcustomer(phone_number) {
        return api.get(`customers?telephone=${phone_number}`);
    },
    generateOTP(data) {
        return api.post("generate/otp", data);
    },
    validateOTP(data) {
        return api.post("validate/otp", data);
    },
    storeOrder(data) {
        return api.post("store/order", data);
    },
    
};
