<template>
  <div
    class="grid min-h-full grid-flow-row grid-rows-[max-content] md:grid-flow-col md:grid-cols-[minmax(max-content,401px)_1fr] md:grid-rows-1"
  >
    <div
      class="order-last grid grid-rows-[max-content] md:order-first md:grid-rows-[1fr_max-content] md:border-r"
    >
      <div class="relative">
        <div class="relative inset-0 overflow-y-auto md:absolute">
          <ProductAdminList />
        </div>
      </div>
      <div
        class="mb:border-b-0 order-first border-b border-t-0 md:order-last md:border-t"
      >
        <div v-if="$route.name === 'dashboard-id-produto-novo'" class="p-6">
          <nuxt-link
            :to="{ name: 'dashboard-id-produto' }"
            class="btn btn-outline btn-primary w-full"
          >
            Voltar
          </nuxt-link>
        </div>
        <div
          v-else-if="$route.name === 'dashboard-id-produto-productid'"
          class="p-6"
        >
          <nuxt-link
            :to="{ name: 'dashboard-id-produto-novo' }"
            class="btn btn-primary mb-3 w-full"
          >
            Novo produto
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'dashboard-id-produto' }"
            class="btn btn-outline btn-error w-full"
          >
            Cancelar Edição
          </nuxt-link>
        </div>
        <div v-else class="p-6">
          <nuxt-link
            :to="{ name: 'dashboard-id-produto-novo' }"
            class="btn btn-primary w-full"
          >
            Novo produto
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="relative border-b md:border-b-0">
      <div class="relative inset-0 overflow-auto md:absolute">
        <div class="min-h-full p-6">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>
