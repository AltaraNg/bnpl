<template>
    <App>
        <div class="beafy pt-0">
            <Disclosure as="div" class="relative overflow-hidden bg-sky-700 pb-32" v-slot="{ open }">
                <div aria-hidden="true" :class="[
                    open ? 'bottom-0' : 'inset-y-0',
                    'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0',
                ]">
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
                                                <label for="username" class="block text-sm font-medium text-gray-700">Full Name</label>
                                                <div class="mt-1 flex rounded-md shadow-sm">                                                    
                                                    <input type="text" name="username" id="username" autocomplete="username" disabled
                                                        class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                                        :value="userdata.full_name" />
                                                </div>
                                            </div>

                                            <div>
                                                <label for="about" class="block text-sm font-medium text-gray-700">Email</label>
                                                <div class="mt-1">
                                                    <input type="text" name="username" id="username" autocomplete="username" disabled
                                                        class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                                        :value="userdata.email" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                                            <p class="text-sm font-medium text-gray-700" aria-hidden="true">Photo</p>
                                            <div class="mt-1 lg:hidden">
                                                <div class="flex items-center">
                                                    <div class="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full" aria-hidden="true">
                                                        <img class="h-full w-full rounded-full" :src="user.imageUrl" alt="" />
                                                    </div>
                                                    <div class="ml-5 rounded-md shadow-sm">
                                                        <div
                                                            class="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                                                            <label for="mobile-user-photo"
                                                                class="pointer-events-none relative text-sm font-medium leading-4 text-gray-700">
                                                                <span>Change</span>
                                                                <span class="sr-only"> user photo</span>
                                                            </label>
                                                            <input id="mobile-user-photo" name="user-photo" type="file"
                                                                class="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="relative hidden overflow-hidden rounded-full lg:block">
                                                <img class="relative h-40 w-40 rounded-full" :src="user.imageUrl" alt="" />
                                                <label for="desktop-user-photo"
                                                    class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100">
                                                    <span>Change</span>
                                                    <span class="sr-only"> user photo</span>
                                                    <input type="file" id="desktop-user-photo" name="user-photo"
                                                        class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-6 grid grid-cols-12 gap-6">
                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" disabled v-model="userdata.phone_number"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Vendor ID</label>
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" v-model="userdata.staff_id"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-12">
                                            <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
                                            <input type="text" name="url" id="url"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="company" class="block text-sm font-medium text-gray-700">Address</label>
                                            <input type="text" name="company" id="company" autocomplete="organization" v-model="userdata.address"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
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
import { userdata } from "../utilities/GlobalFunctions";

const user = {
    name: "Debbie Lewis",
    id: "DEC4B",
    email: "debbielewis@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

</script>
