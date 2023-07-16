<template>
  <header class="py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12"><a aria-label="Home" href="/#">
            <Icon name="Logotype" width="180" height="40" />
          </a>
          <div class="hidden md:flex md:gap-x-6">
            <nuxt-link
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              :to="{ hash: '#teste' }">Benefícios</nuxt-link>
            <nuxt-link
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              :to="{ hash: '#teste' }">Nossos clientes</nuxt-link>
            <nuxt-link
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              :to="{ hash: '#teste' }">Preço</nuxt-link>
          </div>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="hidden md:block"><a
              class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              href="/login">Entrar</a></div><a
            class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-nuxa-600 text-white hover:text-slate-100 hover:bg-nuxa-500 active:bg-nuxa-800 active:text-nuxa-100 focus-visible:outline-nuxa-600"
            href="/register"><span>Cadastre-se <span class="hidden lg:inline">hoje</span></span></a>
          <div class="-mr-1 md:hidden">
            <div data-headlessui-state=""><button
                class="relative z-10 flex h-8 w-8 items-center justify-center [&amp;:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation" type="button" aria-expanded="false" data-headlessui-state=""><svg
                  aria-hidden="true" class="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" stroke-width="2"
                  stroke-linecap="round">
                  <path d="M0 1H14M0 7H14M0 13H14" class="origin-center transition"></path>
                  <path d="M2 2L12 12M12 2L2 12" class="origin-center transition scale-90 opacity-0"></path>
                </svg></button></div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>