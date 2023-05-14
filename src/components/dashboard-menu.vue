<template>
  <div class="dashboard--menu flex justify-between items-center">
    <div>
      <user-select />
    </div>
    <div>
      <button class="btn btn-sm" @click.prevent="signOut()">Sair</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAuth()
</script>