<template>
    <div
        v-if="props.response?.total > props.response?.per_page"
        class="flex items-center justify-between w-full border-t border-gray-200 px-4 py-3"
        aria-label="Pagination"
    >
        <div>
            <p class="text-gray-900 text-xs md:text-base">Displaying {{ props.response?.from + "-" + props.response?.to + " of " + props.response?.total }}</p>
        </div>
        <div class="flex items-center space-x-1 text-gray-900 text-xs md:text-base">
            <p>Set Current Page:</p>
            <input
                type="number"
                v-model="current_page"
                @input="props.FetchList(current_page > props.response?.last_page ? props.response?.last_page : current_page)"
                class="cursor-pointer w-12 rounded-md border border-gray-300 bg-white p-0 pl-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-500"
            />
        </div>
        <div class="flex md:space-x-4 space-x-0 space-y-0 md:space-y-0 flex-wrap w-1/3 md:w-auto ">
            <a
                v-if="props.response?.current_page !== 1"
                @click="props.FetchList(1)"
                class=" cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >First</a
            >
            <a
                v-if="props.response?.current_page !== 1"
                @click="props.FetchList(--current_page)"
                class=" cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >Previous</a
            >
            <a
                v-if="props.response?.current_page !== props.response?.last_page"
                @click="props.FetchList(++current_page)"
                class=" items-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >Next</a
            >
            <a
                v-if="props.response?.current_page !== props.response?.last_page"
                @click="props.FetchList(props.response?.last_page)"
                class=" cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >Last</a
            >
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
const current_page = ref(1);
// const

const props = defineProps(["response", "FetchList"]);
</script>
