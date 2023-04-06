<template>
    <div
        v-if="props.response?.total > props.response?.per_page"
        class="flex items-center justify-between pb-5 w-full border-t border-gray-200 px-4 py-3"
        aria-label="Pagination"
    >
        <div class="flex md:items-center md:w-1/2 w-1/3 flex-col md:flex-row md:justify-between">
            <div>
                <p class="text-gray-900 text-xs md:text-base">
                    Displaying {{ props.response?.from + "-" + props.response?.to + " of " + props.response?.total }}
                </p>
            </div>
            <div class="flex items-center space-x-1 text-gray-900 text-xs md:text-base">
                <p>Current Page:</p>
                <input
                    type="number"
                    v-bind:value="response?.current_page"
                    @input="SetPage"
                    class="cursor-pointer w-12 rounded-md border border-gray-300 bg-white p-0 pl-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-500"
                />
            </div>
        </div>

        <div class="flex ml-3 md:ml-0 space-y-0 w-3/5 md:space-y-0 flex-wrap justify-end md:w-auto">
            <div class="flex mb-2 md:mb-0">
                <a
                    v-if="props.response?.current_page !== 1"
                    @click="props.FetchList(1)"
                    class="cursor-pointer items-center min-w-[87px] text-center rounded-md mr-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >First</a
                >
                <a
                    v-if="props.response?.current_page !== 1"
                    @click="props.FetchList(--current_page)"
                    class="cursor-pointer items-center min-w-[87px] text-center rounded-md mr-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >Previous</a
                >
            </div>
            <div class="flex mb-2 md:mb-0">
                <a
                    v-if="props.response?.current_page !== props.response?.last_page"
                    @click="props.FetchList(++current_page)"
                    class="items-center cursor-pointer min-w-[87px] text-center rounded-md mr-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >Next</a
                >
                <a
                    v-if="props.response?.current_page !== props.response?.last_page"
                    @click="props.FetchList(props.response?.last_page)"
                    class="cursor-pointer items-center min-w-[87px] text-center rounded-md mr-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >Last</a
                >
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
const current_page = ref(1);
// const
const props = defineProps(["response", "FetchList"]);
function SetPage(event) {
    props.FetchList(event.target.value > props.response?.last_page ? props.response?.last_page : event.target.value);
}
</script>
