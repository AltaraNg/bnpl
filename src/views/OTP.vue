<template>
    <App>
        <main class="flex h-screen lg:items-center mt-20 lg:mt-0 justify-center w-full">
            
            <div class="w-full flex flex-col items-center lg:justify-center lg:mt-0 px-8 lg:px-0" >
                <p class="text-2xl font-black mb-1">Verify Order Details</p>
                <p class="text-gray-700 mb-8 lg:w-[423px] w-full text-center">
                    Check your Phone. We sent a confirmation sms containing a 6 digits code to <span class="font-bold">{{ phone_number }}</span>
                </p>
                <div class="flex space mb-20 w-full">
                    <div class="flex items-center justify-center w-full">
                        <!-- <div class="border border-gray-400 rounded flex items-center justify-center  w-[56px] h-[56px]">{{otp}}</div> -->
                        <v-otp-input
                            ref="otpInput"
                            input-classes="border border-gray-400 text-center text-2xl font-bold rounded mx-1 flex items-center justify-center  w-[50px] h-[50px]"
                            separator=""
                            :num-inputs="6"
                            :should-auto-focus="true"
                            :is-input-num="true"
                            @on-change="handleOnChange"
                            @on-complete="handleOnComplete"
                        />
                    </div>
                </div>
                <div  class="w-full flex flex-col items-center">
                    <button class="lg:w-[443px] w-full rounded bg-primary text-white font-semibold py-2" :disabled="disabled">
                    <router-link :to="{ name: 'OTP' }"> Verify </router-link>
                </button>
                <div class="flex items-center space-x-3 pt-4" v-if="!tryagain">
                    <p>0.{{ time }}</p>
                </div>
                <div class="text-center pt-20" v-else>
                    <p class="text-md text-gray-600">Yet to receive verification code?</p>
                    <div class="text-primary text-normal font-semibold cursor-pointer" @click="ResendVerify">
                        <p>Try Again</p>
                    </div>
                </div>
                </div>

             
            </div>
        </main>
    </App>
</template>
<script setup>
import { ref, onMounted, onUnmounted, } from "vue";
import App from "@/layouts/App.vue";
import VOtpInput from "vue3-otp-input";
import { useRoute, useRouter } from "vue-router";
import Apis from "@/services/ApiCalls";
import { handleSuccess } from "../utilities/GlobalFunctions";

const route = useRoute();
const router = useRouter();
const otpInput = ref(null);
const disabled = ref(true);
const phone_number = ref(route.params.phone_number);
const verification_id = ref(route.params.verification_id)
const time = ref(60);
const timer = ref();
const tryagain = ref(false);



const handleOnComplete = (value) => {
    disabled.value = false;
    Apis.validateOTP({
        phone_number: phone_number.value,
        otp: value,
    }).then((response) => {
        if (response){
        handleSuccess("OTP is Valid");
         router.push({name:'SuccessfulVerification', params:{
            phone_number:phone_number.value,
            verification_id:verification_id.value,
            OTPvalidate:'validated'

         }})
        
        }
        
    });
};
const handleOnChange = () => {
    disabled.value = true;
};
async function ResendVerify() {
    otpInput.value.clearInput();
    tryagain.value = false;
    countDownTimer();
    await Apis.generateOTP({
        phone_number: phone_number.value,
        regenerate: true,
    });
}
function countDownTimer() {
    timer.value = setInterval(() => {
        time.value--;
        time.value = time.value < 10 ? `0${time.value}` : time.value;
        if (time.value == 0) {
            tryagain.value = true;
            time.value = 60;
            clearInterval(timer.value);
        }
    }, 1000);
}

async function GenerateOTP() {
    await Apis.generateOTP({
        phone_number: phone_number.value,
    });
}

onMounted(() => {
    countDownTimer();
    GenerateOTP();
});
onUnmounted(() => clearInterval(timer.value));



</script>

