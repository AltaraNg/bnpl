
export const LOGIN = (state, data) => {
  state.userdata = data;
};

export const RESET_PASSWORD = (state, data) => {
  state.userdata = data;
};
export const LOADING =(state, loadingState)=>{
  state.status.loading = loadingState
}
