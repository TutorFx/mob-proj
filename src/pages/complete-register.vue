<template>
  <div class="login flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
          Finalize seu cadastro
        </h2>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true">
        <div class="shadow-sm -space-y-px rounded-md">
          <div>
            <label for="complete-name">Qual é seu nome pessoal?</label>
            <input
              id="complete-name"
              v-model="userdata.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Ex: João Alberto"
            >
          </div>
          <div>
            <label for="birthday">Quando é seu aniversário?</label>
            <input
              id="birthday"
              v-model="userdata.birthday"
              name="birthday"
              type="date"
              autocomplete="birthday"
              required
              class="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder=""
            >
          </div>
        </div>

        <div>
          <button
            class="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white focus-visible:outline hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click.prevent="finalizeRegister()"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true
})

const userdata = ref({
  name: null,
  birthday: null
})

async function finalizeRegister () {
  useFetch('/api/v1/private/user/complete', {
    method: 'POST',
    body: {
      ...userdata.value
    },
    onResponse ({ request, response, options }) {
      // Process the response data
      // if (response.status == 200)
    },
    onResponseError ({ request, response, options }) {
      // Handle the response errors
    }
  })
}
</script>
