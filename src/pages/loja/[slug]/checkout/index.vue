<template>
  <div class="container fill-screen grid gap-6 grid-rows-[max-content_1fr] items-start">
    <ui-nav>
      <template #default>
        <nuxt-link :to="{ name: 'loja-slug' }" class="btn btn-ghost normal-case font-black text-xl">{{ data?.name
        }}</nuxt-link>
      </template>
      <template #end>
        <div class="max-w-lg w-screen hidden md:block">
          <ui-stepper :steps="StepperData" v-model="Step" />
        </div>
      </template>
    </ui-nav>
    <div v-if="auth.status.value !== 'authenticated' && !isAnonymous" class="grid min-h-full pb-6">
      <div class="text-center grid items-center bg-primary/5 rounded-xl">
        <div class="max-w-md mx-auto px-6">
          <h2 class="text-xl font-semibold mb-3">
            De que forma deseja seguir?
          </h2>
          <h4 class="text-md mb-6">
            Tem como você fazer a compra de duas formas, anônima ou então acesse sua conta para obter
            prêmios que podem ser trocados por produtos.
          </h4>
          <div class="grid grid-flow-col gap-3">
            <div @click="selectAnon()" class="btn btn-sm btn-primary rounded-full">
              Anônima
            </div>
            <div class="btn btn-sm btn-primary rounded-full gap-3">
              <div>
                Resgatar prêmios (<span
                  class="break-keep whitespace-nowrap bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-400 text-transparent font-bold">
                  {{ cart.$get?.info.pricesum }}
                  <Icon name="Coin" size="12" />
                </span>)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else
      class="grid min-h-full gap-6 items-start md:grid-rows-1 grid-rows-[1fr_max-content] grid-cols-1 md:grid-cols-[1fr_max-content]">
      <div class="grid gap-6">
        <div class="block md:hidden">
          <ui-stepper :steps="StepperData" v-model="Step" />
        </div>
        <component :is="Steps[Step].value.component" v-model="Steps[Step].value.data"
          v-model:valid="Steps[Step].value.valid"></component>
      </div>
      <div class="p-6 max-w-sm border border-base-200 rounded-lg grid grid-rows-[max-content_1fr] gap-6 items-start">
        <div class="grid gap-3">
          <ui-cart-item v-for="(item) in cart.$get?.items" class="lg:max-w-sm" :item="item" :key="item.id" />
        </div>
        <div class="border-b" />
        <div class="grid gap-4">
          <div class="grid grid-flow-col justify-between">
            <div>Valor final</div>
            <span>{{ useMoney(cart.$get?.info.pricesum || 0) }} + entrega</span>
          </div>
          <div class="grid gap-3 grid-flow-col">
            <div @click="backstep()" v-if="Step > 0" :disabled="!backstatus ? true : undefined"
              class="btn btn-primary btn-block">Voltar</div>
            <nuxt-link v-else :to="{ name: 'loja-slug' }" class="btn btn-primary btn-block">Adicionar produtos</nuxt-link>
            <div @click="finalizar()" v-if="Step + 1 === Steps.length" :disabled="!allsteps ? true : undefined"
              class="btn btn-primary btn-block">Finalizar</div>
            <div @click="nextstep()" v-else :disabled="!nextstatus || !current.valid ? true : undefined"
              class="btn btn-primary btn-block">Continuar</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TAddress } from '~/types/addr';
import { Tcontact } from '~/types/user';
import { useGeolocation } from '@vueuse/core'

const { coords, locatedAt, error, resume, pause } = useGeolocation({ immediate: false })

const selectAnon = () => {
  isAnonymous.value = !isAnonymous.value
  resume()
}

const personal_component = resolveComponent('FormAnonuser')
const addr_component = resolveComponent('FormAddr')

const personal_default = {
  nome: '',
  celular: '',
  whatsapp: true
}

const addr_default = {
  cep: '',
  endereco: '',
  numero: null,
  bairro: '',
  cidade: 0,
  estado: 0,
  complemento: '',
}

const auth = useAuth();
const route = useRoute();
const cart = useCart();
const isAnonymous = ref<boolean>(false)

const { data } = await useAsyncData(() => $fetch(`/api/v1/business/${route.params.slug}`));

const PersonalState = ref<{ name: string, data: Tcontact, valid: boolean, component: Component }>(
  {
    name: 'Dados de contato',
    data: personal_default,
    valid: false,
    //@ts-expect-error
    component: markRaw(personal_component)
  }
)

const AddrState = ref<{ name: string, data: TAddress, valid: boolean, component: Component }>(
  {
    name: 'Endereço',
    data: addr_default,
    valid: false,
    //@ts-expect-error
    component: markRaw(addr_component)
  }
)

const Steps = ref([
  PersonalState,
  AddrState,
])

const StepperData = computed(() => Steps.value.map((current) => current.value.name))

const Step = ref(0);
const backstatus = computed(() => Steps.value[Step.value - 1]?.value ?? null)
const current = computed(() => Steps.value[Step.value].value)
const nextstatus = computed(() => Steps.value[Step.value + 1]?.value ?? null)
const allsteps = computed(() => Steps.value.every(step => step.value.valid === true))

const backstep = () => {
  if (Step.value === 0) return;
  Step.value--
}
const nextstep = () => {
  if (Step.value === Steps.value.length) return;
  if (!current.value.valid) return;
  Step.value++
}
const finalizar = async () => {
  const { data, pending, error } = await useFetch(`/api/v1/order/${route.params.slug}`, { method: 'post', body: { contact: PersonalState.value.data, address: AddrState.value.data, cart: cart.$current_cart } })
  console.log(data, pending, error)
}
</script>