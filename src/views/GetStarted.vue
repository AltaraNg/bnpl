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
                            <div class="block md:hidden space-y-2">
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
                                        <p class="text-2xl font-semibold">{{ item.name }}</p>
                                        <p>{{ item.phone_number }}</p>
                                    </div>
                                    <!-- <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class=" lg:hidden"> hello </SideModal> -->
                                </div>
                            </div>
                        </template>
                        <SideModal v-if="sidebarOpen" @close="sidebarOpen = false" class="">
                            <div class="lg:p-5 p-6 text-gray-800">
                                <div class="lg:border lg:w-1/2 lg:rounded lg:px-8 py-4 lg:shadow-lg lg:mb-5">
                                    <div class="lg:space-x-6 space-x-0 flex flex-col lg:items-center lg:flex-row">
                                        <span class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gray-500">
                                            <span class="text-4xl font-medium leading-none text-white">{{ Customer.name.charAt(0) }}</span>
                                        </span>
                                        <p class="text-4xl font-semibold mt-2 text-gray-800">{{ Customer.name }}</p>
                                    </div>
                                    <div class="flex flex-col lg:items-center lg:justify-between lg:flex-row">
                                        <div>
                                            <p class="font-semibold mt-2">j{{ Customer.email }}</p>
                                            <p class="font-semibold mt-2">{{ Customer.phone_number }}</p>
                                        </div>
                                        <div>
                                            <p class="font-semibold mt-2">{{ Customer.address }}</p>
                                            <p class="font-medium text-gray-500 mt-2">Joined December 6, 2018</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        class="inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-4 text-base font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-0 justify-center mt-4 w-full"
                                    >
                                        New Sale
                                    </button>
                                </div>
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
                                                    <pattern
                                                        id="85737c0e-0916-41d7-917f-596dc7edfa27"
                                                        x="0"
                                                        y="0"
                                                        width="20"
                                                        height="20"
                                                        patternUnits="userSpaceOnUse"
                                                    >
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
                                                    <pattern
                                                        id="85737c0e-0916-41d7-917f-596dc7edfa27"
                                                        x="0"
                                                        y="0"
                                                        width="20"
                                                        height="20"
                                                        patternUnits="userSpaceOnUse"
                                                    >
                                                        <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                                    </pattern>
                                                </defs>
                                                <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                                            </svg>
                                            <div class="grid grid-cols-1 justify-items-center bg-green-400p pt-4">
                                                <!-- <p class="mb-4 text-xl text-gray-600 font-medium">Customer Details</p> -->

                                                <div class="text-left w-full mt-6 text-gray-600 text-lg font-medium">Transactions:</div>
                                                <OrderDetails v-for="item in CustomerHistory" :orderDetails="item" :key="item.productName" />
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
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                        </template>
                                        <template #default>
                                            <tr v-for="history in CustomerHistory" :key="history.id" class="cursor-pointer">
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
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ history.date }}</td>
                                            </tr>
                                        </template>
                                    </TableVue>
                                </div>
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
import OrderDetails from "@/components/OrderDetails.vue";
export default {
    components: {
        TableVue,
        SideModal,
        Search,
        OrderDetails,
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
                            id: 1,
                            orderNumber: "AT12PL270EFG",
                            productName: "65' LG 25PL1500 4K Smart Television",
                            downPayment: "₦12,500.00",
                            repayment: "₦4,000.00",
                            percentage: "20%",
                            duration: "6 Month",
                            date: "Jan 3, 2023",
                        },
                        {
                            id: 1,
                            orderNumber: "AT12PL270EFG",
                            productName: "65' LG 25PL1500 4K Smart Television",
                            downPayment: "₦12,500.00",
                            repayment: "₦4,000.00",
                            percentage: "20%",
                            duration: "6 Month",
                            date: "Jan 3, 2023",
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
                            id: 1,
                            orderNumber: "AT12PL270EFG",
                            productName: "65' LG 25PL1500 4K Smart Television",
                            downPayment: "₦12,500.00",
                            repayment: "₦4,000.00",
                            percentage: "20%",
                            duration: "6 Month",
                            date: "Jan 3, 2023",
                        },
                        {
                            id: 1,
                            orderNumber: "AT12PL270EFG",
                            productName: "65' LG 25PL1500 4K Smart Television",
                            downPayment: "₦12,500.00",
                            repayment: "₦4,000.00",
                            percentage: "20%",
                            duration: "6 Month",
                            date: "Jan 3, 2023",
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
                            id: 2,
                            orderNumber: "AT23TDF08EAA",
                            productName: "120L Thermocool Deep Freezer - VN2023",
                            downPayment: "₦45,500.00",
                            repayment: "₦12,500.00",
                            percentage: "40%",
                            duration: "3 Month",
                            date: "Dec 25, 2022",
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
                            id: 1,
                            orderNumber: "AT12PL270EFG",
                            productName: "65' LG 25PL1500 4K Smart Television",
                            downPayment: "₦12,500.00",
                            repayment: "₦4,000.00",
                            percentage: "20%",
                            duration: "6 Month",
                            date: "Jan 3, 2023",
                        },
                        {
                            id: 1,
                            orderNumber: "AT12PL270EFG",
                            productName: "65' LG 25PL1500 4K Smart Television",
                            downPayment: "₦12,500.00",
                            repayment: "₦4,000.00",
                            percentage: "20%",
                            duration: "6 Month",
                            date: "Jan 3, 2023",
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
                        },
                    ],
                },
            ],
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
                },
            ],
        };
    },
    methods: {
        SeeMore(item) {
            this.sidebarOpen = true;
            this.Customer = item;
            this.CustomerHistory = item.history;
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
    // watch: {
    //     phone_number: {
    //         handler(newData) {
    //             this.FindCustomer(newData);
    //             // this.further_details = "";
    //         },
    //     },
    // },
    computed: {
        DisplayCustomer() {
            return this.phone_number ? this.FilteredCustomer : this.Customers.slice(0, 3);
            // console.log( this.FilteredCustomer, this.phone_number)
        },
    },
};
</script>
