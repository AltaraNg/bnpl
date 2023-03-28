<template>
    <div class="bg-gray-100 min-h-screen">

        <div class="w-full  flex flex-col items-center justify-center">
            <div class="bg-gradient-to-t from-blue-500 via-primary to-primary h-[191px] absolute top-0 w-full" ></div>
                     <div class="w-full  z-10 pl-2 pt-3 md:hidden">
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
                                                <span v-if="UserStatus(item) !== 'New'"
                                                    class="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 "
                                                    :class="[UserStatus(item) === 'Active' ? 'bg-green-100 text-green-800': UserStatus(item) === 'Approved' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800']"
                                                    >{{ UserStatus(item) }}</span
                                                >
                                                <span v-else class="inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ">
                                                    <button
                                                    @click="NewSale(item)"
                                                    class="border rounded bg-primary px-3 py-2 text-white"
                                                    :class="hideNewSale(item)"
                                                >
                                                    New Sale
                                                </button>
                                                </span>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="SeeMore(item)">
                                                {{ item.telephone }}
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
                                                        <p class=" font-bold  ">{{ item.first_name.charAt(0)+""+item.last_name.charAt(0) }}</p>
                                                    </div>
                                    <div class="items-center flex justify-between w-full">
                                        <div class="flex-1" @click="SeeMore(item)">
                                            <p class="text-lg font-semibold">{{ item.first_name }} {{ item.last_name }}</p>
                                            <p class="text-sm">{{ item.telephone }}</p>
                                        </div>
                                        <div class="flex flex-col items-end space-y-2">
                                             <span
                                             :class="hideNewSale(item) == 'block' ? 'hidden' : 'block'"
                                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
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
                        <div v-if="(phone_number && !FilteredCustomer?.length || Customers?.length === 0)" class="flex text-center items-center flex-col justify-center px-5">
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
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import Search from "@/components/Search";
import TableVue from "@/components/Table";
import defaultButton from "@/components/button.vue";
import zerostate from "@/assets/svgs/zerostate.vue";
import plus from "@/assets/svgs/plus.vue";
import { ref, onBeforeMount, computed,   } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Apis from "@/services/ApiCalls";
const router = useRouter();
const store = useStore()
const Customers = ref(undefined);
const phone_number = ref();
const FilteredCustomer = ref();

const SeeMore = (item) => {
    store.state.CustomerPhoneNumber = item.telephone
    router.push({ name: "CustomerDetails", params: { phone_number: item.telephone } });
};
function SearchPhoneNumber(phoneNumber) {
     phone_number.value = phoneNumber;
    FindCustomer();
}
const FindCustomer = async() => {
    const result = await Apis.searchcustomer(phone_number.value);
    FilteredCustomer.value = result.data.result.customers.data
    return phone_number.value ? FilteredCustomer.value : Customers.value?.slice(0, 10);
};
function hideNewSale(customer){
  const pending =  customer.orders.some((order)=> order.status_id == 3)
  return  ((customer?.latest_credit_checker_verifications?.status == "pending") || pending ) ? "hidden": "block"

}
function NewSale(item){
    store.dispatch('NewSale', item)
}

 function UserStatus(customer) {
  if(hideNewSale(customer) == "hidden"){
    return 'Active'
  }
  if(hideNewSale(customer) == "block" && customer.orders.length==0 && !customer?.latest_credit_checker_verifications ){
    return 'New'
  }
  if(hideNewSale(customer) == "block" && (customer.orders.length!==0 || customer?.latest_credit_checker_verifications == 'approved' )){
    return 'Approved'
  }
}
const DisplayCustomer = computed(() => {
    return phone_number.value ? FilteredCustomer.value : Customers.value?.slice(0, 10);
});
    async function AllCustomers() {
    let result = await Apis.allcustomers();
    Customers.value = result?.data.result.customers.data

}
  onBeforeMount(() => {
    AllCustomers()
});
</script>
