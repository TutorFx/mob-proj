<template>
  <ui-nav>
    <template #default>
      <nuxt-link
        v-if="!data.Image"
        :to="{ name: 'loja-slug', params: { slug: data.slug } }"
        class="btn btn-ghost text-xl font-black normal-case"
      >
        {{ data?.name }}
      </nuxt-link>
      <nuxt-link
        v-else
        class="min-h-12 grid items-center"
        :to="{ name: 'loja-slug', params: { slug: data.slug } }"
      >
        <NuxtImg
          height="100%"
          max-height="48px"
          class="max-h-12"
          width="auto"
          placeholder="16"
          sizes="xs:60px sm:60px lg:80px xl:120px xxl:120px 2xl:120px"
          densities="x1 x2 x3 x4"
          :modifiers="{ fit: 'contain' }"
          :src="usePrefixImages(data.Image.Key)"
        ></NuxtImg>
      </nuxt-link>
    </template>
    <template #end>
      <ui-cart-icon />
    </template>
  </ui-nav>
</template>

<script setup lang="ts">
import type { IBusinessWithImage } from "@/types";
defineProps<{ data: IBusinessWithImage }>();
</script>
