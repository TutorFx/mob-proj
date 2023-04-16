<template>
  <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    logado :)
    <button @click.prevent="signOut()">sair</button>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAuth()
definePageMeta({ middleware: 'auth' })
</script>