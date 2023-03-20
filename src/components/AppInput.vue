

<template>
    <Field
        :type="type"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :name="name"
        :value="modelValue"
        @input="updateValue"
    />
</template>
  
  <script setup>
import { Field } from "vee-validate";

defineProps({
    type: String,
    modelValue: {
        type: [String, Number],
        default: null,
        required: false,
    },
    name: String,
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event) => {
    emit("update:modelValue", event.target.value);
};
</script>
  