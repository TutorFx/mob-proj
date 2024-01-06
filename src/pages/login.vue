<template>
  <div class="min-h-full flex flex-col justify-center items-center">
    <div class="xl:min-w-[450px] px-8">
      <div class="block lg:hidden">
        <Icon name="Logotype" size="124" />
      </div>
      <div class="mb-8 hidden lg:block" />
      <div class="mb-8">
        <h3 class="mb-1">Bem-vindo de volta!</h3>
        <p>Por favor, preencha suas credenciais.</p>
      </div>
      <div>
        <form @submit.prevent="auth.login(userdata)">
          <div class="form-container vertical grid gap-2">
            <div class="form-item vertical">
              <NuxaInput
                id="username"
                v-model="userdata.username"
                v-maska
                :data-maska="isUsernameCpf ? '###.###.###-##' : undefined"
                placeholder="E-mail ou CPF"
                label="Login"
                :theme="
                  auth.isdirty.value && usernameError.length
                    ? 'danger'
                    : 'primary'
                "
              />
              <NuxaDisplayError
                v-if="auth.isdirty.value && usernameError.length"
                :data="usernameError"
              />
              <div v-else class="min-h-6"></div>
            </div>
            <div class="form-item vertical">
              <NuxaInput
                id="password"
                v-model="userdata.password"
                placeholder="******"
                type="password"
                label="Senha"
                :theme="
                  auth.isdirty.value && passwordError.length
                    ? 'danger'
                    : 'primary'
                "
              />
              <NuxaDisplayError
                v-if="auth.isdirty.value && passwordError.length"
                :data="passwordError"
              />
              <div v-else class="min-h-6"></div>
            </div>
            <div class="flex justify-between mb-6">
              <label class="checkbox-label flex gap-2 mb-0 items-center">
                <input
                  class="checkbox checkbox-primary checkbox-sm"
                  type="checkbox"
                  name="rememberMe"
                  value="true"
                />
                <span class="ltr:ml-2 rtl:mr-2">Lembre-me</span></label
              >
              <NuxtLink
                class="text-primary hover:underline"
                :to="{ name: 'recovery' }"
                >Esqueceu a senha?</NuxtLink
              >
            </div>
            <NuxaButton type="submit" :loading="auth.pending.value">
              Entrar
            </NuxaButton>
            <div class="mt-4 text-center">
              <span>Não tem conta ainda? </span>
              <NuxtLink
                class="text-primary hover:underline"
                :to="{ name: 'register', query: $route.query }"
              >
                Cadastrar
              </NuxtLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const auth = new CreateAuthentication();
const isUsernameCpf = computed(
  () => !isNaN(Number(userdata.value.username.substring(0, 3))),
);

const userdata = ref({
  username: "",
  password: "",
});

const errors = useZodError("loginSchema", userdata);
const usernameError = useZodFieldError("username", errors);
const passwordError = useZodFieldError("password", errors);
</script>
