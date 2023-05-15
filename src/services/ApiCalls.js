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
    re_initiatecreditcheck(data) {
        return new Apiservice().post("re-initiate/credit/check", data);
    },
    verifycreditcheck(verification_id) {
        return new Apiservice().getWithoutLoader(`verify/credit/check/${verification_id}`);
    },
    allcustomers(number) {
        return new Apiservice().get(`customers?page=${number}&per_page=${10}`);
    },
    customerdetails(phone_number) {
        return new Apiservice().get(`customers/${phone_number}`);
    },
    searchcustomer(phone_number) {
        return new Apiservice().get(`customers?telephone=${phone_number}&per_page=${10}`);
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
    dashboarddata(number) {
        return new Apiservice().get(`get/dashboard/data?page=${number}&per_page=${10}`);
    },
    commission(number) {
        return new Apiservice().get(`fetch/merchant/commissions?page=${number}&per_page=${10}`);
    },
    preview(data) {
        return new Apiservice().post("amortization/preview", data);
    },
    async uploadsingle(data) {
        return await new Apiservice().post("upload/single/file", data, false, false);
    },
    async uploadMultiple(data) {
        return await new Apiservice().ArrayFormData("upload/multiple/files", data);
    },
};
