<template>
    <Field
        id="default"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        as="select"
        :name="name"
        :value="modelValue"
        @input="updateValue"
    >
        <slot></slot>
    </Field>
</template>
  
  <script setup>
import { Field } from "vee-validate";
defineProps({
    modelValue: {
        type: [String, Boolean, Number],
        default: "",
        required: false,
    },
    name: String,
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event) => {
    emit("update:modelValue", event.target.value, event.target.name);
};
</script>
  