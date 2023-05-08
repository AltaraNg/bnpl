<template>
    <Field
        :name="name"
        ref="inputRef"
        type="text"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
</template>

<script >
import { Field } from "vee-validate";
import { useCurrencyInput } from "vue-currency-input";
import { watchDebounced } from "@vueuse/core";
export default {
    components: {
        Field,
    },
    name: "CurrencyInput",
    props: {
        modelValue: Number, // Vue 2: value
        options: Object,
        name: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const { inputRef, numberValue } = useCurrencyInput(props.options, false);

        watchDebounced(numberValue, (value) =>  emit("update:modelValue", value), { debounce: 500 });
       
        return { inputRef };
    },
};
</script>