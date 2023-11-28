<template>
  <section class="bg-white">
    <div class="container mx-auto flex min-h-screen items-center px-6 py-12">
      <div>
        <p class="text-sm font-medium text-primary">
          Erro {{ error.statusCode }}
        </p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          {{ error.message }}
        </h1>
        <p class="mt-4 text-gray-500">
          Desculpe, parece que a página que você procura não existe.
        </p>

        <div class="mt-6 flex items-center gap-x-3">
          <button
            class="btn btn-ghost btn-md gap-x-2 border border-base-300"
            @click.prevent="$router.go(-1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 rtl:rotate-180"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>Voltar</span>
          </button>
          <nuxt-link to="/">
            <button
              class="btn btn-primary btn-md"
            >
              Voltar para o início
            </button>
          </nuxt-link>
        </div>

        <div class="mt-10 space-y-6">
          <div>
            <a href="#" class="inline-flex items-center gap-x-2 text-sm text-primary hover:underline">
              <span>Documentação</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 rtl:rotate-180"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>

            <p class="mt-2 text-sm text-gray-500">
              Se aprofunde em nossa documentação.
            </p>
          </div>

          <div>
            <a href="#" class="inline-flex items-center gap-x-2 text-sm text-primary hover:underline">
              <span>Nosso blog</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 rtl:rotate-180"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>

            <p class="mt-2 text-sm text-gray-500">
              Read the latest posts on our blog.
            </p>
          </div>

          <div>
            <a href="#" class="inline-flex items-center gap-x-2 text-sm text-primary hover:underline">
              <span>Abrir ticket</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 rtl:rotate-180"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>

            <p class="mt-2 text-sm text-gray-500">
              Nosso time está aqui para ajudar.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type ErrorResponse = {
  url: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  stack: string;
};
defineProps<{error: ErrorResponse}>()
</script>
