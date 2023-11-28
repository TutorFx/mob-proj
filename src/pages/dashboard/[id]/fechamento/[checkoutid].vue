<template>
  <div>
    <div class="grid min-h-full gap-6 p-6 md:grid-cols-2">
      <div>
        <div class="grid gap-3 py-6">
          <div class="grid grid-flow-col items-center justify-start gap-3">
            <div class="text-3xl">
              {{ data?.contact?.nome }}
            </div>
            <dashboard-order-status class="text-white" :name="data.status" />
          </div>
          <div v-if="data.status === 'NEW'">
            O pedido está em rota de entrega
          </div>
          <div v-else-if="data.status === 'PRODUCING'">
            O pedido está sendo produzido
          </div>
          <div v-else-if="data.status === 'PENDING'">
            O pedido está em rota de entrega
          </div>
          <div v-else-if="data.status === 'DELIVERED'">
            O pedido foi entregue
          </div>
          <div class="border-b" />
          <div class="grid gap-6 xl:grid-cols-3">
            <ul>
              <li class="text-neutral">Data do Pedido</li>
              <li>
                <client-only>
                  {{
                    data?.createdAt
                      ? new Date(data?.createdAt).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                          weekday: "short",
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                  }}
                  <template #fallback>
                    <div class="isloading mt-2 h-4 w-full rounded-md" />
                  </template>
                </client-only>
              </li>
            </ul>
            <ul>
              <li class="text-neutral">ID do Pedido</li>
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
              <li class="text-neutral">Pagamento</li>
              <li>Dinheiro</li>
            </ul>
          </div>
          <div class="border-b" />
          <div v-if="completeAddr" class="grid grid-cols-3 gap-6 gap-y-3">
            <div>
              <div>CEP</div>
              <div>
                {{ completeAddr.cep }}
              </div>
            </div>
            <div>
              <div>Estado</div>
              <div>
                {{ completeAddr.estado }}
              </div>
            </div>
            <div>
              <div>Cidade</div>
              <div>
                {{ completeAddr.cidade }}
              </div>
            </div>
            <div>
              <div>Endereço</div>
              <div>
                {{ completeAddr.endereco }}
              </div>
            </div>
            <div>
              <div>Bairro</div>
              <div>
                {{ completeAddr.bairro }}
              </div>
            </div>
            <div>
              <div>Número</div>
              <div>
                {{ completeAddr.numero }}
              </div>
            </div>
          </div>
          <div class="border-b" />
          <div>
            <nuxt-link
              v-if="data?.Business?.whatsapp"
              :href="`https://wa.me/${useMaskRemover(
                data?.Business?.whatsapp,
              )}/?text=${formatted_message}`"
              target="_blank"
              class="btn btn-primary btn-sm gap-3"
            >
              <Icon name="logos:whatsapp-icon" />
              Conversar com o cliente
            </nuxt-link>
          </div>
        </div>
      </div>
      <div
        class="grid grid-rows-[1fr_max-content] gap-3 rounded-md bg-base-200"
      >
        <div class="max-h-64 overflow-y-auto md:max-h-none">
          <div class="relative grid gap-3 p-6 pb-3">
            <div
              v-for="(item, i) in data?.ProductOnOrder"
              :key="i"
              class="grid grid-cols-[max-content_1fr] gap-3"
            >
              <div class="indicator">
                <div
                  class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg"
                >
                  <nuxt-img
                    class="object-cover"
                    width="64"
                    height="64"
                    fit="cover"
                    :src="usePrefixImages(item.product?.images?.at(0)?.Key)"
                  />
                </div>
                <span
                  class="badge indicator-item badge-primary aspect-square"
                  >{{ item.quantity }}</span
                >
              </div>
              <div
                class="grid grid-flow-col items-center justify-between gap-3"
              >
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
            {{
              useMoney(
                data?.ProductOnOrder?.reduce(
                  (red, item) => (red += item.quantity * item.product.price),
                  0,
                ) ?? 0,
              )
            }}
            + Entrega
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
import { useClipboard } from "@vueuse/core";
import type { TOrder } from "~/types/order";

const route = useRoute();
const data = await $fetch<TOrder>(
  `/api/v1/private/checkouts/${route.params.id}/${route.params.checkoutid}`,
  { headers: useRequestHeaders(["cookie"]) },
);
const user = useAuthentication();

if (!data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Dados não carregados",
  });
}

const completeAddr = data.address ? new AddressFormatter(data.address) : null;
await completeAddr?.fetch();

const formatted_message = computed(() => {
  const greating = encodeURIComponent(
    `Olá, ${useGreeting()} ${data.contact?.nome.toLocaleUpperCase()}.`,
  )
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  const message = encodeURIComponent(
    `Obrigado por escolher ${data?.Business.name}.`,
  )
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  const order = encodeURIComponent(`Seu número de pedido é #${data?.id}`)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return [greating, message, order].join("%0a");
});

const source = ref(data?.id ?? "");
const { text, copy, copied, isSupported } = useClipboard({ source });
</script>
