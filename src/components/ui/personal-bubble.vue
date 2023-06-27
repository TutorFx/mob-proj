<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-md btn-circle avatar">
      <div class="w-10 rounded-full">
        <user-avatar />
      </div>
    </label>
    <ul tabindex="0"
      class="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-base-100 rounded-box w-52 backdrop-blur-md bg-primary-content/60">
      <li>
        <nuxt-link :to="{ name: 'dashboard' }">
          <Icon name="ic:outline-manage-accounts" />
          Perfil
        </nuxt-link>
      </li>
      <li><nuxt-link :to="{ name: 'carteira' }">
          <Icon name="ic:outline-wallet" />Carteira
        </nuxt-link></li>
      <li v-if="status === 'authenticated'">
        <a @click.prevent="signOut()">
          <Icon name="ic:baseline-output" /> Sair
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { signOut, status } = useAuth()
</script>