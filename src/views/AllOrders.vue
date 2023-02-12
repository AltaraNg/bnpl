<script setup>
import { reactive } from "vue";
import App from "@/layouts/App.vue";
import Table from "@/components/Table";
import OrderDetails from "@/components/OrderDetails.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";

const state = reactive({
    loadedSearch: true,
    orders: [
        {
            id: 1,
            name: "Jon Cook",
            orderNumber: "AT12PL270EFG",
            productName: "65' LG 25PL1500 4K Smart Television",
            downPayment: "₦12,500.00",
            repayment: "₦4,000.00",
            percentage: "20%",
            duration: "6 Month",
            date: "Jan 3, 2023",
            status: "active",
        },
        {
            id: 2,
            name: "Jane Doe",
            orderNumber: "AT23TDF08EAA",
            productName: "120L Thermocool Deep Freezer - VN2023",
            downPayment: "₦45,500.00",
            repayment: "₦12,500.00",
            percentage: "40%",
            duration: "3 Month",
            date: "Dec 25, 2022",
            status: "completed",
        },
    ],
});
</script>

<template>
    <App>
        <div class="bg-gray-100 min-h-screen">
            <div class="m-auto w-full md:max-w-[742px] lg:max-w-[1008px]">
                <div class="px-6 md:px-0 flex flex-col pb-4">
                    <div class="mb-4 w-full block md:hidden">
                        <ArrowLeftIcon class="h-10 w-10 text-indigo-600" aria-hidden="true" />
                    </div>
                    <div v-if="state.loadedSearch">
                        <div class="rounded-xl">
                            <div v-if="state.orders?.length === 0" class="bg-white md:w-[1008px]">
                                <p>Put in a Zero state here</p>
                            </div>
                            <template v-else>
                                <p class="text-3xl font-bold mb-2 text-center sm:mt-8">All Transactions</p>
                                <div class="hidden md:block">
                                    <Table>
                                        <template #columns>
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product Name</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Downpayment</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Repayment</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Plan</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                        </template>
                                        <template #default>
                                            <tr v-for="item in state.orders" :key="item.email">
                                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div>
                                                        <div class="font-medium text-gray-900">{{ item.name }}</div>
                                                        <div class="text-gray-500">{{ item.orderNumber }}</div>
                                                    </div>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div class="text-gray-900">{{ item.productName }}</div>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div class="text-gray-900">{{ item.downPayment }}</div>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div class="text-gray-900">{{ item.repayment }}</div>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div class="text-gray-900">{{ item.duration }}</div>
                                                    <div class="text-gray-500">{{ item.percentage }}</div>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span
                                                        class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.date }}</td>
                                            </tr>
                                        </template>
                                    </Table>
                                </div>
                                <div class="block md:hidden space-y-2">
                                    <OrderDetails v-for="item in state.orders" :orderDetails="item" :key="item.productName" />
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </App>
</template>
