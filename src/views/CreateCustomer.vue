<template>
    <div>
        <App>
            <div class="lg:pr-8 py-8 px-6 lg:mx-auto lg:flex flex-col lg:max-w-7xl">
                <div>
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Let's get started</h2>
                    <p class="mt-4 text-lg text-gray-500 sm:mt-3">Just one more step to create your first order</p>
                </div>

                <!-- <form > -->
                <Form @submit="onSubmit" :validation-schema="CreateCustomerSchema" v-slot="{ errors }">
                    <div class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <app-label label-title="First name" label-for="first_name" />
                            <div class="mt-1">
                                <app-input
                                    type="text"
                                    name="first_name"
                                    :model-value="customerData.first_name"
                                    id="first-name"
                                    autocomplete="given-name"
                                />
                            </div>
                            <span class="invalid-feedback">{{ errors?.first_name }}</span>
                        </div>
                        <div>
                            <app-label label-title="Last name" label-for="last_name" />
                            <div class="mt-1">
                                <app-input
                                    type="text"
                                    name="last_name"
                                    :model-value="customerData.last_name"
                                    id="last-name"
                                    autocomplete="family-name"
                                />
                            </div>
                            <span class="invalid-feedback">{{ errors?.last_name }}</span>
                        </div>
                        <div>
                            <app-label label-title="Email" label-for="email" />
                            <div class="mt-1">
                                <app-input type="email" name="email" :model-value="customerData.email" id="email" autocomplete="email" />
                            </div>
                            <span class="invalid-feedback">{{ errors?.email }}</span>
                        </div>
                        <div>
                            <app-label label-title="Home address" label-for="home_address" />
                            <div class="mt-1">
                                <app-input
                                    type="text"
                                    name="home_address"
                                    :model-value="customerData.home_address"
                                    id="home_address"
                                    autocomplete="address"
                                />
                            </div>
                            <span class="invalid-feedback">{{ errors?.home_address }}</span>
                        </div>
                        <div>
                            <app-label label-title="Telephone" label-for="telephone" />
                            <div class="mt-1">
                                <app-input
                                    type="text"
                                    name="telephone"
                                    :model-value="customerData.telephone"
                                    id="telephone"
                                    autocomplete="telephone"
                                />
                            </div>
                            <span class="invalid-feedback">{{ errors?.telephone }}</span>
                        </div>
                        <div>
                            <app-label label-title="Date of Birth" label-for="date_of_birth" />
                            <div class="mt-1">
                                <app-input
                                    type="date"
                                    name="date_of_birth"
                                    :model-value="customerData.date_of_birth"
                                    id="date_of_birth"
                                    autocomplete="date_of_birth"
                                />
                            </div>
                            <span class="invalid-feedback">{{ errors?.date_of_birth }}</span>
                        </div>
                        <div>
                            <app-label label-title="State" label-for="state" />
                            <div class="mt-1" style="pointer-events: none;">
                                <app-select-input name="state" :modelValue="customerData.state" @update:modelValue="onSelectChange">
                                    <option value="" disabled>Select State</option>
                                    <option class="text-sm" v-for="state in states" :key="state.value" :value="state.value">{{ state.name }}</option>
                                </app-select-input>
                            </div>
                            <span class="invalid-feedback">{{ errors?.state }}</span>
                        </div>
                        <div>
                            <app-label label-title="City" label-for="city" />
                            <div class="mt-1">
                                <app-select-input name="city" :modelValue="customerData.city" @update:modelValue="onSelectChange">
                                    <option value="" disabled>Select City</option>
                                    <option class="text-sm" v-for="item in areas" :key="item.value" :value="item.value">{{ item.name }}</option>
                                </app-select-input>
                            </div>
                            <span class="invalid-feedback">{{ errors?.city }}</span>
                        </div>
                        <div class="text-right mt-8 lg:flex lg:justify-center sm:col-span-2">
                            <defaultButton name="Create Account" class="lg:w-1/3">
                                <template v-slot:icon>
                                    <plus />
                                </template>
                            </defaultButton>
                        </div>
                    </div>
                </Form>
            </div>
        </App>
    </div>
</template> 
<script setup>
import { ref, watch, onMounted } from "vue";
import { Form } from "vee-validate";
import AppInput from "@/components/AppInput.vue";
import AppLabel from "@/components/AppLabel.vue";
import AppSelectInput from "@/components/AppSelectInput.vue";
import plus from "@/assets/svgs/plus.vue";
import defaultButton from "@/components/button.vue";
import App from "@/layouts/App.vue";
import { useStore } from "vuex";
import { CreateCustomerSchema } from "@/shemas/CreateCustomerSchema";
import { useRoute } from "vue-router";
const route = useRoute();
const initialCreateCustomerStore = {
    first_name: "",
    last_name: "",
    email: "",
    home_address: "",
    telephone: route.params.telephone ||"",
    date_of_birth: "",
    state: "Oyo",
    city: '',
};

const store = useStore();
const customerData = ref(initialCreateCustomerStore);
const areas = ref([]);
const states = ref([

    {
        value: "Oyo",
        name: "Oyo State",
        areas: [
            {
                value: "Apata",
                name: "Apata, Ibadan",
            },
            {
                value: "Dugbe",
                name: "Dugbe, Ibadan",
            },
            {
                value: "Gate",
                name: "Gate, Ibadan",
            },
            {
                value: "Bodija",
                name: "Bodija, Ibadan",
            },
            {
                value: "Iwo Road",
                name: "Iwo Road, Ibadan",
            },
            {
                value: "Challenge",
                name: "Challenge, Ibadan",
            },
            {
                value: "Iyana_church",
                name: " Iyana church, Ibadan",
            },
        ],
    },
]);

watch(
    () => customerData.value.state,
    (newValue) => {
        setAreas(newValue)
    },
    
);
function onSelectChange(value, name) {
    customerData.value[name] = value;
}

function onSubmit(value) {
    store.dispatch("CreateCustomer", value);
}
function setAreas(newValue){
    states.value.filter((element) => {
            if (element.value == newValue) {
                areas.value = element.areas;
                return element;
            }
        });
}

onMounted(() => {
   setAreas('Oyo')
});



</script>