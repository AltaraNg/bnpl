<template>
    <div class="!p-0 min-h-[100vh] flex">
        <img class="hidden lg:block h-screen w-1/2 max-w-2xl" src="../assets/images/market.jpg" alt="Bolster, Helping startups scale their CEOs, CXOs, Boards" />
        <div class="flex items-center justify-center w-full">
            <div class="mx-auto w-full max-w-sm lg:w-96 space-y-8">
               <img src="../assets/images/logo.png" />
                <h2 class=" text-2xl font-semibold">Welcome</h2>
                <form :actions="false" id="signinForm" name="signinForm" class="">
                    <div>
                        <label for="email" class="block text-xs font-medium text-gray-700">Email address</label>
                        <div class="mt-0.5">
                            <input id="email" name="email" type="email" autocomplete="email" required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block text-xs font-medium text-gray-700">Password</label>
                        <div class="mt-0.5">
                            <input id="password" name="password" type="password" autocomplete="current-password" required=""
                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div class="relative mt-1">
                        <a href="#" class="text-blue-400 text-sm font-normal">Forgot Password?</a>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-0 mt-8">Sign
                            in</button>
                        <p class="mt-4 text-xs font-normal">
                            &copy; {{ copyright() }}
                            <a href="#" class="text-primary text-xs" target="_blank"> Privacy Policy</a> |
                            <a href="#" class="text-primary text-xs" target="_blank">Terms of Service</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
const copyright = () => {
    return `${new Date().getFullYear()} Altara Credit Limited.`;
};
</script>