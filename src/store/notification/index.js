const state = () => ({
    showNotification: false,
    data: {},
});

const mutations = {
    notify(state, { type = "", message = "", time = 5 }) {
        state.data = { ...state.data, type, message };
        state.showNotification = true;
        if (time) {
            let count = time;

            const countdown = setInterval(function () {
                count--;
                if (count === 0) {
                    clearInterval(countdown);
                    state.showNotification = false;
                }
            }, 1000);
        }
    },
    close(state) {
        state.data = { ...state.data, type: "", message: "" };
        state.showNotification = false;
    },
};

export default {
    mutations,
    state,
    namespaced: true,
};
