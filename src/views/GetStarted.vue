<script setup>
import { reactive } from "vue";
import Search from "@/components/Search";
import Table from "@/components/Table";

const state = reactive({
    loadedSearch: true,
    orders: [
        {
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            department: 'Optimization',
            email: 'lindsay.walton@example.com',
            role: 'Member',
            image:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            department: 'Optimization',
            email: 'lindsay.walton@example.com',
            role: 'Member',
            image:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
});

</script>

<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="w-full relative flex flex-col items-center justify-center">
            <div class="bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 h-[191px] absolute top-0 w-screen" />
            <Search />
        </div>
        <div class="m-auto mt-20 w-full md:max-w-[742px] lg:max-w-[1008px]">
            <div class="px-6 md:px-0 flex flex-col">
                <div v-if="state.loadedSearch">
                    <div class="rounded-xl">
                        <div v-if="state.orders?.length === 0" class="bg-white md:w-[1008px]">
                            <p>Put in a Zero state here</p>
                        </div>
                        <template v-else>
                            <p class="text-3xl font-bold mb-2">Customers</p>
                            <div class="hidden md:block">
                                <Table>
                                    <template #columns>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
                                    </template>
                                    <template #default>
                                        <tr v-for="item in state.orders" :key="item.email">
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
                                                <div class="text-gray-900">{{ item.title }}</div>
                                                <div class="text-gray-500">{{ item.department }}</div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span
                                                    class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.role }}</td>
                                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, {{ item.name }}</span></a>
                                            </td>
                                        </tr>
                                    </template>
                                </Table>
                            </div>
                            <div class="block md:hidden space-y-2">
                                <div v-for="item in state.orders" :key="item.email" class="rounded-lg bg-white p-4 flex gap-2 shadow-lg">
                                    <img class="inline-block h-12 w-12 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="" />
                                    <div class="flex-1">
                                        <p class="text-2xl font-semibold text-gray-800">John Cook</p>
                                        <p class="font-medium text-gray-500">08078697778</p>
                                        <p class="font-medium text-gray-500">john.cook@yahoo.com</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

