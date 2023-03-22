<template>
  <div class="!pt-0 ">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300"
                leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 h-full  relative overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0  items-center px-4">
                  <RouterLink :to="{name:'Dashboard'}" >
                    <img class="h-10 w-auto" src="../assets/images/logo.png" alt="Altara Credit" />
                  </RouterLink>
                  
                </div>
                <nav class="mt-5 flex flex-col  h-auto   space-y-1 px-2">
                  <router-link :to="{ name: item.slug }" v-for="item in navigation" :key="item.name">
                    <a @click="item.slug == 'login' ? logOut() : ''" :class="[
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',item.slug == 'login' ?' absolute bottom-0':''
                    ]">
                      <component :is="item.icon" :class="[
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-4 flex-shrink-0 h-6 w-6',
                      ]" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </router-link>

                </nav>
              </div>
              <div class="flex flex-shrink-0 bg-gray-700 p-4">
                <a href="#" class="group block flex-shrink-0">
                  <div class="flex items-center">
                     <div class="h-10 flex w-10 flex-shrink-0 bg-purple-300 rounded-full flex items-center justify-center">
                            <p class="font-bold ">{{ fullname[0].charAt(0) + "" + fullname[1].charAt(0) }}</p>
                        </div>
                    <div class="ml-3">
                     <RouterLink :to="{ name: 'Profile' }">
                       <p class="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                    </RouterLink>
                     
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col  bg-gray-800">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <RouterLink :to="{name:'Dashboard'}">
             <img class="h-10 w-auto" src="../assets/images/logo.png" alt="Altara Credit" /> </RouterLink>
           
          </div>
          <nav class="mt-12 flex-1  relative  px-2">
            <router-link :to="{ name: item.slug }" v-for="item in navigation" :key="item.name">
              <a @click="item.slug == 'login' ? logOut() : ''" :class="[
                item.current ? 'bg-primary text-white mb-1' : 'text-white mb-1 hover:bg-gray-400 hover:text-white',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md', item.slug == 'login' ?'absolute bottom-0':''
              ]">

                <component :is="item.icon"
                  :class="[item.current ? 'text-white bg-primary' : 'text-white group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                {{ item.name }}

              </a>
            </router-link>

          </nav>
        </div>
        <div class="flex flex-shrink-0 bg-gray-700 p-4">
          <a href="#" class="group block w-full flex-shrink-0">
            <div class="flex items-center">
                <div class="h-10 flex w-10 flex-shrink-0 bg-purple-300 rounded-full flex items-center justify-center">
                            <p class="font-bold ">{{ fullname[0].charAt(0) + "" + fullname[1].charAt(0) }}</p>
                        </div>
              <div class="ml-3">
                <!-- <p class="text-sm font-medium text-white">Tom Cook</p> -->
                <RouterLink :to="{ name: 'Profile' }">
                  <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
                </RouterLink>

              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-64 min-h-[100vh]">
      <div class="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button type="button"
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-0"
          @click="sidebarOpen = true">
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1 bg-gray-50">
        <slot></slot>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { userdata } from "../utilities/GlobalFunctions";
import router from "@/router";
import { computed } from "vue";
import Footer from "@/components/Footer"
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  HomeIcon,
  CogIcon,
  UsersIcon,
  UserGroupIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  ArrowsRightLeftIcon
} from "@heroicons/vue/24/outline";
const navigation = [
  { name: "Dashboard", icon: HomeIcon, current: false, slug: "Dashboard" },
  { name: "Profile", icon: UsersIcon, current: false, slug: "Profile" },
  { name: "Settings", icon: CogIcon, current: false, slug: "Settings" },
  { name: "Transactions", icon: ArrowsRightLeftIcon, current: false, slug: "AllTransactions" },
   { name: "All Customers", icon: UserGroupIcon, current: false, slug: "GetStarted" },
   { name: "Log Out", icon: ArrowLeftOnRectangleIcon, current: false, slug: "login" },
];
const sidebarOpen = ref(false);
function logOut() {
  localStorage.clear();
  router.push({ name: "login" });
}
const fullname = computed(() => {
    return userdata.full_name.split(" ");
});
</script>