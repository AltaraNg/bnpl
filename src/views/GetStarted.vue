<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="w-full flex flex-col items-center justify-center">
            <div class="bg-gradient-to-t from-blue-500 via-primary to-primary h-[191px] absolute top-0 w-full"></div>
            <div class="w-full z-10 pl-2 pt-3 md:hidden">
                <ArrowLeftIcon class="cursor-pointer h-8 w-10 text-white" @click="router.push({ name: 'Dashboard' })" />
            </div>
            <Search @search="SearchPhoneNumber" />
        </div>
        <div class="m-auto mt-20 w-full md:max-w-[742px] lg:max-w-[1008px]">
            <div class="px-6 md:px-0 flex flex-col">
                <div>
                    <div class="rounded-xl">
                        <template v-if="!(phone_number && !FilteredCustomer?.length)">
                            <p class="text-3xl font-bold mb-2">Customers</p>
                            <div class="hidden mb-8 md:block">
                                <TableVue>
                                    <template #columns v-if="Customers?.length !== 0">
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                                        <th></th>
                                    </template>
                                    <template #default>
                                        <tr v-for="item in DisplayCustomer" :key="item.email" class="cursor-pointer">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6" @click="SeeMore(item)">
                                                <div class="flex items-center">
                                                    <div class="h-10 w-10 flex-shrink-0 bg-purple-300 rounded-full flex items-center justify-center">
                                                        <p class="font-bold">{{ item.first_name.charAt(0) + "" + item.last_name.charAt(0) }}</p>
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="font-medium text-gray-900">{{ item.first_name + " " + item.last_name }}</div>
                                                        <div class="text-gray-500">{{ item.email }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="SeeMore(item)">
                                                <div class="text-gray-900">{{ item.area_address }}</div>
                                            </td>
                                            <td class="whitespace-nowrap py-4 text-sm text-gray-500">
                                                <span
                                                    v-if="hideNewSale(item) == 'hidden'"
                                                    @click="SeeMore(item)"
                                                    class="inline-flex rounded-full captalize px-2 text-xs font-semibold leading-5"
                                                    :class="[
                                                        UserStatus(item) === 'Active'
                                                            ? 'bg-green-100 text-green-800'
                                                            : UserStatus(item) === 'Approved'
                                                            ? 'bg-gray-100 text-gray-800'
                                                            : 'bg-yellow-100 text-yellow-800',
                                                    ]"
                                                    >{{ UserStatus(item) }}</span
                                                >

                                                <button
                                                    @click="NewSale(item)"
                                                    class="border rounded-full bg-primary px-3 py-1 text-white"
                                                    :class="hideNewSale(item)"
                                                >
                                                    New Sale
                                                </button>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="SeeMore(item)">
                                                {{ item.telephone }}
                                            </td>
                                            <td  >
                                                <router-link
                                                    :to="{
                                                        name: 'AdditionalVerification',
                                                        params: {
                                                            verification_id: item.latest_credit_checker_verifications.id,
                                                            phone_number: item.telephone,
                                                        },
                                                    }"
                                                    class="border rounded-full bg-primary px-3 py-1 text-white"
                                                   v-if="UserStatus(item) == 'failed' && !item.latest_credit_checker_verifications?.documents[0]?.document_url"
                                                >
                                                    Upload Document</router-link
                                                >
                                            </td>
                                        </tr>
                                    </template>
                                </TableVue>
                            </div>
                            <div class="block md:hidden space-y-2">
                                <div
                                    v-for="item in DisplayCustomer"
                                    :key="item.email"
                                    class="rounded-lg bg-white p-4 flex items-center gap-2 shadow-lg"
                                >
                                    <div class="h-10 w-10 flex-shrink-0 bg-purple-300 rounded-full flex items-center justify-center">
                                        <p class="font-bold">{{ item.first_name.charAt(0) + "" + item.last_name.charAt(0) }}</p>
                                    </div>
                                    <div class="items-center flex justify-between w-full">
                                        <div class="flex-1" @click="SeeMore(item)">
                                            <p class="text-lg font-semibold">{{ item.first_name }} {{ item.last_name }}</p>
                                            <p class="text-sm">{{ item.telephone }}</p>
                                        </div>
                                        <div class="flex flex-col items-end space-y-2">
                                            <span
                                                :class="hideNewSale(item) == 'block' ? 'hidden' : 'block'"
                                                class="inline-flex rounded-full capitaize bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                                >{{ UserStatus(item) }}</span
                                            >
                                            <button
                                                @click="NewSale(item)"
                                                class="border text-xs rounded bg-primary px-3 py-2 text-white"
                                                :class="hideNewSale(item)"
                                            >
                                                New Sale
                                            </button>
                                        </div>
                                    </div>

                                    <!-- <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class=" lg:hidden"> hello </SideModal> -->
                                </div>
                            </div>
                        </template>
                        <div
                            v-if="Customers?.length == 0 || (!FilteredCustomer?.length && phone_number)"
                            class="flex items-center flex-col justify-center"
                        >
                            <ZeroState
                                :response="
                                    phone_number && !FilteredCustomer?.length
                                        ? 'This customers phone number does not exist'
                                        : 'You have no transactions yet'
                                "
                                suggestion="you can create an acount by clicking below"
                            ></ZeroState>
                            <RouterLink :to="{ name: 'CreateCustomer', params: { telephone: phone_number } }">
                                <defaultButton name=" Create Account">
                                    <template v-slot:icon>
                                        <plus />
                                    </template>
                                </defaultButton>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import Search from "@/components/Search";
import TableVue from "@/components/Table";
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import defaultButton from "@/components/button.vue";
import plus from "@/assets/svgs/plus.vue";
import ZeroState from "@/components/ZeroState.vue";
import Apis from "@/services/ApiCalls";
const router = useRouter();
const store = useStore();
const Customers = ref(undefined);
const phone_number = ref(0);
const FilteredCustomer = ref();

const SeeMore = (item) => {
    store.state.CustomerPhoneNumber = item.telephone;
    router.push({ name: "CustomerDetails", params: { phone_number: item.telephone } });
};
function SearchPhoneNumber(phoneNumber) {
    phone_number.value = phoneNumber;
    FindCustomer();
}
const FindCustomer = async () => {
    const result = await Apis.searchcustomer(phone_number.value);
    FilteredCustomer.value = result.data.result.customers.data;
    return phone_number.value ? FilteredCustomer.value : Customers.value?.slice(0, 10);
};
function hideNewSale(customer) {
    if (UserStatus(customer)) {
        return UserStatus(customer) !== "failed" && UserStatus(customer) !== "Completed" ? "hidden" : "block";
    }
}
function NewSale(item) {
    store.dispatch("NewSale", item);
}
function OrderStatus(order) {
    let status = "";
    switch (order) {
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
            status = null;
    }
    return status;
}

function UserStatus(customer) {
    const lastOrder = OrderStatus(customer?.orders[customer.orders.length - 1]?.status_id);
    const lastVerification = customer?.latest_credit_checker_verifications?.status;
    if (lastOrder && lastOrder !== "Completed" && lastVerification) {
        return lastOrder;
    } else if ((!lastOrder || lastOrder === "Completed") && lastVerification !== "passed") {
        return lastVerification;
    }else if ((lastOrder && lastOrder === "Completed") && lastVerification == "passed") {
        return lastOrder;
    }  else {
        return lastVerification;
    }
}
const DisplayCustomer = computed(() => {
    return phone_number.value ? FilteredCustomer.value : Customers.value?.slice(0, 10);
});
async function AllCustomers() {
    let result = await Apis.allcustomers();
    Customers.value = result?.data.result.customers.data;
}
onBeforeMount(() => {
    AllCustomers();
});
</script>
