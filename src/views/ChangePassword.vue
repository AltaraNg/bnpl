<template>
    <div class="!p-0 min-h-[100vh] flex">
        <img class="hidden lg:block h-screen w-1/2 max-w-2xl opacity-50" src="../assets/images/market.jpg" />
        <div class="flex items-center justify-center w-full">
            <div class="mx-auto w-full max-w-sm lg:w-96 space-y-8">
                <router-link to="/">
                    <img src="../assets/images/logo2.png" />
                </router-link>
                <form :actions="false" id="changePasswordForm" name="changePasswordForm" class="space-y-5">
                    <div>
                        <label for="new_password" class="block text-xs font-medium text-gray-700">New Password</label>
                        <div class="mt-0.5 relative">
                            <eyeclose class="right-3 absolute cursor-pointer top-2 z-10" v-if="hide" @click="togglePassword" />
                            <eyeopen class="right-3 absolute cursor-pointer top-2 z-10" @click="togglePassword" v-else />
                            <input
                                id="new_password"
                                name="new_password"
                                :type="hide ? 'password' : 'text'"
                                v-model="data.password"
                                autocomplete="new_password"
                                required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <p class="block text-xs font-medium text-gray-400">(Password must be atleast four characters)</p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="confirm_password" class="block text-xs font-medium text-gray-700">Confirm Password</label>
                        <div class="mt-0.5 relative">
                            <eyeclose class="right-3 absolute cursor-pointer top-2 z-10" v-if="hide" @click="togglePassword" />
                            <eyeopen class="right-3 absolute cursor-pointer top-2 z-10" @click="togglePassword" v-else />
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                :type="hide ? 'password' : 'text'"
                                v-model="data.confirm_password"
                                autocomplete="current-password"
                                required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                            <p class="block text-xs font-medium text-gray-400">(Password must be atleast four characters)</p>
                        </div>
                    </div>
                    <div class="relative mt-1">
                        <DefButton name="Change Password" :action="login" :loading="loader" />
                        <p class="mt-4 text-xs font-normal">
                            &copy; {{ copyright }} <a href="#" class="text-primary text-xs" target="_blank"> Privacy Policy</a> |
                            <a href="#" class="text-primary text-xs" target="_blank">Terms of Service</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import DefButton from "../components/button.vue";
import { handleError } from "../utilities/GlobalFunctions";
import eyeclose from "@/assets/svgs/eyeclose.vue";
import eyeopen from "@/assets/svgs/eyeopen.vue";
export default {
    components: {
        DefButton,
        eyeclose,
        eyeopen,
    },
    data() {
        return {
            validated: null,
            hide: true,
            data: {
                password: "",
                confirm_password: "",
            },
        };
    },
    methods: {
        login(event) {
            this.validatePassword();
            if (this.validated) {
                this.$store.dispatch("ResetPassword", {
                    ...this.data,
                    ...this.$route.params,
                });
            }
            event.preventDefault();
        },
        validatePassword() {
            if (this.data.password.length < 4 && this.data.password.length > 1 && this.data.password == this.data.confirm_password) {
                handleError(" Password should have at least four character");
            } else if (!this.data.password) {
                handleError("  Please enter New Password");
            } else if (this.data.password !== this.data.confirm_password && this.data.confirm_password) {
                handleError("  New pasword and confirm password does not match");
            } else if (!this.data.confirm_password) {
                handleError(" Please enter confirm password");
            } else {
                this.validated = true;
            }
        },
         togglePassword() {
            this.hide = !this.hide;
        },
    },
    computed: {
        copyright() {
            return `${new Date().getFullYear()} Altara Credit Limited.`;
        },
    },
};
</script>
