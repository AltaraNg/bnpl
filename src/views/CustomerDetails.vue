<template>
    <App>
        <div class="overflow-hidden bg-white px-4 lg:px-8 pb-6">
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
                <div class="grid grid-cols-1 justify-items-center bg-green-400p pt-4">
                    <div class="mb-4 w-full">
                        <ArrowLeftIcon class="h-10 w-10 text-indigo-600" aria-hidden="true" />
                    </div>
                    <!-- <p class="mb-4 text-xl text-gray-600 font-medium">Customer Details</p> -->
                    <span class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gray-500">
                        <span class="text-4xl font-medium leading-none text-white">JF</span>
                    </span>
                    <p class="text-4xl font-semibold mt-2 text-gray-800">Jon Fitch</p>
                    <p class="font-semibold mt-2">jon.fitch@google.com</p>
                    <p class="font-semibold mt-2">08145679876</p>
                    <p class="font-semibold mt-2">5, Raymond Njoke Street, Off awolowo road, VI</p>
                    <p class="font-medium text-gray-500 mt-2">Joined December 6, 2018</p>

                    <button type="button"
                        class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-4 text-base font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-0 justify-center mt-4 w-full">
                        New Sale
                    </button>

                    <div class="text-left w-full mt-6 text-gray-600 text-lg font-medium">Transactions:</div>
                    <OrderDetails v-for="item in data" :orderDetails="item" :key="item.productName" />
                </div>
            </div>
        </div>
    </App>
</template>

<script setup>
import { ref } from "vue";
import App from "@/layouts/App.vue";
import OrderDetails from "@/components/OrderDetails.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";

const data = ref([
    { id: 1, orderNumber: "AT12PL270EFG", productName: "65' LG 25PL1500 4K Smart Television", downPayment: "₦12,500.00", repayment: "₦4,000.00", percentage: "20%", duration: "6 Month", date: "Jan 3, 2023" },
    { id: 2, orderNumber: "AT23TDF08EAA", productName: "120L Thermocool Deep Freezer - VN2023", downPayment: "₦45,500.00", repayment: "₦12,500.00", percentage: "40%", duration: "3 Month", date: "Dec 25, 2022" }
])
</script>
