<template>
    <App>
        <div class="bg-gray-900">
            <div class="relative overflow-hidden pt-32 pb-96 lg:pt-40">
                <div>
                    <img class="absolute bottom-0 left-1/2 w-[1440px] max-w-none -translate-x-1/2"
                        src="https://tailwindui.com/img/component-images/grid-blur-purple-on-black.jpg" alt="" />
                </div>
                <div class="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
                    <div class="mx-auto max-w-2xl lg:max-w-4xl">
                        <h2 class="text-lg font-semibold leading-8 text-indigo-400">Verification Page</h2>
                        <p class="mt-2 text-4xl font-bold tracking-tight text-white">Congratulations on taking the first step!</p>
                        <p class="mt-6 text-lg leading-8 text-white/60">
                            In order to ensure that you receive the funds you need, we require that all loan applicants complete a verification process.
                        </p>
                    </div>
                </div>
            </div>
            <div class="flow-root bg-white pb-32 lg:pb-40">
                <div class="relative -mt-80">
                    <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                        <div class="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 lg:gap-8">
                            <div v-for="tier in tiers" :key="tier.name" class="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
                                <div class="p-8 sm:p-10">
                                    <h3 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600" :id="tier.id">{{ tier.name }}</h3>
                                    <div class="mt-4 flex items-baseline text-5xl font-bold tracking-tight text-gray-900">
                                        ₦{{ tier.priceMonthly }}
                                        <span class="text-lg font-semibold leading-8 tracking-normal text-gray-500">/commission</span>
                                    </div>
                                    <p class="mt-6 text-base leading-7 text-gray-600">{{ tier.description }}</p>
                                </div>
                                <div class="flex flex-1 flex-col p-2">
                                    <div class="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 p-6 sm:p-8">
                                        <ul role="list" class="space-y-3">
                                            <li v-for="feature in tier.features" :key="feature" class="flex items-start">
                                                <div class="flex-shrink-0">
                                                    <CheckIcon class="h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                </div>
                                                <p class="ml-3 text-sm leading-6 text-gray-600">{{ feature }}</p>
                                            </li>
                                        </ul>
                                        <div class="mt-8">
                                            <a :href="tier.href"
                                                class="inline-block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold leading-5 text-white shadow-md "
                                                :aria-describedby="tier.id">Continue</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </App>
</template>

<script setup>
import { CheckIcon } from "@heroicons/vue/24/outline";
import App from "@/layouts/App.vue";

const tiers = [
    {
        id: "instant",
        name: "Instant Verification",
        href: "#",
        priceMonthly: 4900,
        description: "Instant verification allows you to quickly and easily verify your identity through our secure online system.",
        features: [
            "Quick and easy verification process",
            "Instant results, with no waiting time",
        ],
    },
    {
        id: "physical",
        name: "Physical Verification",
        href: "#",
        priceMonthly: 7900,
        description:
            "Physical verification is a more traditional method that involves sending a physical copy of your ID to our team for manual review. This process can take a few days, but it ensures that your identity is thoroughly verified.",
        features: [
            "Clear and legible physical copy of the ID",
            "Thorough verification process",
            "Government-issued ID such as a passport or driver's license",
            "Visitation by our agents",
        ],
    },
];
</script>
