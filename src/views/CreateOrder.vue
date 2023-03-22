<template>
    <div>
        <App>
            <div class="lg:pr-8 py-8 px-6 lg:mx-auto lg:flex flex-col lg:max-w-7xl">
                <div>
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">New Sale</h2>
                </div>

                <Form @submit="createNewSale" :validation-schema="CreateOrderSchema" v-slot="{ errors }">
                    <div class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <app-label label-title="Product" label-for="product" />
                            <div class="mt-1">
                                <app-input type="text" name="product" :model-value="Order.product" v-model="Order.product" id="product" />
                            </div>
                            <span class="invalid-feedback">{{ errors?.product }}</span>
                        </div>
                        <div>
                            <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                            <div class="mt-1">
                                <CurrencyInput
                                    :model-value="Order.amount"
                                    v-model="Order.amount"
                                    name="amount"
                                    :options="{
                                        currency: 'NGN',
                                        hideCurrencySymbolOnFocus: false,
                                        hideGroupingSeparatorOnFocus: false,
                                        hideNegligibleDecimalDigitsOnFocus: false,
                                    }"
                                />
                            </div>
                            <span class="invalid-feedback">{{ errors?.amount }}</span>
                        </div>
                        <div>
                            <app-label label-title="Repayment Duration" label-for="repayment_duration" />
                            <div class="mt-1">
                                <app-select-input
                                    name="repayment_duration_id"
                                    :modelValue="Order.repayment_duration_id"
                                    v-model="Order.repayment_duration_id"
                                    @update:modelValue="onSelectChange"
                                >
                                    <option value="" disabled>Select Repayment Duration</option>
                                    <option class="text-sm" v-for="duration in repayment_duration" :key="duration.slug" :value="duration.id">
                                        {{ duration.name }}
                                    </option>
                                </app-select-input>
                            </div>
                            <span class="invalid-feedback">{{ errors?.repayment_duration_id }}</span>
                        </div>
                        <div>
                            <app-label label-title="Repayment Cycle" label-for="repayment_cycle_id" />
                            <div class="mt-1">
                                <app-select-input
                                    name="repayment_cycle_id"
                                    v-model="Order.repayment_cycle_id"
                                    :modelValue="Order.repayment_cycle_id"
                                    @update:modelValue="onSelectChange"
                                >
                                    <option value="" disabled>Select Repayment Cycle</option>
                                    <option class="text-sm" v-for="cycle in repayment_cycle" :key="cycle.slug" :value="cycle.id">
                                        {{ cycle.name }}
                                    </option>
                                </app-select-input>
                            </div>
                            <span class="invalid-feedback">{{ errors?.repayment_cycle_id }}</span>
                        </div>

                        <div class="p-5 lg:py-8 lg:mt-6 rounded shadow-sm bg-gray-200">
                            <p class="mb-4 text-gray-800 font-bold">First Guarantor</p>
                            <div>
                                <app-label label-title="First Name" label-for="first_guarantor_first_name" />
                                <div class="mt-1">
                                    <app-input
                                        v-model="Order.first_guarantor_first_name"
                                        type="text"
                                        name="first_guarantor_first_name"
                                        :model-value="Order.first_guarantor_first_name"
                                        id="first_guarantor_first_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_first_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Last Name" label-for="first_guarantor_last_name" />
                                <div class="mt-1">
                                    <app-input
                                        v-model="Order.first_guarantor_last_name"
                                        type="text"
                                        name="first_guarantor_last_name"
                                        :model-value="Order.first_guarantor_last_name"
                                        id="first_guarantor_last_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_last_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Telephone" label-for="first_guarantor_telephone" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="first_guarantor_telephone"
                                        :model-value="Order.first_guarantor_telephone"
                                        v-model="Order.first_guarantor_telephone"
                                        id="first_guarantor_telephone"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_telephone }}</span>
                            </div>
                            <div>
                                <app-label label-title="Home Address" label-for="first_guarantor_home_address" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="first_guarantor_home_address"
                                        :model-value="Order.first_guarantor_home_address"
                                        v-model="Order.first_guarantor_home_address"
                                        id="first_guarantor_home_address"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.first_guarantor_home_address }}</span>
                            </div>
                        </div>

                        <div class="p-5 lg:py-8 lg:mt-6 rounded shadow-sm bg-gray-200">
                            <p class="mb-4 text-gray-800 font-bold">Second Guarantor</p>
                            <div>
                                <app-label label-title="First Name" label-for="second_guarantor_first_name" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_first_name"
                                        :model-value="Order.second_guarantor_first_name"
                                        v-model="Order.second_guarantor_first_name"
                                        id="second_guarantor_first_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_first_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Last Name" label-for="second_guarantor_last_name" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_last_name"
                                        v-model="Order.second_guarantor_last_name"
                                        :model-value="Order.second_guarantor_last_name"
                                        id="second_guarantor_last_name"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_last_name }}</span>
                            </div>
                            <div>
                                <app-label label-title="Telephone" label-for="second_guarantor_telephone" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_telephone"
                                        v-model="Order.second_guarantor_telephone"
                                        :model-value="Order.second_guarantor_telephone"
                                        id="second_guarantor_telephone"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_telephone }}</span>
                            </div>
                            <div>
                                <app-label label-title="Home Address" label-for="second_guarantor_home_address" />
                                <div class="mt-1">
                                    <app-input
                                        type="text"
                                        name="second_guarantor_home_address"
                                        v-model="Order.second_guarantor_home_address"
                                        :model-value="Order.second_guarantor_home_address"
                                        id="second_guarantor_home_address"
                                    />
                                </div>
                                <span class="invalid-feedback">{{ errors?.second_guarantor_home_address }}</span>
                            </div>
                        </div>

                        <div class="text-right mt-8 lg:flex lg:justify-center sm:col-span-2">
                            <defaultButton name=" New Sale" class="lg:w-1/3">
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
import { Form } from "vee-validate";
import AppInput from "@/components/AppInput.vue";
import AppLabel from "@/components/AppLabel.vue";
import AppSelectInput from "@/components/AppSelectInput.vue";
import defaultButton from "@/components/button.vue";
import { ref, reactive, onMounted } from "vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import plus from "@/assets/svgs/plus.vue";
import App from "@/layouts/App.vue";
// import { handleError } from "../utilities/GlobalFunctions";
import { useStore } from "vuex";
import { calculate } from "@/utilities/calculator";
import { useRoute } from "vue-router";
import Apis from "@/services/ApiCalls";
import { CreateOrderSchema } from "@/shemas/CreateOrderSchema";
const store = useStore();
const route = useRoute();
const repayment_duration = ref();
const repayment_cycle = ref([
    {
        slug: "monthly",
        name: "Monthly",
        id: 2,
        value: 28,
    },
    {
        slug: "bi-monthly",
        name: "Bi-Monthly",
        id: 1,
        value: 14,
    },
]);
const get_calculations = ref([]);
const Order = reactive({
    product: "",
    amount: 0,
    repayment_duration_id: "",
    repayment_cycle_id: "",
    first_guarantor_first_name: "",
    first_guarantor_last_name: "",
    first_guarantor_telephone: "",
    first_guarantor_home_address: "",
    second_guarantor_first_name: "",
    second_guarantor_last_name: "",
    second_guarantor_telephone: "",
    second_guarantor_home_address: "",
});
const business_type = ref();
const payment_type_id = ref();
const OrderResult = ref({
    total: null,
    actualDownpayment: null,
    rePayment: null,
});


function Calculate() {
    try {
        const Data = { ...Order, payment_type_id: payment_type_id };
        const params = get_calculations.value.find((x) => {
            return (
                x.business_type_id === business_type?.value?.id &&
                x.down_payment_rate_id === payment_type_id.value?.id &&
                x.repayment_duration_id == Order.repayment_duration_id
            );
        });
        const { total, actualDownpayment, rePayment } = calculate(Order.amount, Data, params, 0);

        OrderResult.value.total = total;
        OrderResult.value.actualDownpayment = actualDownpayment;
        OrderResult.value.rePayment = rePayment;
    } catch (e) {
        window.localStorage.removeItem("data");
    }
}

function createNewSale() {
    Calculate();
    store.dispatch("InitiateCreditCheck", {
        customer_id: route.params.id,
        down_payment: OrderResult.value.actualDownpayment,
        down_payment_rate_id: payment_type_id.value.id,
        product_price: Order.amount,
        repayment: OrderResult.value.rePayment,
        repayment_cycle_id: parseInt(Order.repayment_cycle_id),
        repayment_duration_id: parseInt(Order.repayment_duration_id),
        product_name: Order.product,
        guarantors: [
            {
                first_name: Order.first_guarantor_first_name,
                last_name: Order.first_guarantor_last_name,
                phone_number: Order.first_guarantor_telephone,
                home_address: Order.first_guarantor_home_address,
            },
            {
                first_name: Order.second_guarantor_first_name,
                last_name: Order.second_guarantor_last_name,
                phone_number: Order.second_guarantor_telephone,
                home_address: Order.second_guarantor_home_address,
            },
        ],
    });
}
function onSelectChange(value, name) {
    Order[name] = value;
}
async function RepaymentDuration() {
    const result = await Apis.repaymentduration();
    repayment_duration.value = result?.data?.data?.data.filter((duration) => {
        return duration.name !== "nine_months";
    });
}
async function BusinessType() {
    const result = await Apis.businesstype();
    business_type.value = result?.data?.data?.data.find((businesstype) => businesstype.slug == "ap_products");
}
async function GetCalculation() {
    const result = await Apis.getcalculations();
    get_calculations.value = result?.data?.data;
}
async function Downpayment() {
    const result = await Apis.downpayments();
    payment_type_id.value = result?.data?.data?.data.find((downPayment) => downPayment.name == "twenty");
}

// async function RepaymentCycle() {
//     const result = await Apis.repaymentcycle();
//     repayment_cycle.value = result?.data?.data?.data;
// }

onMounted(() => {
    RepaymentDuration();
    BusinessType();
    GetCalculation();
    Downpayment();
    // RepaymentCycle();
});
</script>
