<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="w-full relative flex flex-col items-center justify-center">
            <div class="bg-gradient-to-t from-blue-500 via-primary to-primary h-[191px] absolute top-0 w-full" />
            <Search @search="SearchPhoneNumber" />
        </div>
        <div class="m-auto mt-20 w-full md:max-w-[742px] lg:max-w-[1008px]">
            <div class="px-6 md:px-0 flex flex-col">
                <div>
                    <div class="rounded-xl">
                        <div v-if="Customers?.length === 0" class="bg-white md:w-[1008px]">
                            <p>Put in a Zero state here</p>
                        </div>
                        <template v-if="!(phone_number && !FilteredCustomer.length)">
                            <p class="text-3xl font-bold mb-2">Customers</p>
                            <div class="hidden md:block">
                                <TableVue>
                                    <template #columns>
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
                                                        <p class=" font-bold  ">{{ item.first_name.charAt(0)+""+item.last_name.charAt(0) }}</p>
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
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="SeeMore(item)">
                                                <span
                                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                                    >New</span
                                                >
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="SeeMore(item)">
                                                {{ item.telephone }}
                                            </td>
                                            <td class="whitespace-nowrap py-4 text-sm text-gray-500">
                                                <button
                                                    @click="$router.push({ name: 'CreateOrder', params: { id: item.id } })"
                                                    class="border rounded bg-primary px-3 py-2 text-white"
                                                >
                                                    New Sale
                                                </button>
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
                                    <img
                                        class="inline-block h-12 w-12 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <div class="items-center flex justify-between w-full">
                                        <div class="flex-1" @click="SeeMore(item)">
                                            <p class="text-lg font-semibold">{{ item.first_name }} {{ item.last_name }}</p>
                                            <p class="text-sm">{{ item.phone_number }}</p>
                                        </div>
                                        <button
                                            @click="$router.push({ name: 'CreateOrder', params: { id: item.id } })"
                                            class="border text-xs rounded bg-primary px-3 py-2 text-white"
                                        >
                                            New Sale
                                        </button>
                                    </div>

                                    <!-- <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class=" lg:hidden"> hello </SideModal> -->
                                </div>
                            </div>
                        </template>
                        <div v-if="phone_number && !FilteredCustomer.length" class="flex text-center items-center flex-col justify-center px-5">
                            <zerostate />
                            <p class="text-gray-800 lg:text-2xl mb-0.5">This customer's phone number does not exist</p>
                            <p class="text-gray-500 text-xs lg:text-normal mb-6">You can create an acount by clicking below</p>
                            <RouterLink :to="{ name: 'CreateCustomer' }">
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
import Search from "@/components/Search";
import TableVue from "@/components/Table";
import defaultButton from "@/components/button.vue";
import zerostate from "@/assets/svgs/zerostate.vue";
import plus from "@/assets/svgs/plus.vue";
import { ref, onBeforeMount, computed,   } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import Apis from "@/services/ApiCalls";
const router = useRouter();
const Customers = ref(undefined);
const phone_number = ref();
const FilteredCustomer = ref();

const SeeMore = (item) => {
    router.push({ name: "CustomerDetails", params: { phone_number: item.telephone } });
};
function SearchPhoneNumber(phoneNumber) {
     phone_number.value = phoneNumber;
    
    FindCustomer();
}
const FindCustomer = () => {
    FilteredCustomer.value = Customers.value.filter((customer) => {
        return customer.telephone.includes(phone_number.value);
    });
    return phone_number.value ? FilteredCustomer.value : Customers.value?.slice(0, 3);
    // console.log( FilteredCustomer, phone_number.value)
};
const DisplayCustomer = computed(() => {
    return phone_number.value ? FilteredCustomer.value : Customers.value?.slice(0, 3);
});
    async function AllCustomers() {
    const result = await Apis.allcustomers();
    Customers.value = result?.data.result.customers.data
}
  onBeforeMount(() => {
    AllCustomers()
});
</script>
