<template>
  <div class="bg-base-100">
    profile dash
    <input type="text" v-model="test.test">
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import { RemovableRef, useLocalStorage } from "@vueuse/core";
const { status, data } = useAuth();
const test = ref<RemovableRef<{ test: undefined; }>>(useLocalStorage('cart', {test: undefined}))
</script>