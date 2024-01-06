<template>
  <div class="app-layout-blank flex flex-auto flex-col h-[100vh]">
    <Modal />
    <div class="grid lg:grid-cols-3 h-full">
      <div
        data-theme="corporate"
        class="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex bg-primary"
        style="background-image: url(&quot;/auth-side-bg.jpg&quot;)"
      >
        <div class="logo w-auto">
          <Icon size="120" name="Logotype" class="text-base-100" />
        </div>
        <div>
          <div class="mb-6 flex items-center gap-4">
            <span class="aspect-square w-16">
              <NuxtImg
                class="mask mask-hexagon aspect-square"
                width="64px"
                height="64px"
                :placeholder="6"
                sizes="xs:64px sm:64px lg:64px xl:64px xxl:64px 2xl:64px"
                src="/assets/crew/CTO/Gabriel Serejo Sorrentino.jpeg"
              />
            </span>
            <div class="text-base-100">
              <div class="font-semibold">Gabriel Serejo Sorrentino</div>
              <span class="opacity-80">CTO, Nuxa.io</span>
            </div>
          </div>
          <p class="text-lg text-base-100 opacity-80">
            Estou muito feliz em te-lo aqui, usuário. Espero que usando nossa
            ferramenta, você consiga atingir seus objetivos.
          </p>
        </div>
        <span class="text-base-100">
          Copyright © 2023 <span class="font-semibold">Nuxa.io</span>
        </span>
      </div>
      <div class="col-span-2 bg-base-100">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
