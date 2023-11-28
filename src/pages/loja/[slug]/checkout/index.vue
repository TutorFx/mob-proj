<template>
  <div
    class="fill-screen container grid grid-rows-[max-content_1fr] items-start gap-6"
  >
    <ui-nav class="grid grid-cols-[max-content_1fr] gap-3">
      <template #default>
        <nuxt-link
          :to="{ name: 'loja-slug' }"
          class="btn btn-ghost text-xl font-black normal-case"
        >
          {{ data?.name }}
        </nuxt-link>
      </template>
      <template #end>
        <div class="ml-auto hidden w-full max-w-lg md:block">
          <ui-stepper v-model="Step" :steps="StepperData" />
        </div>
      </template>
    </ui-nav>
    <div
      v-if="!auth.isAuthenticated && !isAnonymous"
      class="grid min-h-full pb-6"
    >
      <div class="grid items-center rounded-xl bg-primary/5 text-center">
        <div class="mx-auto max-w-md px-6">
          <h2 class="mb-3 text-xl font-semibold">
            De que forma deseja seguir?
          </h2>
          <h4 class="text-md mb-6">
            Tem como você fazer a compra de duas formas, anônima ou então acesse
            sua conta para obter prêmios que podem ser trocados por produtos.
          </h4>
          <div class="grid grid-flow-col gap-3">
            <div
              class="btn btn-primary btn-sm rounded-full"
              @click="selectAnon()"
            >
              Anônima
            </div>
            <div
              class="btn btn-primary btn-sm gap-3 rounded-full"
              @click="selectRewards()"
            >
              <div>
                Resgatar prêmios (<span
                  class="whitespace-nowrap break-keep bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text font-bold text-transparent"
                >
                  {{ cart.$get?.info.pricesum }}
                  <Icon name="Coin" size="12" /> </span
                >)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="grid min-h-full grid-cols-1 grid-rows-[1fr_max-content] items-start gap-6 md:grid-cols-[1fr_max-content] md:grid-rows-1"
    >
      <div class="grid gap-6">
        <div class="block md:hidden">
          <ui-stepper v-model="Step" :steps="StepperData" />
        </div>
        <component
          :is="Steps[Step].value.component"
          v-model="Steps[Step].value.data"
          v-model:valid="Steps[Step].value.valid"
        />
      </div>
      <div
        class="grid max-w-sm grid-rows-[max-content_1fr] items-start gap-6 rounded-lg border border-base-200 p-6"
      >
        <div class="order-last grid gap-3 sm:order-first">
          <ui-cart-item
            v-for="item in cart.$get?.items"
            :key="item.id"
            class="lg:max-w-sm"
            :item="item"
          />
        </div>
        <div class="border-b" />
        <div class="order-first grid gap-4 sm:order-last">
          <div class="grid grid-flow-col justify-between">
            <div>Valor final</div>
            <span>{{ useMoney(cart.$get?.info.pricesum || 0) }} + entrega</span>
          </div>
          <div class="grid grid-flow-col gap-3">
            <div
              v-if="Step > 0"
              :disabled="!backstatus ? true : undefined"
              class="btn btn-primary btn-block"
              @click="backstep()"
            >
              Voltar
            </div>
            <nuxt-link
              v-else
              :to="{ name: 'loja-slug' }"
              class="btn btn-primary btn-block"
            >
              Adicionar produtos
            </nuxt-link>
            <div
              v-if="Step + 1 === Steps.length"
              :disabled="!allsteps ? true : undefined"
              class="btn btn-primary btn-block"
              @click="finalizar()"
            >
              Finalizar
            </div>
            <div
              v-else
              :disabled="!nextstatus || !current.valid ? true : undefined"
              class="btn btn-primary btn-block"
              @click="nextstep()"
            >
              Continuar
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";
import type { TAddress } from "~/types/addr";
import type { Tcontact } from "~/types/user";

const auth = useAuthentication();

const route = useRoute();
const { coords, locatedAt, error, resume, pause } = useGeolocation({
  immediate: false,
});

const selectAnon = () => {
  isAnonymous.value = !isAnonymous.value;
  resume();
};
const selectRewards = async () => {
  // await signIn(undefined, { callbackUrl: route.fullPath })
  router.push({
    path: "/login",
    query: {
      callback: route.fullPath,
    },
  });
};

const personal_component = resolveComponent("FormAnonuser");
const addr_component = resolveComponent("FormAddr");

const personal_default = {
  nome: "",
  celular: "",
  whatsapp: true,
};

const addr_default = {
  cep: "",
  endereco: "",
  numero: null,
  bairro: "",
  cidade: 0,
  estado: 0,
  complemento: "",
};

const router = useRouter();
const cart = useCart();
const isAnonymous = ref<boolean>(false);

const { data } = await useAsyncData(() =>
  $fetch(`/api/v1/business/${route.params.slug}`),
);

const PersonalState = ref<{
  name: string;
  data: Tcontact;
  valid: boolean;
  component: Component;
}>({
  name: "Dados de contato",
  data: personal_default,
  valid: false,
  // @ts-expect-error
  component: markRaw(personal_component),
});

const AddrState = ref<{
  name: string;
  data: TAddress;
  valid: boolean;
  component: Component;
}>({
  name: "Endereço",
  data: addr_default,
  valid: false,
  // @ts-expect-error
  component: markRaw(addr_component),
});

const Steps = ref([PersonalState, AddrState]);

const StepperData = computed(() =>
  Steps.value.map((current) => current.value.name),
);

const Step = ref(0);
const backstatus = computed(() => Steps.value[Step.value - 1]?.value ?? null);
const current = computed(() => Steps.value[Step.value].value);
const nextstatus = computed(() => Steps.value[Step.value + 1]?.value ?? null);
const allsteps = computed(() =>
  Steps.value.every((step) => step.value.valid === true),
);

const backstep = () => {
  if (Step.value === 0) {
    return;
  }
  Step.value--;
};
const nextstep = () => {
  if (Step.value === Steps.value.length) {
    return;
  }
  if (!current.value.valid) {
    return;
  }
  Step.value++;
};
const finalizar = async () => {
  try {
    const data = await $fetch(`/api/v1/order/${route.params.slug}`, {
      method: "post",
      body: {
        contact: PersonalState.value.data,
        address: AddrState.value.data,
        cart: cart.$current_cart,
      },
    });
    router.push({ name: "loja-slug-checkout-id", params: { id: data.id } });
    cart.clean_cart();
    cart.isVisible = false;
  } catch (e) {
    console.error(e);
  }
};
</script>
