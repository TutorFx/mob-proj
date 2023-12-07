<template>
  <div class="dropdown-end dropdown">
    <label tabindex="0" class="avatar btn btn-circle btn-ghost btn-md">
      <div class="w-10 rounded-full">
        <user-avatar />
      </div>
    </label>
    <ul
      tabindex="0"
      class="shadow-2xl dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 bg-primary-content/60 p-2 backdrop-blur-md"
    >
      <li>
        <nuxt-link :to="{ name: 'dashboard' }">
          <Icon name="ic:outline-manage-accounts" />
          Perfil
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'carteira' }">
          <Icon name="ic:outline-wallet" />Carteira
        </nuxt-link>
      </li>
      <li v-if="auth.isAuthenticated">
        <a @click.prevent="useDeleteAuthetication">
          <Icon name="ic:baseline-output" /> Sair
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthentication();
</script>
