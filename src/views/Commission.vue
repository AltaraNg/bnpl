<template>
    <App>
        <div class="lg:pb-4">
            <div class="mt-3 mb-3">
                <div class="flex items-center">
                    <div class="p-1 block cursor-pointer lg:hidden block">
                        <ArrowLeftIcon class="lg:h-10 w-10 h-6 text-indigo-600" aria-hidden="true" @click="$router.push({ name: 'Dashboard' })" />
                    </div>
                    <div class="w-full lg:pl-10 mt-12 mb-2">
                        <h2 class="text-lg font-semibold lg:text-2xl leading-6 lg:text-left text-center text-gray-900">Commission</h2>
                    </div>
                </div>

                <!-- Activity list (smallest breakpoint only) -->
                <div class="shadow sm:hidden">
                    <div v-if="commissions?.length === 0" class="flex h-full text-center items-center flex-col justify-center px-5">
                        <zerostate />
                        <p class="text-gray-800 lg:text-2xl mb-0.5">You have no commissions yet</p>
                        <p class="text-gray-500 text-xs lg:text-normal mb-6">Click here to get started</p>
                        <RouterLink :to="{ name: 'GetStarted' }">
                            <defaultButton name=" Get Started">
                                <template v-slot:icon>
                                    <plus />
                                </template>
                            </defaultButton>
                        </RouterLink>
                    </div>
                    <div v-else role="list" class="mt-2   overflow-hidden shadow sm:hidden">
                        <div v-for="transaction in commissions" :key="transaction.id">
                            <div class="flex flex-col m-5 rounded-3xl bg-white shadow-xl ring-1 ring-black/10 lg:p-6 p-4 mt-2">
                                <div class="flex items-center justify-between">
                                    <p class="text-base font-semibold mb-3 tracking-tight text-primary">Transaction Details</p>

                                    <div>
                                        <p class="text-lg font-semibold text-gray-600">{{ transaction.product.name }}</p>
                                        <span class="text-xs font-semibold leading- tracking-normal text-gray-500">
                                            transaction.order_number
                                        </span>
                                    </div>
                                </div>

                                <div class="mt-3">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-gray-500 text-sm font-medium mt-4">Total Product Value:</p>
                                            <p class="text-gray-900 text-lg font-bold">{{ formatCurrency(transaction.product.price) }}</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500 text-sm font-medium mt-4">{{transaction.commission.value}}% Commission value</p>
                                            <p class="flex items-baseline text-lg font-bold tracking-tight text-gray-900">
                                                {{ formatCurrency(transaction.product.price * (transaction.commission.value/100))}} 
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-gray-500 text-sm font-medium mt-4">Date:</p>
                                        <p class="text-gray-900 text-lg font-bold">{{ new Date(transaction.product.created_at).toLocaleDateString() }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav v-if="commissions?.length == 10" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3" aria-label="Pagination">
                        <div class="flex flex-1 justify-between">
                            <a
                                href="#"
                                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >Previous</a
                            >
                            <a
                                href="#"
                                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >Next</a
                            >
                        </div>
                    </nav>
                </div>

                <!-- Activity table (small breakpoint and up) -->
                <div class="hidden sm:block">
                    <div v-if="commissions?.length === 0" class="flex h-full text-center items-center flex-col justify-center px-5">
                        <zerostate />
                        <p class="text-gray-800 lg:text-2xl mb-0.5">You have no commissions yet</p>
                        <p class="text-gray-500 text-xs lg:text-normal mb-6">Click here to get started</p>
                        <RouterLink :to="{ name: 'GetStarted' }">
                            <defaultButton name=" Get Started">
                                <template v-slot:icon>
                                    <plus />
                                </template>
                            </defaultButton>
                        </RouterLink>
                    </div>
                    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" v-else>
                        <div class="mt-2 flex flex-col">
                            <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th class="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900" scope="col">
                                                Transaction Id
                                            </th>
                                            <th class="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900" scope="col">
                                                Product Name
                                            </th>
                                            <th class="bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900" scope="col">Amount</th>
                                            <th
                                                class="hidden bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                                                scope="col"
                                            >
                                                Commission Amount
                                            </th>
                                            <th class="bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-900" scope="col">
                                                Commission Percentage
                                            </th>
                                            <th class="bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-900" scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr v-for="transaction in commissions" :key="transaction.id" class="bg-white">
                                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                                                <div class="flex">
                                                    <a :href="transaction.href" class="group inline-flex space-x-2 truncate text-sm">
                                                        <BanknotesIcon
                                                            class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <p class="truncate text-gray-500 group-hover:text-gray-900">
                                                             transaction.order_number 
                                                        </p>
                                                    </a>
                                                </div>
                                            </td>
                                            <td class="w-full max-w-0 whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                <div>
                                                    <p class="truncate text-gray-700 group-hover:text-gray-900 font-semibold">
                                                        {{ transaction.product.name }}
                                                    </p>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 text-left text-sm text-gray-500">
                                                <span class="font-medium text-gray-900">{{ formatCurrency(transaction.product.price) }}</span>
                                            </td>
                                            <td class="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 md:block">
                                                <span
                                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-gray-700 font-semibold capitalize"
                                                >
                                                    {{ formatCurrency(transaction.product.price * (transaction.commission.value/100))}}
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 text-left text-sm text-gray-500">
                                                <span class="font-medium text-gray-900">{{transaction.commission.value}}%</span>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 text-right text-sm text-gray-500">
                                                <time :datetime="transaction.datetime">{{ new Date(transaction.product.created_at).toLocaleDateString() }}</time>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <nav
                                v-if="commissions?.length == 10"
                                class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
                                aria-label="Pagination"
                            >
                                <div class="flex flex-1 justify-between">
                                    <a
                                        href="#"
                                        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                        >Previous</a
                                    >
                                    <a
                                        href="#"
                                        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                        >Next</a
                                    >
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </App>
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import App from "@/layouts/App.vue";
import defaultButton from "@/components/button.vue";
import zerostate from "@/assets/svgs/zerostate.vue";
import { BanknotesIcon } from "@heroicons/vue/20/solid";
import { ref, onBeforeMount } from "vue";
import Apis from "@/services/ApiCalls";
import plus from "@/assets/svgs/plus.vue";
import { formatCurrency } from "@/utilities/GlobalFunctions";

const commissions = ref([]);
async function FetchDashboard() {
    await Apis.commission().then((res) => {
        commissions.value = res.data.result.commissions.data;
    });
}
onBeforeMount(async () => {
    await FetchDashboard();
});
</script>