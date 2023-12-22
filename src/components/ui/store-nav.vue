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
        class="max-h-12"
        :to="{ name: 'loja-slug', params: { slug: data.slug } }"
      >
        <NuxtImg
          height="100%"
          max-height="48px"
          width="auto"
          placeholder="16"
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
