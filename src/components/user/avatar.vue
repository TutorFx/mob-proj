<template>
  <img :src="`https://avatar.vercel.sh/${auth?.data?.id}`" class="w-8 h-8 rounded-full" alt="" srcset="">
</template>

<script lang="ts" setup>
const auth = useAuth()
</script>