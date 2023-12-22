<template>
  <div class="dashboard--menu flex items-center justify-between">
    <div class="flex items-center gap-3">
      <user-avatar />
      <user-select-v2 v-model="selected" />
    </div>
    <div class="grid grid-flow-col gap-3">
      <slot />
      <div
        v-if="selected?.slug"
        class="tooltip tooltip-left"
        data-tip="Visualizar loja"
      >
        <nuxt-link
          :to="{ name: 'loja-slug', params: { slug: selected?.slug } }"
          target="_blank"
          class="btn btn-circle btn-ghost"
        >
          <Icon name="ic:outline-remove-red-eye" size="22" />
        </nuxt-link>
      </div>
      <div class="tooltip tooltip-left" data-tip="Sair da conta">
        <button
          class="btn btn-circle btn-ghost"
          @click.prevent="useDeleteAuthetication()"
        >
          <Icon name="ic:baseline-output" size="22" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Business } from "@prisma/client";
const selected = ref<Business | undefined>();
</script>
