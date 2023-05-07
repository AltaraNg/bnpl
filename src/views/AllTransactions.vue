<template>
    <App>
        <div class="lg:pb-4">
             
       
            <div class=" mt-3 mb-3" >
                <div class="flex items-center ">
                      <div class=" p-1 block cursor-pointer lg:hidden block">
            <ArrowLeftIcon class="lg:h-10 w-10 h-6 text-indigo-600" aria-hidden="true" @click="$router.push({ name: 'Dashboard' })" />
        </div>
                <div class="w-full lg:pl-10 mt-12 mb-2">
                    <h2 class="text-lg font-semibold lg:text-2xl leading-6 lg:text-left text-center text-gray-900">All Transactions</h2>
                    
                </div>
                </div>
                 

                <!-- Activity list (smallest breakpoint only) -->
                <div class="shadow sm:hidden">
                      <div v-if="transactions?.length === 0" class="flex h-full  text-center items-center flex-col justify-center px-5">
                            <zerostate />
                            <p class="text-gray-800 lg:text-2xl mb-0.5">You have no transactions yet</p>
                            <p class="text-gray-500 text-xs lg:text-normal mb-6">Click here to get started</p>
                            <RouterLink :to="{ name: 'GetStarted' }">
                                <defaultButton name=" Get Started">
                                    <template v-slot:icon>
                                        <plus />
                                    </template>
                                </defaultButton>
                            </RouterLink>
                        </div>
                    <ul v-else role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                        <li v-for="transaction in transactions" :key="transaction.id">
                            <a  class="block bg-white px-4 py-4 hover:bg-gray-50">
                                <span class="flex items-center space-x-4">
                                    <span class="flex flex-1 space-x-2 truncate">
                                        <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span class="flex flex-col truncate text-sm text-gray-500">
                                           <span class="text-lg font-semibold">{{  transaction.customer.first_name + " " + transaction.customer.last_name }}</span>
                                         
                                            <span class="truncate">{{ transaction.bnpl_product.name }}</span>
                                            <span
                                                ><span class="font-medium text-gray-900">{{ formatCurrency(transaction.bnpl_product.price) }}</span>
                                                {{ transaction.order_number }}</span
                                            >
                                            <time :datetime="transaction.datetime">{{ transaction.order_date }}</time>
                                        </span>
                                    </span>
                                    <ChevronRightIcon class="h-5 w-5 hidden flex-shrink-0 text-gray-400" aria-hidden="true" />
                                </span>
                            </a>
                        </li>
                    </ul>

                     <Pagination :response="response" :FetchList="FetchDashboard" />
                </div>

                <!-- Activity table (small breakpoint and up) -->
                <div class="hidden sm:block">
                      <div v-if="transactions?.length === 0" class="flex h-full  text-center items-center flex-col justify-center px-5">
                            <zerostate />
                            <p class="text-gray-800 lg:text-2xl mb-0.5">You have no transactions yet</p>
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
                                                Customer Name
                                            </th>
                                            <th class="bg-gray-50 px-4 py-3 text-center text-sm font-semibold text-gray-900" scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr v-for="transaction in transactions" :key="transaction.id" class="bg-white">
                                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                                                <div class="flex">
                                                    <a :href="transaction.href" class="group inline-flex space-x-2 truncate text-sm">
                                                        <BanknotesIcon
                                                            class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <p  class="font-medium text-gray-900">
                                                            {{ transaction.order_number }}
                                                        </p>
                                                    </a>
                                                </div>
                                            </td>
                                            <td class="w-full max-w-0 whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                <div>
                                                    <p  class="font-medium text-gray-900">
                                                        {{ transaction.bnpl_product.name }}
                                                    </p>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 text-left text-sm text-gray-500">
                                                <span class="font-medium text-gray-900">{{ formatCurrency(transaction.bnpl_product.price) }}</span>
                                            </td>
                                            <td class="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 md:block">
                                                <span  class="font-medium text-gray-900">
                                                    {{ transaction.customer.first_name + " " + transaction.customer.last_name }}
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 ">
                                                <time :datetime="transaction.datetime"  class="font-medium text-gray-900">{{ transaction.order_date }}</time>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Pagination :response="response" :FetchList="FetchDashboard" />
                            
                        </div>
                    </div>
                </div>
            </div>
            <BaseModal @close="showModal = false" v-if="showModal">
                <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Coming soon</DialogTitle>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">This page is in progress</p>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-6">
                    <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                        @click="showModal = false"
                    >
                        Go back to dashboard
                    </button>
                </div>
            </BaseModal>
        </div>
    </App>
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import App from "@/layouts/App.vue";
import defaultButton from '@/components/button.vue'
import zerostate from "@/assets/svgs/zerostate.vue";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import BaseModal from "@/components/BaseModal.vue";
import { ref, onBeforeMount } from "vue";
import Apis from "@/services/ApiCalls";
import plus from "@/assets/svgs/plus.vue";
import {formatCurrency} from "@/utilities/GlobalFunctions"
import Pagination from "@/components/Pagination.vue"


const response = ref(null)
const showModal = ref(false);
const transactions =ref(undefined);
async function FetchDashboard(number) {
    await Apis.dashboarddata(number).then((res) => {
        transactions.value = []
        transactions.value.push(...res.data.result.recent_activities.data);
        response.value = res.data.result.recent_activities

    });
}
onBeforeMount(async () => {
    await FetchDashboard(1);
});
</script>
