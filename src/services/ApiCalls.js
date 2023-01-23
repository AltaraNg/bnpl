import { Apiservice } from "./ApiService";
const api = new Apiservice();

export default {
  resetpassword(data) {
    return api.post("reset/password", data, false);
  },
  login(data) {
    return api.post("auth/login", data);
  },
};
