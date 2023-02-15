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
