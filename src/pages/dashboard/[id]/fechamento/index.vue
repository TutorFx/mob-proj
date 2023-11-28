<template>
  <div class="grid grid-rows-[max-content_max-content_1fr]">
    <div
      class="not-prose relative overflow-hidden border-b border-base-300 bg-base-200"
    >
      <div class="relative">
        <div class="absolute inset-0" />
        <div class="relative overflow-auto p-3 py-2 max-sm:pb-3 md:p-6 md:py-3">
          <DashboardOrderStatuses
            v-if="statuses"
            v-model="status"
            :data="statuses"
          />
        </div>
      </div>
    </div>
    <div class="border-b border-base-300 bg-base-200">
      <div class="p-3 py-2 md:p-6 md:py-3">
        <div
          class="group pointer-events-auto relative w-10 transition-all focus-within:w-64 md:w-32"
        >
          <label
            type="button"
            :class="{ 'grid-cols-[max-content_1fr]': focused }"
            class="shadow-sm grid grid-flow-col items-start rounded-md py-1.5 pl-2 pr-3 text-sm leading-6 text-slate-400 ring-1 ring-slate-900/10 hover:ring-slate-300 dark:hover:bg-base-300"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              aria-hidden="true"
              class="flex-none"
            >
              <path
                d="m19 19-3.5-3.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              ref="input"
              v-model="searchInput"
              type="search"
              class="h-6 w-full border-0 border-none bg-transparent text-primary ring-0 focus:ring-0"
            />
            <div
              v-if="!focused"
              class="ml-auto hidden w-16 grid-flow-col text-xs font-semibold md:grid"
            >
              <kbd class="kbd kbd-sm">Ctrl</kbd>
              <kbd class="kbd kbd-sm">K</kbd>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="bg-base-200">
      <CheckoutAdminList
        v-if="statuses"
        v-model="selected"
        :status-list="statuses"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke, useFocus } from "@vueuse/core";

const route = useRoute();
const router = useRouter();

const status = computed({
  get() {
    return route.query.status as string;
  },
  set(val) {
    router.push({ query: { status: val } });
  },
});

const search = computed({
  get() {
    return route.query.search as string;
  },
  set(val) {
    if (val === "") {
      return router.push({ query: { search: undefined } });
    }
    router.push({ query: { search: val } });
  },
});

const input = ref();
const searchInput = ref(search.value);
const { focused } = useFocus(input, { initialValue: true });

onKeyStroke("k", (e) => {
  e.preventDefault();
  if (e.ctrlKey) {
    focused.value = true;
  }
});

onKeyStroke("Enter", (e) => {
  e.preventDefault();
  search.value = searchInput.value;
  refreshNuxtData("checkouts");
});

const selected = ref([]);

const { data: statuses } = useAsyncData("status", () =>
  $fetch("/api/v1/order/status"),
);

watch(status, async () => {
  refreshNuxtData("checkouts");
});
</script>
