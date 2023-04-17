<template>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 " @close="toggleSideBar">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-50" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full  lg:flex-1 flex-col bg-white">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300"
                leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute  top-0 right-5 lg:right-0 lg:-mr-12 pt-2">
                  <button type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="toggleSideBar">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-gray-800" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <slot></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="lg:w-14 lg:flex-shrink-0">
            
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>

<script setup>
import {
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ref,} from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const sidebarOpen = ref(true);
const emit = defineEmits(['close'])
function toggleSideBar(){
    sidebarOpen.value = !sidebarOpen.value
    emit('close')
}

</script>
