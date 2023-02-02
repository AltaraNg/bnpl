<template>
    <div class="!p-0 min-h-[100vh] flex">
        <img
            class="hidden lg:block h-screen w-1/2 max-w-2xl opacity-50"
            src="../assets/images/market.jpg"
        />
        <div class="flex items-center justify-center w-full">
            <div class="mx-auto w-full max-w-sm lg:w-96 space-y-8">
                <img src="../assets/images/logo.png" />
                <form method="post"  class="space-y-5">
                    <div>
                        <label for="email" class="block text-xs font-medium text-gray-700">Email address</label>
                        <div class="mt-0.5">
                            <input
                                id="email"
                                name="email"
                                v-model="username"
                                type="email"
                                autocomplete="email"
                                required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block text-xs font-medium text-gray-700">Password</label>
                        <div class="mt-0.5 relative">
                            <eyeclose class="right-3 absolute cursor-pointer top-0 z-10" v-if="hide" @click="togglePassword" />
                            <eyeopen class="right-3 absolute cursor-pointer top-0 z-10" @click="togglePassword" v-else />
                            <input
                                id="password"
                                name="password"
                                :type="hide ? 'password' : 'text'"
                                v-model="password"
                                autocomplete="current-password"
                                required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div class="relative mt-1">
                        <a href="#" class="text-blue-400 text-sm font-normal">Forgot Password?</a>
                        <DefButton name="Login" :action="login" :loading="loader" />
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
import eyeclose from "@/assets/svgs/eyeclose.vue";
import eyeopen from "@/assets/svgs/eyeopen.vue";
import { handleError } from "../utilities/GlobalFunctions"
export default {
    components: {
        DefButton,
        eyeclose,
        eyeopen,
    },
    data() {
        return {
            hide: true,
            attemptSubmit: false,
            username: "",
            password: "",
            loader: false,
            validated: false,
        };
    },
    methods: {

        login(event) {
            this.attemptSubmit = true;
            if (this.username == "" || this.password == "") {
              handleError('Please enter your email address and password')
            } else {
                this.validated = true;
                this.$store.dispatch("Login", {
                    username: this.username,
                    password: this.password,
                });
            }
            //
            event.preventDefault();
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
