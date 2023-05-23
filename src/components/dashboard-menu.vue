<template>
  <div class="dashboard--menu flex justify-between items-center">
    <div class="flex items-center gap-3">
      <user-avatar />
      <user-select />
    </div>
    <div class="tooltip tooltip-left" data-tip="Sair da conta">
      <button class="btn btn-circle btn-ghost" @click.prevent="signOut()"><Icon name="ic:baseline-output" size="22" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAuth()
</script>