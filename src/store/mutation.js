export const LOGIN = (state, data) => {
  state.userdata = data;
  localStorage.setItem("vuex", JSON.stringify(data));
};

export const RESET_PASSWORD = (state, data) => {
  state.userdata = data;
  localStorage.setItem("vuex", JSON.stringify(data));
};
export const LOADING = (state, loadingState) => {
  state.status.loading = loadingState;
};
export const ERROR = (state, error) => {
  state.status.error = error;
};
export const CUSTOMER_DETAILS = (state, response) => {
    state.Customer = response;
};
export const CREATE_CUSTOMER = (state, response) => {
    state.Customer = response;
};
export const CREDIT_CHECK_VERIFICATION = (state, verification) => {
    state.verification = verification;
    localStorage.setItem("credit_check_verification", JSON.stringify(verification));
};
