<template>
    <div class="lg:p-5 p-6 text-gray-800">
          <div class="mb-2 w-full block cursor-pointer">
                        <ArrowLeftIcon class="h-10 w-10 text-indigo-600" aria-hidden="true" @click="goBack" />
                    </div>
            <div class="lg:px-8 py-4 lg:py-0 lg:mb-5">
                <div class="lg:space-x-6 space-x-0 lg:flex-row flex flex-col lg:justify-center lg:items-center">
                    <span class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gray-500">
                        <span class="text-4xl font-medium leading-none text-white">{{ Customer.first_name.charAt(0)+""+Customer.last_name.charAt(0) }}</span>
                    </span>
                    <p class="text-4xl font-semibold mt-2 text-gray-800">{{ Customer.first_name + " " + Customer.last_name }}</p>
                </div>
                <div class="flex flex-col lg:items-center lg:justify-between lg:flex-row">
                    <div>
                        <p class="font-semibold mt-2">j{{ Customer.email }}</p>
                        <p class="font-semibold mt-2">{{ Customer.telephone }}</p>
                    </div>
                    <div>
                        <p class="font-semibold mt-2">{{ Customer.area_address }}</p>
                        <p class="font-medium text-gray-500 mt-2">Joined {{ Customer.date_of_registration.split(' ')[0] }}</p>
                    </div>
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md border border-transparent bg-primary p-3 text-base font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-0 justify-center mt-4 w-full lg:w-fit"
                        @click="$router.push({ name: 'CreateOrder', params: { id: Customer.id } })"
                    >
                        <plus  />
                        New Sale
                    </button>
                </div>
            </div>
            <div v-if="Customer.orders.length > 0">
                 <div class="lg:hidden">
                <div class="overflow-hidden bg-white px-4 lg:px-8 pb-6">
                    <div class="relative mx-auto max-w-xl">
                        <svg
                            class="absolute left-full translate-x-1/2 transform"
                            width="404"
                            height="404"
                            fill="none"
                            viewBox="0 0 404 404"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                        </svg>
                        <svg
                            class="absolute right-full bottom-0 -translate-x-1/2 transform"
                            width="404"
                            height="404"
                            fill="none"
                            viewBox="0 0 404 404"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                        </svg>
                        <div class="grid grid-cols-1 justify-items-center bg-green-400p pt-4">
                            <!-- <p class="mb-4 text-xl text-gray-600 font-medium">Customer Details</p> -->

                            <div class="text-left w-full mt-6 text-gray-600 text-lg font-medium">Transactions:</div>
                            <OrderDetails
                                v-for="item in Customer.orders"
                                :orderDetails="item"
                                :key="item.productName"
                                @click="VerificationStatus(item)"
                                :ColorStatus="ColorStatus(item)"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <TableVue class="hidden lg:block">
                    <template #columns>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Downpayment</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Repayment</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Percentage</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    </template>
                    <template #default>
                        <tr v-for="history in Customer.orders" class="cursor-pointer" :key="history.id" @click="VerificationStatus(history)">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div class="flex flex-col items-start">
                                    <div class="font-medium text-gray-900 mb-1">{{ history.productName }}</div>
                                    <div class="text-gray-500">{{ history.orderNumber }}</div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.downPayment }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.repayment }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.percentage }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.duration }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span
                                    class="inline-flex capitalize rounded-full px-2 text-xs font-semibold leading-5"
                                    :class="ColorStatus(history)"
                                    >{{ history.verification.status }}</span
                                >
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.date }}</td>
                        </tr>
                    </template>
                </TableVue>
            </div>
            </div>
            <div v-else class="flex items-center justify-center mt-6 lg:mt-16 flex-col">
                <zerostate/>
                <p class="text-gray-800 lg:text-2xl mb-0.5">This customer's has no sales</p>
                            <p class="text-gray-500 text-xs lg:text-normal mb-6">You can create a new sale by clicking New Sale</p>
            </div>
           
        </div>
</template>

<script setup>
import { ref , onBeforeMount} from "vue";
// import SideModal from "@/components/SideModal.vue";
import OrderDetails from "@/components/OrderDetails.vue";
import { useRoute, useRouter } from "vue-router";
import plus from "@/assets/svgs/plus.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import TableVue from "@/components/Table.vue";
import zerostate from "@/assets/svgs/zerostate.vue";
import {goBack} from "@/utilities/GlobalFunctions"
import Apis from "@/services/ApiCalls";
const route = useRoute();
 const router = useRouter()
const Customer = ref();

function VerificationStatus(history) {
    router.push({ name: "Verification", params: { verification_id: history.verification.id,verification_status: history.verification.status } });
}
function ColorStatus(history) {
    let color = "";
    switch (history.verification.status) {
        case "pending":
            color = "bg-yellow-100  text-yellow-800";
            break;
        case "failed":
            color = "bg-red-100  text-yellow-800";
            break;
        case "successful":
            color = "bg-green-100  text-green-800";
            break;
        default:
            color = "bg-gray-100 ";
    }
    return color;
}
    async function CustomerDetails() {
    const result = await Apis.customerdetails(route.params.phone_number);
    Customer.value = result?.data?.result
}
  onBeforeMount(() => {
    CustomerDetails()
});

</script>
