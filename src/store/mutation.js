export const LOGIN = (state, data) => {
  state.userdata = data;
};

// export const RESET_PASSWORD = (state, token) => {};
export const LOADING = (state, loadingState) => {
  state.status.loading = loadingState;
};
