<template>
  <div class="grid min-h-[100svh] grid-rows-[max-content_1fr] gap-3">
    <NuxtLoadingIndicator color="false" class="bg-primary" />
    <div class="container">
      <ui-store-nav :data="data?.Business" />
    </div>
    <div class="container grid gap-6 pb-6 md:grid-cols-2">
      <div>
        <div class="grid gap-3 py-6">
          <div class="text-3xl">
            Prontinho {{ data?.contact?.nome?.split(' ', 1).toString() }}!
          </div>
          <div>
            Seu pedido já está em { etapa }, {{ data?.Business.name }} entrará em contato com você via Whatsapp para confirmar seu pedido.
          </div>
          <div class="border-b" />
          <div class="grid gap-6 xl:grid-cols-4">
            <ul>
              <li class="text-neutral">
                Data do Pedido
              </li>
              <li>
                <client-only>
                  {{ data?.createdAt ? new Date(data?.createdAt).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                    weekday: 'short',
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : '' }}
                  <template #fallback>
                    <div class="isloading mt-2 h-4 w-full rounded-md" />
                  </template>
                </client-only>
              </li>
            </ul>
            <ul>
              <li class="text-neutral">
                ID do Pedido
              </li>
              <li class="grid grid-cols-[1fr_max-content] items-center">
                <div class="truncate">
                  {{ data?.id }}
                </div>
                <div>
                  <button class="btn btn-ghost btn-xs" @click.prevent="copy()">
                    Copiar
                  </button>
                </div>
              </li>
            </ul>
            <ul>
              <li class="text-neutral">
                Pagamento
              </li>
              <li>
                Dinheiro
              </li>
            </ul>
            <ul>
              <li class="text-neutral">
                Endereço
              </li>
              <li>
                {{ data?.address?.bairro }}
              </li>
            </ul>
          </div>
          <div class="border-b" />
          <div>
            <nuxt-link v-if="data?.Business?.whatsapp" :href="`https://wa.me/${useMaskRemover(data?.Business?.whatsapp)}/?text=${formatted_message}`" class="btn btn-primary btn-sm gap-3">
              <Icon name="logos:whatsapp-icon" />
              Conversar com a loja
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="grid grid-rows-[1fr_max-content] gap-3 rounded-md bg-base-200">
        <div class="max-h-64 overflow-y-auto md:max-h-none">
          <div class="relative grid gap-3 p-6 pb-3">
            <div v-for="(item, i) in data?.ProductOnOrder" :key="i" class="grid grid-cols-[max-content_1fr] gap-3">
              <div class="indicator">
                <div class="flex h-16 w-16 overflow-hidden rounded-lg">
                  <nuxt-img v-if="item.product?.images?.at(0)?.Key" class="object-cover" :src="usePrefixImages(item.product?.images?.at(0)?.Key)" />
                </div>
                <span class="badge indicator-item badge-primary aspect-square">{{ item.quantity }}</span>
              </div>
              <div class="grid grid-flow-col items-center justify-between gap-3">
                <div class="grid">
                  <div class="truncate text-xl font-bold">
                    {{ item.product.name }}
                  </div>
                  <div class="text-md truncate font-thin">
                    {{ item.product.description }}
                  </div>
                </div>
                <div class="text-xl">
                  {{ useMoney(item.product.price * item.quantity) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-b border-base-300" />
        <div class="px-6">
          <span class="text-2xl">
            {{ useMoney(data?.ProductOnOrder?.reduce((red, item) => red += (item.quantity * item.product.price), 0) ?? 0)
            }} + Entrega
          </span>
        </div>
        <div class="px-6 pb-6">
          Nós vamos enviar mensagens quando seus itens estiverem a caminho
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const route = useRoute()
const data = await $fetch(`/api/v1/order/${route.params.slug}/${route.params.id}`)

const formatted_message = computed(() => {
  const greating = encodeURIComponent(`Olá, ${useGreeting()}.`).replace(/'/g, '%27').replace(/"/g, '%22')
  const message = encodeURIComponent(`Eu fiz o pedido #${data?.id} em ${data?.Business.name} e gostaria de dar continuidade no meu atendimento por aqui.`).replace(/'/g, '%27').replace(/"/g, '%22')
  return [greating, message].join('%0a')
})

const source = ref(data?.id ?? '')
const { text, copy, copied, isSupported } = useClipboard({ source })
</script>
