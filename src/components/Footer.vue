<template>
    <footer class="bg-indigo-800 block sm:hidden">
        <div class="mx-auto max-w-7xl py-4 px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div class="flex justify-center space-x-6 md:order-2 text-white">
                <a href="/">
                    <HomeIcon class="h-10 w-10" />
                </a>
                <a href="/">
                    <UserIcon class="h-10 w-10" />
                </a>
                <a href="/">
                    <CogIcon class="h-10 w-10" />
                </a>
            </div>
            <div class="mt-2 sm:mt-8 md:order-1 md:mt-0">
                <p class="text-center text-xs leading-5 text-gray-200 font-medium">&copy; 2023 Altara Credit Limited. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>
<script setup>
import { HomeIcon, UserIcon, CogIcon } from "@heroicons/vue/24/outline";
</script>