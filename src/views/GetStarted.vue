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
                        <template v-else>
                            <p class="text-3xl font-bold mb-2">Customers</p>
                            <div class="hidden md:block">
                                <TableVue>
                                    <template #columns>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                                    </template>
                                    <template #default>
                                        <tr v-for="item in FindCustomer() " :key="item.email" @click="SeeMore(item)" class="cursor-pointer">
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
                            <div class="block md:hidden space-y-2">
                                <div
                                    v-for="item in Customers"
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
                                        <p class="text-2xl font-semibold">{{ item.name }}</p>
                                        <p>08078697778</p>
                                    </div>
                                    <!-- <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class=" lg:hidden"> hello </SideModal> -->
                                </div>
                            </div>
                        </template>
                        <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class="">
                            <div class="lg:p-10 p-6 text-gray-800">
                                <p class="lg:text-3xl font-semibold leading-5 tracking-wider lg:mb-8 mb-4">History</p>
                                <div class=" lg:hidden" v-for="history in CustomerHistory" :key="history.order_id">
                                    <div class="bg-primary space-y-2 mb-3 lg:w-1/2 shadow rounded p-6 text-white">
                                        <div class="flex items-center justify-between">
                                            <p class="text-xs font-semibold">{{ history.order_id }}</p>
                                            <span
                                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                                    >{{history.status}}</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <p class="">{{ history.product_name }}</p>
                                            <p>{{ history.price }}</p>
                                        </div>
                                    </div>

                                </div>
                                 <TableVue class="hidden lg:block">
                                    <template #columns>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                                    </template>
                                    <template #default>
                                        <tr v-for="history in CustomerHistory" :key="history.order_id" class="cursor-pointer">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div class="flex flex-col items-start">
                                                        <div class="font-medium text-gray-900 mb-1">{{ history.product_name }}</div>
                                                        <div class="text-gray-500">{{ history.order_id }}</div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span
                                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                                                    >{{ history.status }}</span
                                                >
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.price }}</td>
                                        </tr>
                                    </template>
                                </TableVue>
                            </div>
                        </SideModal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Search from "@/components/Search";
import TableVue from "@/components/Table";
import SideModal from "../components/SideModal.vue";
export default {
    components: {
        TableVue,
        SideModal,
        Search,
    },
    data() {
        return {
            loadedSearch: true,
            sidebarOpen: null,
            Customers: [
                {
                    name: "Lindsay Walton",
                    address: "12 Jon Okon Street, Ilupeju",
                    email: "lindsay.walton@example.com",
                    phone_number: "08045334455",
                    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    history: [
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Pending",
                            price: "₦560,000",
                        },
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Completed",
                            price: "₦560,000",
                        },
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Pending",
                            price: "₦560,000",
                        },
                    ],
                },
                {
                    name: "Lindsay Walton",
                    address: "12 Jon Okon Street, Ilupeju",
                    email: "lindsay.walton@example.com",
                    phone_number: "09034441899",
                    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    history: [
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Pending",
                            price: "₦560,000",
                        },
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Completed",
                            price: "₦560,000",
                        },
                        
                    ],
                },
                {
                    name: "Lindsay Walton",
                    address: "12 Jon Okon Street, Ilupeju",
                    email: "lindsay.walton@example.com",
                    phone_number: "09866554455",
                    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    history: [
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Pending",
                            price: "₦560,000",
                        },
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Completed",
                            price: "₦560,000",
                        },
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Pending",
                            price: "₦560,000",
                        },
                    ],
                },
                {
                    name: "Lindsay Walton",
                    address: "12 Jon Okon Street, Ilupeju",
                    email: "lindsay.walton@example.com",
                    phone_number: "07044554433",
                    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    history: [
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Pending",
                            price: "₦560,000",
                        },
                        {
                            order_id: 962296152,
                            product_name: "Tecno Spark 2GB",
                            status: "Completed",
                            price: "₦560,000",
                        },
                        
                    ],
                },
            ],
            CustomerHistory: null,
            phone_number:null,
            FilteredCustomer:null
        };
    },
    methods: {
        SeeMore(item) {
            this.sidebarOpen = true;
            this.CustomerHistory = item.history;
            // this.$refs.Sidemodal.toggleSideBar()
        },
        Search(phone_number){
            this.phone_number = phone_number
        },
        FindCustomer(){ 
           this.FilteredCustomer= this.Customers.filter((customer)=>{
                return customer.phone_number.includes(this.phone_number) 
           }) 
          return this.phone_number ? this.FilteredCustomer: this.Customers.slice(0, 3)
            // console.log( this.FilteredCustomer, this.phone_number)
        },
    },
      watch: {
    "phone_number": {
      handler(newData) {
        this.FindCustomer(newData);
        // this.further_details = "";
      },
    },

  },
  mounted(){
    this.FindCustomer(this.FilteredCustomer, this.Customers)
  }
};
</script>
