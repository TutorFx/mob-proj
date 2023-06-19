<template>
  <ui-nav>
    <template #default>
      <nuxt-link :to="{ name: 'loja-slug' }" class="btn btn-ghost normal-case font-black text-xl">{{ data?.name }}</nuxt-link>
    </template>
    <template #end>
      <ui-cart-icon />
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-md btn-circle avatar">
          <div class="w-10 rounded-full">
            <client-only>
              <user-avatar />
            </client-only>
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-base-100 rounded-box w-52 backdrop-blur-md bg-primary-content/60">
          <li>
            <nuxt-link :to="{ name: 'dashboard' }" class="justify-between">
              Perfil
              <span class="badge">New</span>
            </nuxt-link>
          </li>
          <li><nuxt-link :to="{ name: 'carteira' }">Carteira</nuxt-link></li>
          <li>
            <a>Sair</a>
          </li>
        </ul>
      </div>
    </template>
  </ui-nav>

</template>

<script setup lang="ts">
  defineProps<{data: INav}>()
  const cart = useCart()
</script>