import { Apiservice } from "./ApiService";

export default {
    resetpassword(data) {
        return new Apiservice().post("reset/password", data, false);
    },
    login(data) { 
        return new Apiservice().post("auth/login", data);
    },
    createcustomer(data) {
        return new Apiservice().post("customers", data);
    },
    repaymentduration() {
        return new Apiservice().changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/repayment_duration");
    },
    businesstype() {
        return new Apiservice().changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/business_type");
    },
    getcalculations() {
        return new Apiservice().changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/price_calculator");
    },
    downpayments() {
        return new Apiservice().changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/down_payment_rate");
    },
    repaymentcycle() {
        return new Apiservice().changeBaseURL(process.env.VUE_APP_CONTROL_API_URL).get("api/repayment_cycle");
    },
    initiatecreditcheck(data) {
        return new Apiservice().post("initiate/credit/check", data);
    },
    verifycreditcheck(verification_id) {
        return new Apiservice().getWithoutLoader(`verify/credit/check/${verification_id}`);
    },
    allcustomers() {
        return new Apiservice().get("customers");
    },
    customerdetails(phone_number) {
        return new Apiservice().get(`customers/${phone_number}`);
    },
    searchcustomer(phone_number) {
        return new Apiservice().get(`customers?telephone=${phone_number}`);
    },
    generateOTP(data) {
        return new Apiservice().post("generate/otp", data);
    },
    validateOTP(data) {
        return new Apiservice().post("validate/otp", data);
    },
    storeOrder(data) {
        return new Apiservice().post("store/order", data);
    },
     dashboarddata() {
      return new Apiservice().get("get/dashboard/data");
    },
   
    
};
