<template>
    <App>
         <div class="lg:p-5 p-6 text-gray-800   min-h-screen bg-blue-50" v-if="!store.state.loader.showLoading">
        <div class="mb-2 w-full block cursor-pointer md:hidden">
            <ArrowLeftIcon class="h-10 w-10 text-indigo-600" aria-hidden="true" @click="router.push({ name: 'GetStarted' })" />
        </div>
        <div class="lg:px-8 py-4 lg:py-0 lg:mb-10">
            <div class="lg:space-x-6 space-x-0 lg:flex-row flex flex-col lg:justify-center lg:items-center">
                <span class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                    <span class="text-4xl font-medium leading-none text-white">{{
                        Customer?.first_name?.charAt(0) + "" + Customer?.last_name?.charAt(0)
                    }}</span>
                </span>
                <p class="text-4xl font-semibold mt-2 text-gray-800">{{ Customer.first_name + " " + Customer.last_name }}</p>
            </div>
            <div class="flex flex-col lg:items-center lg:justify-between lg:flex-row">
                <div>
                    <p class="font-semibold mt-0.5">{{ Customer.email }}</p>
                    <p class="font-semibold text-primary mt-0.5">{{ Customer.telephone }}</p>
                </div>
                <div>
                    <p class="font-semibold ">{{ Customer.area_address }}</p>
                    <p class="font-semibold my-0.5">{{splitText(Customer.city) + ", "+ Customer.state+ " State" || currentOrder.branch.name  }}</p>
                    <p class="font-semibold text-primary mt-0.5">Joined {{ Customer?.date_of_registration?.split(" ")[0] }}</p>
                </div>
                <button
                    type="button"
                    :class="hideNewSale(Customer)"
                    class="inline-flex items-center rounded-md border border-transparent bg-primary p-3 text-base font-medium leading-4 text-white shadow-sm focus:outline-none focus:ring-0 justify-center mt-4 w-full lg:w-fit"
                    @click="NewSale(Customer)"
                >
                    <plus />
                    New Sale
                </button>
            </div>
        </div>
        <div v-if="Customer.latest_credit_checker_verifications">
            <div class="lg:hidden" v-if="!Customer.orders.length > 0">
                <div class="overflow-hidden px-4 lg:px-8 pb-6">
                    <div class="relative mx-auto max-w-xl">
                        <div class="grid grid-cols-1 justify-items-center bg-green-400p pt-4">
                            <div class="text-left w-full mt-6 text-gray-600 text-lg font-medium">Pending Verification:</div>
                            <div
                                class="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10 p-8 w-full mt-2"
                                @click="VerificationStatus(Customer)"
                            >
                                <div class="flex items=center justify-between">
                                    <p class="text-base font-semibold leading-8 tracking-tight text-indigo-600">Details</p>
                                    <span
                                        class="inline-flex capitalize rounded-full px-4 flex items-center justify-center text-xs font-semibold leading-5"
                                        :class="ColorStatus(Customer.latest_credit_checker_verifications.status || '')"
                                        >{{ Customer.latest_credit_checker_verifications.status || "" }}</span
                                    >
                                </div>

                                <div>
                                    <div class="flex mt-4">
                                        <div class="w-2/3">
                                            <p class="text-gray-500 text-sm font-medium">Verification ID:</p>
                                            <p class="text-lg font-semibold text-gray-600">
                                                {{ Customer.latest_credit_checker_verifications.id || "" }}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500 text-sm font-medium">Date:</p>
                                            <p class="font-semibold text-gray-600">
                                                {{ new Date(Customer.latest_credit_checker_verifications.created_at).toLocaleDateString() || "" }}
                                            </p>
                                        </div>
                                    </div>
                                    <p class="text-gray-500 text-sm font-medium mt-4">Product Price:</p>
                                    <p class="text-lg font-semibold text-gray-800">
                                        {{ formatCurrency(Customer.latest_credit_checker_verifications.product.price) || "" }}
                                    </p>
                                    <p class="text-gray-500 text-sm font-medium mt-4">Downpayment:</p>
                                    <p class="text-gray-500 text-xl font-medium mt-4">
                                        {{ Customer.latest_credit_checker_verifications.down_payment_rate.percent || "" }}% -
                                        {{ Customer.latest_credit_checker_verifications.repayment_duration.value / 30 + ' Months'|| "" }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden my-8 lg:flex flex-col justify-center pl-8 items-center w-full" v-if="!Customer.orders.length > 0">
                <div class="text-left w-full text-center my-6 text-gray-600 text-2xl font-semibold">Pending Verification:</div>
                <TableVue class="w-2/3">
                    <template #columns>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product Price</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Downpayment</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    </template>
                    <template #default>
                        <tr class="cursor-pointer" @click="VerificationStatus(Customer)">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div class="flex flex-col items-start">
                                    <div class="font-medium text-gray-900 mb-1">
                                        {{ formatCurrency(Customer.latest_credit_checker_verifications.product.price) || "" }}
                                    </div>
                                    <div class="text-gray-500">
                                        <span>Verification ID: </span>{{ Customer.latest_credit_checker_verifications.id || "" }}
                                    </div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ Customer.latest_credit_checker_verifications.down_payment_rate.percent || "" }}%
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ Customer.latest_credit_checker_verifications.repayment_duration.value / 30 + ' Months'|| "" }}

                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span
                                    class="inline-flex capitalize rounded-full px-4 flex items-center justify-center text-xs font-semibold leading-5"
                                    :class="ColorStatus(Customer.latest_credit_checker_verifications.status || '')"
                                    >{{ Customer.latest_credit_checker_verifications.status || "" }}</span
                                >
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ new Date(Customer.latest_credit_checker_verifications.created_at).toLocaleDateString() || "" }}
                            </td>
                        </tr>
                    </template>
                </TableVue>
            </div>
            <div v-if="Customer.orders.length > 0">
            <div class="lg:hidden">
                <div class="overflow-hidden px-4 lg:px-8 pb-6">
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
                        <div class="grid grid-cols-1 justify-items-center pt-4">
                            <!-- <p class="mb-4 text-xl text-gray-600 font-medium">Customer Details</p> -->

                            <div class="text-left w-full mt-6 text-gray-600 text-lg font-medium">Transactions:</div>
                            <OrderDetails
                                v-for="item in Customer.orders"
                                :orderDetails="item"
                                :key="item.productName"
                                :ColorStatus="ColorStatus(item.status_id)"
                                :orderStatus="orderStatus(item)"
                                :repayment_duration="repayment_duration"
                                :repayment_cycle="repayment_cycle"
                                :findRepayment="findRepayment"
                                :findRepaymentDuration="findRepaymentDuration"
                                @click="ShowAmmortization(item)"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <TableVue class="hidden lg:block">
                    <template #columns>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Product Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Product Price</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Downpayment</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Repayment</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Duration/Cycle</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Status</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Date</th>
                    </template>
                    <template #default>
                        <tr v-for="history in Customer.orders" class="cursor-pointer" :key="history.id" @click="ShowAmmortization(history)">
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ history.bnpl_product.name }}</td>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div class="flex flex-col items-start">
                                    <div class="font-medium text-gray-900 mb-1">{{ formatCurrency(history.product_price) }}</div>
                                    <div class="text-gray-900">{{ history.order_number }}</div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ formatCurrency(history.down_payment) }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                {{ formatCurrency(history.amortizations[0].expected_amount) }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                {{ findRepaymentDuration(history.repayment_duration_id, repayment_duration) }}/
                                {{ findRepayment(history.repayment_cycle_id, repayment_cycle) }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span
                                    class="inline-flex capitalize rounded-full px-4 py-1 text-xs font-semibold leading-5"
                                    :class="ColorStatus(history.status_id)"
                                    >{{ orderStatus(history) }}</span
                                >
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.order_date }}</td>
                        </tr>
                    </template>
                </TableVue>
            </div>
        </div>
        </div>

        
        <div v-else class="flex items-center justify-center mt-6 lg:mt-16 flex-col" :class="hideNewSale(Customer)">
            <zerostate />
            <p class="text-gray-800 lg:text-2xl mb-0.5">This customer's has no sales</p>
            <p class="text-gray-500 text-xs lg:text-normal mb-6">You can create a new sale by clicking New Sale</p>
        </div>
        <BaseModal @close="showModal = false" v-if="showModal">
            <div class="block w-full space-y-10">
                <div>
                    <p class="text-lg mb-1 font-semibold mt-2 text-gray-800">Payment Summary</p>
                    <TableVue>
                        <template #columns>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ProductName</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product Price</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Repayment</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Downpayment</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Branch</th>
                        </template>
                        <template #default>
                            <tr v class="cursor-pointer">
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{ currentOrder.bnpl_product.name  }}
                                </td>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div class="flex flex-col items-start">
                                        <div class="font-medium text-gray-900 mb-1">{{ formatCurrency(currentOrder.product_price) }}</div>
                                        <div class="text-gray-500">{{ currentOrder.order_number }}</div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatCurrency(currentOrder.repayment) }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{ formatCurrency(currentOrder.down_payment) }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span
                                        class="inline-flex capitalize rounded-full px-2 text-xs font-semibold leading-5"
                                        :class="ColorStatus(currentOrder.status_id)"
                                        >{{ orderStatus(currentOrder) }}</span
                                    >
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{splitText(Customer.city) + ", "+ Customer.state+ " State" || currentOrder.branch.name  }}
                                </td>
                            </tr>
                        </template>
                    </TableVue>
                </div>
                <div>
                    <p class="text-lg mb-1 font-semibold mt-2 text-gray-800">Amortizations</p>
                    <TableVue>
                        <template #columns>
                            <th scope="col" class="px-5 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                            <th
                                scope="col"
                                class="px-5 py-3.5 text-left text-sm font-semibold text-gray-900"
                                v-for="amortization in currentOrder.amortizations"
                                :key="amortization"
                            >
                                {{ amortization.expected_payment_date }}
                            </th>
                        </template>
                        <template #default>
                            <tr>
                                <td class="whitespace-nowrap px-5 py-4 text-sm text-gray-500">Amount</td>
                                <td
                                    class="whitespace-nowrap px-5 py-4 text-sm text-gray-500"
                                    v-for="amortization in currentOrder.amortizations"
                                    :key="amortization"
                                >
                                    {{ formatCurrency(amortization.expected_amount) }}
                                </td>
                            </tr>
                        </template>
                    </TableVue>
                </div>
            </div>
            <div class="mt-5 sm:mt-6 w-full flex justify-end">
                <button
                    type="button"
                    class="inline-flex px-5 py-2 justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                    @click="showModal = false"
                >
                    Close
                </button>
            </div>
        </BaseModal>
    </div>
    </App>
   
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import OrderDetails from "@/components/OrderDetails.vue";
import { useRoute, useRouter } from "vue-router";
import plus from "@/assets/svgs/plus.vue";
import { useStore } from "vuex";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import TableVue from "@/components/Table.vue";
import zerostate from "@/assets/svgs/zerostate.vue";
import { formatCurrency } from "@/utilities/GlobalFunctions";
import Apis from "@/services/ApiCalls";
import App from "@/layouts/App.vue"

const store = useStore();
const showModal = ref(false);
const currentOrder = ref({});
const route = useRoute();
const router = useRouter();
const repayment_duration = ref();
const repayment_cycle = ref([
    {
        slug: "monthly",
        name: "Monthly",
        id: 2,
        value: 28,
    },
    {
        slug: "bi-monthly",
        name: "Bi-Monthly",
        id: 1,
        value: 14,
    },
]);
const Customer = ref({  
    first_name:'',
    last_name:'',
    orders:[]
});

function NewSale(item) {
    store.dispatch("NewSale", item);
}
function ShowAmmortization(history) {
    showModal.value = true;
    currentOrder.value = history;
}
function VerificationStatus(customer) {
    customer.latest_credit_checker_verifications.status == "passed"
        ? router.push({
              name: "SuccessfulVerification",
              params: { verification_id: customer.latest_credit_checker_verifications.id, phone_number: customer.telephone, OTPvalidate: "false" },
          })
        : customer.latest_credit_checker_verifications.status == "failed"
        ? router.push({
              name: "FailedVerification",
              params: { verification_id: customer.latest_credit_checker_verifications.id, phone_number: customer.telephone },
          })
        : router.push({
              name: "Verification",
              params: {
                  verification_id: customer.latest_credit_checker_verifications.id,
                  phone_number: customer.telephone,
              },
          });
}
function ColorStatus(status) {
    let color = "";
    switch (status) {
        case 3:
            color = "bg-yellow-100  text-yellow-800";
            break;
        case 5:
            color = "bg-red-100  text-yellow-800";
            break;
        case 6:
            color = "bg-green-100  text-green-800";
            break;
        case "pending":
            color = "bg-yellow-300  text-yellow-900";
            break;
        case "passed":
            color = "bg-green-100  text-green-800";
            break;
        case "failed":
            color = "bg-red-100  text-red-800";
            break;
        default:
            color = "bg-gray-100 ";
    }
    return color;
}
function orderStatus(history) {
    let status = "";
    switch (history.status_id) {
        case 3:
            status = "Active";
            break;
        case 5:
            status = "Repossessed";
            break;
        case 6:
            status = "Completed";
            break;
        default:
            status = "waiting ";
    }
    return status;
}
function hideNewSale(customer) {
    const pending = customer.orders?.some((order) => order.status_id == 3);
    return (customer?.latest_credit_checker_verifications?.status ) || pending ? "hidden" : "block";
}

async function CustomerDetails() {
    const result = await Apis.customerdetails(route.params.phone_number);
    Customer.value = result?.data?.result;
}
async function RepaymentDuration() {
    const result = await Apis.repaymentduration();
    repayment_duration.value = result?.data?.data?.data.filter((duration) => {
        return duration.name !== "nine_months";
    });
}
function findRepayment(customerData, array) {
    const result = array.find((data) => {
        return data.id == customerData;
    });
    return result?.name?.replace(/_/g, " ") ?? "";
}
function findRepaymentDuration(customerData, array) {
    const result = array.find((data) => {
        return data.id == customerData;
    });
    return `${result.value / 30} Months`
}
function splitText(text){
    return text?.split("_").join(" ");
}

onBeforeMount(async () => {
    await RepaymentDuration();
    CustomerDetails();
});
</script>
