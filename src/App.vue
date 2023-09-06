<script setup>
  import { reactive, onMounted } from "vue";
  import { RouterView } from "vue-router";
  import Notification from "@/components/Notification.vue";
  import Loader from "@/components/Loader.vue";
  import PwaPrompt from "@/components/PwaPrompt.vue";
  import { XMarkIcon } from "@heroicons/vue/20/solid";

  const state = reactive({
    registration: null,
    isRefresh: false,
    refreshing: false,
  });

  onMounted(() => {
    document.addEventListener("serviceWorkerUpdateEvent", appUpdateUI, {
      once: true,
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (state.refreshing) return;
      state.refreshing = true;
      window.location.reload();
    });
  });

  const appUpdateUI = (e) => {
    state.registration = e.detail;
    state.isRefresh = true;
  };
  const update = () => {
    state.isRefresh = false;
    if (state.registration || state.registration.waiting) {
      state.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  };
  const dismiss = () => {
    state.isRefresh = false;
  };
</script>

<template>
  <PwaPrompt />
  <div class="flex items-center w-full justify-center">
    <RouterView
      :class="!$route.meta.noAuth ? 'w-full overflow-hidden' : 'w-full'"
    />
  </div>
  <Notification />
  <Loader />
  <div
    v-if="state.isRefresh"
    class="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8"
  >
    <div
      class="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 py-2.5 px-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4"
    >
      <p class="text-sm leading-6 text-white">
        <a href="#" @click.prevent="update"
          >A new version is available, click to update&nbsp;<span
            aria-hidden="true"
            >&rarr;</span
          ></a
        >
      </p>
      <button @click="dismiss" type="button" class="-m-1.5 flex-none p-1.5">
        <XMarkIcon class="h-5 w-5 text-white" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
<style>
  body {
    font-family: "Outfit", sans-serif;
  }
</style>
