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
                                                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                                                <div class="mt-1 flex rounded-md shadow-sm">
                                                    <span
                                                        class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm w-32">VT-2023-LT-</span>
                                                    <input type="text" name="username" id="username" autocomplete="username" disabled
                                                        class="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                                        :value="user.id" />
                                                </div>
                                            </div>

                                            <div>
                                                <label for="about" class="block text-sm font-medium text-gray-700">About</label>
                                                <div class="mt-1">
                                                    <textarea id="about" name="about" rows="3"
                                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                                                </div>
                                                <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
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
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstname"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastname"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-12">
                                            <label for="url" class="block text-sm font-medium text-gray-700">URL</label>
                                            <input type="text" name="url" id="url"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-12 sm:col-span-6">
                                            <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                                            <input type="text" name="company" id="company" autocomplete="organization" v-model="form.company"
                                                class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                        </div>
                                    </div>
                                </div>

                                <!-- Privacy section -->
                                <div class="divide-y divide-gray-200 pt-6">
                                    <div class="px-4 sm:px-6">
                                        <div>
                                            <h2 class="text-lg font-medium leading-6 text-gray-900">Privacy</h2>
                                            <p class="mt-1 text-sm text-gray-500">Ornare eu a volutpat eget vulputate. Fringilla commodo amet.</p>
                                        </div>
                                        <ul role="list" class="mt-2 divide-y divide-gray-200">
                                            <SwitchGroup as="li" class="flex items-center justify-between py-4">
                                                <div class="flex flex-col">
                                                    <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>Available to hire</SwitchLabel>
                                                    <SwitchDescription class="text-sm text-gray-500">Nulla amet tempus sit accumsan. Aliquet turpis sed sit
                                                        lacinia.
                                                    </SwitchDescription>
                                                </div>
                                                <Switch v-model="availableToHire" :class="[
                                                    availableToHire ? 'bg-teal-500' : 'bg-gray-200',
                                                    'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
                                                ]">
                                                    <span aria-hidden="true" :class="[
                                                        availableToHire ? 'translate-x-5' : 'translate-x-0',
                                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                                    ]" />
                                                </Switch>
                                            </SwitchGroup>
                                            <SwitchGroup as="li" class="flex items-center justify-between py-4">
                                                <div class="flex flex-col">
                                                    <SwitchLabel as="p" class="text-sm font-medium text-gray-900" passive>Make account private</SwitchLabel>
                                                    <SwitchDescription class="text-sm text-gray-500">Pharetra morbi dui mi mattis tellus sollicitudin cursus
                                                        pharetra.</SwitchDescription>
                                                </div>
                                                <Switch v-model="privateAccount" :class="[
                                                    privateAccount ? 'bg-teal-500' : 'bg-gray-200',
                                                    'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
                                                ]">
                                                    <span aria-hidden="true" :class="[
                                                        privateAccount ? 'translate-x-5' : 'translate-x-0',
                                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                                    ]" />
                                                </Switch>
                                            </SwitchGroup>
                                        </ul>
                                    </div>
                                    <div class="mt-4 flex justify-end py-4 px-4 sm:px-6">
                                        <button type="button"
                                            class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                                            Cancel
                                        </button>
                                        <button type="submit"
                                            class="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                                            Save
                                        </button>
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
import { ref, reactive } from "vue";
import { Disclosure, Switch, SwitchDescription, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import App from "@/layouts/App.vue";

const user = {
    name: "Debbie Lewis",
    id: "DEC4B",
    email: "debbielewis@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

const availableToHire = ref(true);
const privateAccount = ref(false);
const form = reactive({
    firstname: "Elon",
    lastname: "Flinstone",
    company: "Starlink Inc",
});
</script>
