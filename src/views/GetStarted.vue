<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="w-full relative flex flex-col items-center justify-center">
            <div class="bg-gradient-to-t from-blue-500 via-primary to-primary h-[191px] absolute top-0 w-full" />
            <Search @search="Search" />
        </div>
        <div class="m-auto mt-20 w-full md:max-w-[742px] lg:max-w-[1008px]">
            <div class="px-6 md:px-0 flex flex-col">
                <div v-if="loadedSearch">
                    <div class="rounded-xl">
                        <div v-if="Customers?.length === 0" class="bg-white md:w-[1008px]">
                            <p>Put in a Zero state here</p>
                        </div>
                        <template v-if="!(phone_number && !FilteredCustomer.length)">
                            <p class="text-3xl font-bold mb-2">Customers</p>
                            <div class="hidden md:block" >
                                <TableVue  >
                                    <template #columns >
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                                    </template>
                                    <template #default>
                                        <tr v-for="item in DisplayCustomer" :key="item.email" @click="SeeMore(item)" class="cursor-pointer">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div class="flex items-center">
                                                    <div class="h-10 w-10 flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full" :src="item.image" alt="" />
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="font-medium text-gray-900">{{ item.name }}</div>
                                                        <div class="text-gray-500">{{ item.email }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{ item.address }}</div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span
                                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                                    >Active</span
                                                >
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.phone_number }}</td>
                                        </tr>
                                    </template>
                                </TableVue>
                            </div>
                            <div class="block md:hidden space-y-2" >
                                <div
                                    v-for="item in DisplayCustomer"
                                    :key="item.email"
                                    class="rounded-lg bg-white p-4 flex items-center gap-2 shadow-lg"
                                    @click="SeeMore(item)"
                                >
                                    <img
                                        class="inline-block h-12 w-12 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <div class="flex-1">
                                        <p class="text-lg font-semibold">{{ item.name }}</p>
                                        <p class="text-sm">{{ item.phone_number }}</p>
                                    </div>
                                    <!-- <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class=" lg:hidden"> hello </SideModal> -->
                                </div>
                            </div>
                        </template>
                        <div v-if="phone_number && !FilteredCustomer.length" class="flex  text-center items-center flex-col justify-center px-5">
                            <zerostate/>
                            <p class="text-gray-800  lg:text-2xl mb-0.5">This customer's phone number does not exist</p>
                            <p class="text-gray-500 text-xs lg:text-normal mb-6">You can create an acount by clicking below</p>
                            <RouterLink :to="{name:'SignUp'}" >
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
<script>
import Search from "@/components/Search";
import TableVue from "@/components/Table";
import defaultButton from '@/components/button.vue'
import zerostate from '@/assets/svgs/zerostate.vue'
import plus from '@/assets/svgs/plus.vue'
export default {
    components: {
        TableVue,
        Search,
        defaultButton,
        zerostate,plus
    },
    data() {
        return {
            loadedSearch: true,
            sidebarOpen: null,
            Customers: this.$store.state.Customers,
            CustomerHistory: null,
            phone_number: null,
            FilteredCustomer: null,
            Customer: null,
            data: [
                {
                    id: 1,
                    orderNumber: "AT12PL270EFG",
                    productName: "65' LG 25PL1500 4K Smart Television",
                    downPayment: "₦12,500.00",
                    repayment: "₦4,000.00",
                    percentage: "20%",
                    duration: "6 Month",
                    date: "Jan 3, 2023",
                    verification:{
                        id:1,
                        status:'awaiting'
                    }
                },
                {
                    id: 2,
                    orderNumber: "AT23TDF08EAA",
                    productName: "120L Thermocool Deep Freezer - VN2023",
                    downPayment: "₦45,500.00",
                    repayment: "₦12,500.00",
                    percentage: "40%",
                    duration: "3 Month",
                    date: "Dec 25, 2022",
                    verification:{
                                id:1,
                                status:'failed'
                            }
                },
            ],
        };
    },
    methods: {
        SeeMore(item) {
            this.$router.push({name:'CustomerDetails', params:{phone_number: item.phone_number}})

            // this.$refs.Sidemodal.toggleSideBar()
        },
        Search(phone_number) {
            this.phone_number = phone_number;
            this.FindCustomer();
        },
        FindCustomer() {
            this.FilteredCustomer = this.Customers.filter((customer) => {
                return customer.phone_number.includes(this.phone_number);
            });
            return this.phone_number ? this.FilteredCustomer : this.Customers.slice(0, 3);
            // console.log( this.FilteredCustomer, this.phone_number)
        },
        
    
    },
    computed: {
        DisplayCustomer() {
            return this.phone_number ? this.FilteredCustomer : this.Customers.slice(0, 3);
            // console.log( this.FilteredCustomer, this.phone_number)
        },
        
    },
};
</script>
