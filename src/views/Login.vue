<template>
    <div class="!p-0 min-h-[100vh] flex  bg-blue-50">
        <img class="hidden lg:block h-screen py-8 pl-16 w-1/2 max-w-2xl " src="../assets/images/market.png" />
        <div class="flex items-center justify-center w-full">
            <div class="mx-auto  space-y-8">
                <div class="flex lg:justify-start justify-center w-full">
                    <img src="../assets/images/logo2.png" />
                </div>

                <form method="post" class="space-y-5">
                    <div>
                        <label for="email" class="block text-xs font-medium text-gray-700">Email address</label>
                        <div class="mt-0.5">
                            <input id="email" name="email" v-model="username" type="email" autocomplete="email" required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm" />
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block text-xs font-medium text-gray-700">Password</label>
                        <div class="mt-0.5 relative">
                            <eyeclose class="right-3 absolute cursor-pointer top-2 z-10" v-if="hide" @click="togglePassword" />
                            <eyeopen class="right-3 absolute cursor-pointer top-2 z-10" @click="togglePassword" v-else />
                            <input id="password" name="password" :type="hide ? 'password' : 'text'" v-model="password" autocomplete="current-password" required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm" />
                        </div>
                    </div>
                    <div class="relative mt-1">
                        <DefButton name="Login" :action="login" :loading="loader" />
                        <p class="mt-4 text-xs font-normal">
                            &copy; {{ copyright }} <a class="text-primary text-xs" target="_blank"> Privacy Policy</a> |
                            <a class="text-primary text-xs" target="_blank">Terms of Service</a>
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
