<template>
    <div>
        <App>
            <div class="lg:pr-8 py-8 px-6 lg:mx-auto lg:flex flex-col lg:max-w-7xl">
                <div>
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">New Sale</h2>
                    <p class="mt-4 text-lg text-gray-500 sm:mt-3">Just one more step to create your first order</p>
                </div>

                <form class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                        <label for="product" class="block text-sm font-medium text-gray-700">Product</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="product"
                                v-model="Order.product"
                                id="product"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                        <div class="mt-1">
                            <CurrencyInput
                                v-model="Order.amount"
                                :options="{
                                    currency: 'NGN',
                                    hideCurrencySymbolOnFocus: false,
                                    hideGroupingSeparatorOnFocus: false,
                                    hideNegligibleDecimalDigitsOnFocus: false,
                                }"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="repayment_duration" class="block text-sm font-medium text-gray-700">Repayment Duration</label>
                        <div class="mt-1">
                            <select
                                name="repayment_duration"
                                id="repayment_duration"
                                autocomplete="repayment_duration"
                                v-model="Order.repayment_duration_id"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="default" class disabled>Repayment Duration</option>
                                <option class="text-sm" v-for="duration in repayment_duration" :key="duration.slug" :value="duration">
                                    {{ duration.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="repayment_cycle" class="block text-sm font-medium text-gray-700">Repayment Cycle</label>
                        <div class="mt-1">
                            <select
                                name="repayment_cycle"
                                id="repayment_cycle"
                                autocomplete="repayment_cycle"
                                v-model="Order.repayment_cycle_id"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="default" class disabled>Repayment Cycle</option>
                                <option class="text-sm" v-for="cycle in repayment_cycle" :key="cycle.slug" :value="cycle">{{ cycle.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="guarantor_1" class="block text-sm font-medium text-gray-700">Guarantor 1</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="guarantor_1"
                                v-model="Order.guarantor_1"
                                id="guarantor_1"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="telephone_1" class="block text-sm font-medium text-gray-700">Telephone</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="telephone_1"
                                v-model="Order.telephone_1"
                                id="telephone_1"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="guarantor_2" class="block text-sm font-medium text-gray-700">Guarantor 2</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="guarantor_2"
                                v-model="Order.guarantor_2"
                                id="guarantor_2"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="telephone_2" class="block text-sm font-medium text-gray-700">Telephone</label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="telephone_2"
                                v-model="Order.telephone_2"
                                id="telephone_2"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div class="text-right mt-8 lg:flex lg:justify-center sm:col-span-2">
                        <defaultButton name=" New Sale" :action="NewSale" class="lg:w-1/3">
                            <template v-slot:icon>
                                <plus />
                            </template>
                        </defaultButton>
                    </div>
                </form>
            </div>
        </App>
    </div>
</template>
<script setup>
import defaultButton from "@/components/button.vue";
import { ref, reactive, onMounted } from "vue";
import CurrencyInput from "@/components/CurrencyInput.vue";
import App from "@/layouts/App.vue";
import { handleError } from "../utilities/GlobalFunctions";
// import { useStore } from "vuex";
import {calculate} from '@/utilities/calculator'
import Apis from "@/services/ApiCalls";
// const store = useStore();
const repayment_duration = ref();
const repayment_cycle = ref([
    {
        slug: "monthly",
        name: "Monthly",
    },
    {
        slug: "bi-monthly",
        name: "Bi-Monthly",
    },
]);
const get_calculations = ref([])
const Order = reactive({
    product: null,
    amount: null,
    repayment_duration_id: {},
    payment_type_id:{},
    repayment_cycle_id: {},
    guarantor_1: null,
    telephone_1: null,
    guarantor_2: null,
    telephone_2: null,
    business_type:{}
});

 function Calculate() {
      try {
        const params = get_calculations.value.find((x) => {
          return (
            x.business_type_id === Order.business_type?.value?.id &&
            x.down_payment_rate_id === Order.payment_type_id.value?.id &&
            x.repayment_duration_id === Order.repayment_duration_id?.id
          );
        });
        console.log(Order.amount,Order, params,);
        const { total, actualDownpayment, rePayment } = calculate(
          Order.amount,
          Order,
          params,
          0
        );
        console.log(total, actualDownpayment, rePayment );
      } catch (e) {
        console.log(e);
        window.localStorage.removeItem("data");
      }
    }

function NewSale(event) {
    for (let [key, value] of Object.entries(Order)) {
        var invalidNumber;
        if (!value) {
            handleError(`Please enter your ${key}`);
        } else if (Order.telephone_1?.length !== 11 && Order.telephone_2?.length !== 11) {
            invalidNumber = true;
            handleError(` Phone number number must be 11 digits`);
        }
        event.preventDefault();
    }
    if (Object.values(Order).every((el) => el) && !invalidNumber) {
      Calculate()
        // store.dispatch("Calculate", Order);
    }
    event.preventDefault();
}
async function RepaymentDuration() {
  const result = await Apis.repaymentduration()
  repayment_duration.value = result?.data?.data?.data
}
async function BusinessType() {
  const result = await Apis.businesstype()
  Order.business_type.value = result?.data?.data?.data.find((businesstype)=> businesstype.slug == "ap_products");
}
async function GetCalculation() {
  const result = await Apis.getcalculations()
  get_calculations.value = result?.data?.data
}
async function Downpayment() {
  const result = await Apis.downpayments()
  Order.payment_type_id.value = result?.data?.data?.data.find((downPayment)=> downPayment.name == "twenty");
}

onMounted(() => {
    RepaymentDuration();
    BusinessType();
    GetCalculation();
    Downpayment()
});
</script>
