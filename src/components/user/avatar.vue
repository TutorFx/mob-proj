<template>
  <img :src="data?.user?.image || `https://avatar.vercel.sh/${user()}`" class="w-8 h-8 rounded-full" alt="" srcset="">
</template>

<script lang="ts" setup>
const { data } = useAuth()
const user = () => btoa(data.value?.user?.email || '')
</script>