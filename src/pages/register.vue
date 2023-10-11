<template>
  <div class="login flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">Registro</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Já tem uma
          <nuxt-link :to="{name: 'login', query: $route.query}" class="font-medium text-primary hover:text-secondary">conta</nuxt-link>?
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="userdata.email"
              class="relative block w-full rounded-t-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Email address">
          </div>
          <div>
            <label for="CPF" class="sr-only">CPF</label>
            <input id="CPF" name="CPF" type="text" autocomplete="CPF" required v-model="userdata.cpf"
              class="px-3 relative block w-full border-0 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="CPF">
          </div>
          <div>
            <label for="password" class="sr-only">Senha</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required
              v-model="userdata.password"
              class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Senha">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Continuar logado</label>
          </div>

          <div class="text-sm">
            <nuxt-link :to="{ name: 'recovery' }" class="font-medium text-primary hover:text-secondary">Esqueceu a
              senha?</nuxt-link>
          </div>
        </div>

        <div>
          <button @click.prevent="signUp()"
            class="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard',
  }
})

const userdata = ref({
  email: '',
  cpf: '',
  password: '',
})

const auth = new CreateAuthentication()

async function signUp() {
  useFetch('/api/v1/register', {
    method: 'POST',
    body: {
      ...userdata.value
    },
    onResponse({ request, response, options }) {
      // Process the response data
      if(response.status == 200) return auth.login({
        username: userdata.value.email,
        password: userdata.value.password,
      });
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    }
  })
}
</script>