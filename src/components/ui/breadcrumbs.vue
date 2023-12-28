<template>
  <nav aria-label="Breadcrumb">
    <ol class="grid-flow-col grid list-none truncate items-stretch gap-2">
      <li class="flex items-center gap-2 truncate">
        <nuxt-link
          :to="{ name: 'loja-slug', params: { slug: product.Business.slug } }"
          class="flex max-w-[20ch] items-center gap-1 truncate whitespace-nowrap transition-colors hover:text-primary uppercase"
        >
          {{ product.Business.name }}
        </nuxt-link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 flex-none rotate-180 stroke-base transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
          aria-labelledby="title-01 description-01"
          role="graphics-symbol"
        >
          <title id="title-01">Seta</title>
          <desc id="description-01">
            Ícone de seta que aponta para a próxima página em tamanhos de
            resolução de tela grande e para a página anterior em tamanhos de
            resolução de tela pequena.
          </desc>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </li>
      <li class="grid grid-flow-col items-center truncate gap-2">
        <nuxt-link
          to="#"
          class="flex items-center gap-1 truncate whitespace-nowrap text-base transition-colors hover:text-primary uppercase"
        >
          {{ product.name }}
        </nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  product: IProductWithImage;
}>();
</script>
