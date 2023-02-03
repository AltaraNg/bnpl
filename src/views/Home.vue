<template>
  <App>
    <div class="pb-4">
      <!-- Page header -->
      <DashboardHeader />

      <div class="mt-8">
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
          <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Card -->
            <div v-for="card in cards" :key="card.name" class="overflow-hidden rounded-lg bg-white shadow">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <component :is="card.icon" class="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">
                        {{ card.name }}
                      </dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">
                          {{ card.amount }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-5 py-3">
                <div class="text-sm">
                  <a :href="card.href" class="font-medium text-cyan-700 hover:text-cyan-900">View all</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 class="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
          Recent activity
        </h2>

        <!-- Activity list (smallest breakpoint only) -->
        <div class="shadow sm:hidden">
          <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
            <li v-for="transaction in transactions" :key="transaction.id">
              <a :href="transaction.href" class="block bg-white px-4 py-4 hover:bg-gray-50">
                <span class="flex items-center space-x-4">
                  <span class="flex flex-1 space-x-2 truncate">
                    <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span class="flex flex-col truncate text-sm text-gray-500">
                      <span class="truncate">{{ transaction.name }}</span>
                      <span><span class="font-medium text-gray-900">{{
                        transaction.amount
                      }}</span>
                        {{ transaction.currency }}</span>
                      <time :datetime="transaction.datetime">{{
                        transaction.date
                      }}</time>
                    </span>
                  </span>
                  <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                </span>
              </a>
            </li>
          </ul>

          <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3" aria-label="Pagination">
            <div class="flex flex-1 justify-between">
              <a href="#"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Previous</a>
              <a href="#"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Next</a>
            </div>
          </nav>
        </div>

        <!-- Activity table (small breakpoint and up) -->
        <div class="hidden sm:block">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="mt-2 flex flex-col">
              <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="bg-gray-50 px-4  py-3 text-left text-sm font-semibold text-gray-900" scope="col">
                        Transaction Id
                      </th>
                      <th class="bg-gray-50 px-4  py-3 text-left text-sm font-semibold text-gray-900" scope="col">
                        Product Name
                      </th>
                      <th class="bg-gray-50 px-4  py-3 text-left text-sm font-semibold text-gray-900" scope="col">
                        Amount
                      </th>
                      <th class="hidden bg-gray-50 px-4  py-3 text-left text-sm font-semibold text-gray-900 md:block" scope="col">
                        Customer Name
                      </th>
                      <th class="bg-gray-50 px-4  py-3 text-center text-sm font-semibold text-gray-900" scope="col">
                        Date
                      </th>
                    </tr>
                  </thead>
                   <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="transaction in transactions" :key="transaction.id" class="bg-white">
                      <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div class="flex">
                          <a :href="transaction.href" class="group inline-flex space-x-2 truncate text-sm">
                            <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                            <p class="truncate text-gray-500 group-hover:text-gray-900">
                              {{ transaction.order }}
                            </p>
                          </a>
                        </div>
                      </td>
                      <td class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div>
                          <p class="truncate text-gray-500 group-hover:text-gray-900">
                            {{ transaction.name }}
                          </p>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <span class="font-medium text-gray-900">{{
                          transaction.amount
                        }}</span>
                        {{ transaction.currency }}
                      </td>
                      <td class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">{{ transaction["customer name"] }}</span>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <time :datetime="transaction.datetime">{{
                          transaction.date
                        }}</time>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </App>
</template>

<script setup>
import App from "@/layouts/App.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
import { ScaleIcon,  CircleStackIcon } from "@heroicons/vue/24/outline";
import { BanknotesIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";


const cards = [
  { name: "No of Sales", href: "#", icon: ScaleIcon, amount: "50" },
  { name: "Total Revenue", href: "#", icon: CircleStackIcon, amount: "₦30,659.45" },
];
const transactions = [
  {
    id: 1,
    order: "AT76SHJSJSK98JK",
    name: '65" Hisense Television',
    href: "#",
    amount: "₦20,000",
    currency: "Naira",
    "customer name": "Claudio Asuquo",
    date: "July 11, 2022",
    datetime: "2020-07-11",
  },
  {
    id: 2,
    order: "AT76SHJ345SK98JK",
    name: "Apple Iphone 12 Pro 16GB/256GB Grey Color",
    href: "#",
    amount: "₦400,000",
    currency: "Naira",
    "customer name": "Claudio Asuquo",
    date: "August 11, 2020",
    datetime: "2020-08-11",
  },
  {
    id: 3,
    order: "AT76SHJSJSK9898",
    name: "220W Sony Soundbar",
    href: "#",
    amount: "₦2,000",
    currency: "Naira",
    "customer name": "Claudio Asuquo",
    date: "March 11, 2021",
    datetime: "2020-03-11",
  },
  {
    id: 4,
    order: "AT76SHJSJSK125",
    name: "Luxury Leather Sofa Set",
    href: "#",
    amount: "₦5,000",
    currency: "Naira",
    "customer name": "Claudio Asuquo",
    date: "March 11, 2023",
    datetime: "2023-03-11",
  },
];

</script>
