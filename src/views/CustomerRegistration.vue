<template>
    <App>
        <div class="overflow-hidden bg-white py-16 px-6 lg:px-8 lg:py-24">
            <div class="relative mx-auto max-w-xl">
                <svg class="absolute left-full translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg class="absolute right-full bottom-0 -translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404"
                    aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <div class="text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Register Customer</h2>
                    <p class="mt-4 text-lg leading-6 text-gray-500">Please enter the customer details to continue</p>
                    <button @click="open=true" class="bg-indigo-600 px-6 py-3 text-white mt-4">Test Loader</button>
                </div>
                <div class="mt-12">
                    <form action="#" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                            <div class="mt-1">
                                <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                    class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-0" />
                            </div>
                        </div>
                        <div>
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                            <div class="mt-1">
                                <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                    class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-0" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                            <div class="mt-1">
                                <input type="text" name="company" id="company" autocomplete="organization"
                                    class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-0" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <div class="mt-1">
                                <input id="email" name="email" type="email" autocomplete="email"
                                    class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-0" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                            <div class="relative mt-1 rounded-md shadow-sm">
                                <div class="absolute inset-y-0 left-0 flex items-center">
                                    <select id="country" name="country"
                                        class="h-full rounded-md border-transparent bg-transparent py-0 pl-4 pr-8 text-gray-500 focus:border-0">
                                        <option>NG</option>
                                    </select>
                                </div>
                                <input type="text" name="phone-number" id="phone-number" autocomplete="tel"
                                    class="block w-full rounded-md border-gray-300 py-3 px-4 pl-20 focus:border-0"
                                    placeholder="+2348007000000" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" class="block text-sm font-medium text-gray-700">Address</label>
                            <div class="mt-1">
                                <textarea id="message" name="message" rows="4"
                                    class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-0" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <button type="submit"
                                class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-0">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Loader v-if="open" />
    </App>
</template>

<script setup>
import {ref} from "vue";
import App from "@/layouts/App.vue";
import Loader from "@/components/Loader.vue";

const open = ref(true);

</script>