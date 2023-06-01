<template>
  <div class="grid grid-flow-row grid-rows-[max-content] md:grid-rows-1 md:grid-flow-col md:grid-cols-[minmax(max-content,401px)_1fr] min-h-full">
    <div class="md:border-r order-last md:order-first grid grid-rows-[max-content] md:grid-rows-[1fr_max-content]">
      <div class="relative">
        <div class="relative md:absolute inset-0 overflow-y-auto">
          <ProductAdminList />
        </div>
      </div>
      <div class="order-first md:order-last border-b mb:border-b-0 border-t-0 md:border-t">
        <div class="p-6" v-if="$route.name === 'dashboard-slug-produto-novo'">
          <nuxt-link :to="{name: 'dashboard-slug-produto'}" class="btn btn-primary btn-outline w-full" >Voltar</nuxt-link>
        </div>      
        <div class="p-6" v-else-if="$route.name === 'dashboard-slug-produto-productid'">
          <nuxt-link :to="{name: 'dashboard-slug-produto-novo'}" class="btn btn-primary w-full mb-3" >Novo produto</nuxt-link>
          <nuxt-link :to="{name: 'dashboard-slug-produto'}" class="btn btn-error btn-outline w-full" >Cancelar Edição</nuxt-link>
        </div>
        <div class="p-6" v-else>
          <nuxt-link :to="{name: 'dashboard-slug-produto-novo'}" class="btn btn-primary w-full" >Novo produto</nuxt-link>
        </div>
      </div>
    </div>
    <div class="border-b md:border-b-0 relative">
      <div class="relative md:absolute inset-0 overflow-auto">
        <div class="p-6">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>