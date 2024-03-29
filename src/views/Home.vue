<template>
    <App>
        <div class="pb-4">
            <!-- Page header -->
            <DashboardHeader />
       
            <div class="mt-8 pb-8" >
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                        <!-- Card -->
                        <div
                            v-for="card in cards"
                            :key="card.name"
                            class="overflow-hidden rounded-lg cursor-pointer bg-white shadow"
                            @click=" card.name == 'Commission' ? router.push({name:'Commission'}) : router.push({name:'AllTransactions'})"
                        >
                            <div class="p-5">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0">
                                        <component :is="card.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <div class="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt class="truncate text-sm font-medium text-gray-500">
                                                {{ card.name }}
                                            </dt>
                                            <dd>
                                                <div class="text-lg font-medium text-gray-900">
                                                    {{ card.amount }}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-5 py-3">
                                <div class="text-sm">
                                    <a :href="card.href" class="font-medium text-cyan-700 hover:text-cyan-900">View all</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 class="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">Recent activities</h2>

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
                        <li v-for="transaction in transactions?.slice(0, 10)" :key="transaction.id">
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
                                    <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400 hidden" aria-hidden="true" />
                                </span>
                            </a>
                        </li>
                    </ul>

                </div>

                <!-- Activity table (small breakpoint and up) -->
                <div class="hidden sm:block ">
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
                                        <tr v-for="transaction in transactions?.slice(0, 10)" :key="transaction.id" class="bg-white">
                                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
                                                <div class="flex">
                                                    <a :href="transaction.href" class="group inline-flex space-x-2 truncate text-sm">
                                                        <BanknotesIcon
                                                            class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <p class="truncate text-gray-500 group-hover:text-gray-900">
                                                            {{ transaction.order_number }}
                                                        </p>
                                                    </a>
                                                </div>
                                            </td>
                                            <td class="w-full max-w-0 whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                <div>
                                                    <p class="truncate text-gray-700 group-hover:text-gray-900 font-semibold">
                                                        {{ transaction.bnpl_product.name }}
                                                    </p>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 text-left text-sm text-gray-500">
                                                <span class="font-medium text-gray-900">{{ formatCurrency(transaction.bnpl_product.price) }}</span>
                                            </td>
                                            <td class="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 md:block">
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-gray-700  font-semibold capitalize">
                                                    {{ transaction.customer.first_name + " " + transaction.customer.last_name }}
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 text-right text-sm text-gray-500">
                                                <time :datetime="transaction.datetime">{{ transaction.order_date }}</time>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </App>
</template>

<script setup>
import App from "@/layouts/App.vue";
import defaultButton from '@/components/button.vue'
import zerostate from "@/assets/svgs/zerostate.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import {  ChartBarIcon,  ReceiptPercentIcon } from "@heroicons/vue/24/outline";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { ref, onBeforeMount } from "vue";
import Apis from "@/services/ApiCalls";
import { useRouter } from "vue-router";
import plus from "@/assets/svgs/plus.vue";
import {formatCurrency} from "@/utilities/GlobalFunctions"

const router = useRouter();
const cards = ref([]);
const transactions =ref(undefined);
async function FetchDashboard() {
    await Apis.dashboarddata().then((res) => {
        const summary = [
            { name: "No of Sales", href: "#", icon: BanknotesIcon, amount: res?.data?.result?.total_number_of_sales ||'0' },
            { name: "Total Revenue", href: "#", icon: ChartBarIcon, amount: formatCurrency(res?.data?.result?.total_revenue) || '₦0.00' },
            { name: "Commission", href: "#", icon: ReceiptPercentIcon, amount: formatCurrency(res?.data?.result?.total_commission) || '₦0.00' },
        ];
        cards.value.push(...summary);
        transactions.value = []
        transactions.value.push(...res.data.result.recent_activities.data);

    });
}
onBeforeMount(async () => {
    await FetchDashboard();
});
</script>
