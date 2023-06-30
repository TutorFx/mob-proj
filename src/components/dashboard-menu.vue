<template>
  <div class="dashboard--menu flex justify-between items-center">
    <div class="flex items-center gap-3">
      <user-avatar />
      <user-select v-model="selected" />
    </div>
    <div class="grid grid-flow-col gap-3">
      <div class="tooltip tooltip-left" data-tip="Visualizar loja" v-if="selected?.slug">
        <nuxt-link :to="{ name: 'loja-slug', params: { slug: selected?.slug } }" class="btn btn-circle btn-ghost">
          <Icon name="ic:outline-remove-red-eye" size="22" />
        </nuxt-link>
      </div>
      <div class="tooltip tooltip-left" data-tip="Sair da conta">
        <button class="btn btn-circle btn-ghost" @click.prevent="useDeleteAuthetication()">
          <Icon name="ic:baseline-output" size="22" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Business } from "@prisma/client"
// TODO: Logout
const selected = ref<Business | undefined>()
</script>