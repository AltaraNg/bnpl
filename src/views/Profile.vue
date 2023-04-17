<template>
    <App>
        <div class="beafy pt-0">
            <Disclosure as="div" class="relative overflow-hidden bg-sky-700 pb-32" v-slot="{ open }">
                <div
                    aria-hidden="true"
                    :class="[
                        open ? 'bottom-0' : 'inset-y-0',
                        'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0',
                    ]"
                >
                    <div class="absolute inset-0 flex">
                        <div class="h-full w-1/2" style="background-color: #0a527b" />
                        <div class="h-full w-1/2" style="background-color: #065d8c" />
                    </div>
                    <div class="relative flex justify-center">
                        <svg class="flex-shrink-0" width="1750" height="308" viewBox="0 0 1750 308" xmlns="http://www.w3.org/2000/svg">
                            <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
                            <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
                            <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                            <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
                        </svg>
                    </div>
                </div>
                <header class="relative py-10">
                    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <h1 class="text-3xl font-bold tracking-tight text-white">Profile Settings</h1>
                    </div>
                </header>
            </Disclosure>

            <main class="relative -mt-32">
                <div class="mx-auto max-w-5xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="divide-y divide-gray-200">
                            <form class="divide-y divide-gray-200" action="#" method="POST">
                                <!-- Profile section -->
                                <div class="py-6 px-4 sm:p-6 lg:pb-8">
                                    <div>
                                        <h2 class="text-lg font-medium leading-6 text-gray-900">Profile</h2>
                                        <p class="mt-1 text-sm text-gray-500">
                                            This information will be displayed publicly so be careful what you share.
                                        </p>
                                    </div>

                                    <div class="mt-6 flex flex-col lg:flex-row">
                                        <div class="flex-grow space-y-6">
                                            <div>
                                                <label for="full_name" class="block text-sm font-medium text-gray-700">Full Name</label>
                                                <div class="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="full_name"
                                                        id="full_name"
                                                        autocomplete="full_name"
                                                        disabled
                                                        class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                                        :value="user.full_name"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                                <div class="mt-1">
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        autocomplete="email"
                                                        disabled
                                                        class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                                        :value="user.email"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-4 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                                            <div class="relative hidden overflow-hidden rounded-full lg:block">
                                                <span class="inline-flex h-40 w-40 items-center justify-center rounded-full bg-primary">
                                                    <span class="text-6xl font-medium leading-none text-white">{{
                                                        fullname[0].charAt(0) + "" + fullname[1].charAt(0) 
                                                    }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-6 grid grid-cols-12 gap-6">
                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                autocomplete="phone-number"
                                                disabled
                                                v-model="user.phone_number"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                            />
                                        </div>

                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="vendor-id" class="block text-sm font-medium text-gray-700">Vendor ID</label>
                                            <input
                                                type="text"
                                                name="vendor-id"
                                                id="vendor-id"
                                                autocomplete="vendor-ide"
                                                v-model="user.staff_id"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                disabled
                                            />
                                        </div>

                                        <div class="col-span-12">
                                            <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
                                            <input
                                                type="text"
                                                name="url"
                                                id="url"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                            />
                                        </div>

                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                autocomplete="address"
                                                v-model="user.address"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </App>
</template>

<script setup>
import { Disclosure } from "@headlessui/vue";
import App from "@/layouts/App.vue";
import { ref,  } from "vue";
import { userdata } from "../utilities/GlobalFunctions";
import {computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = ref( store.state.userdata.result?.user|| userdata  )
const fullname = computed(() => {
    return user.value?.full_name.split(" ");
});
</script>
