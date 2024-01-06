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
        <form @submit.prevent="auth.register(userdata)">
          <div class="form-container vertical grid gap-2">
            <div class="form-item vertical">
              <NuxaInput
                id="email"
                v-model="userdata.email"
                placeholder="meu_email@meuprovedor.com"
                label="E-mail"
                :theme="
                  auth.isdirty.value && emailErrors.length
                    ? 'danger'
                    : 'primary'
                "
              />
              <NuxaDisplayError
                v-if="auth.isdirty.value && emailErrors.length"
                :data="emailErrors"
              />
              <div v-else class="min-h-6"></div>
            </div>
            <div class="form-item vertical">
              <NuxaInput
                id="CPF"
                v-model="userdata.cpf"
                v-maska
                placeholder="###.###.###-##"
                label="CPF"
                data-maska="###.###.###-##"
                data-maska-eager
                :theme="
                  auth.isdirty.value && cpfErrors.length ? 'danger' : 'primary'
                "
              />
              <NuxaDisplayError
                v-if="auth.isdirty.value && cpfErrors.length"
                :data="cpfErrors"
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
                  auth.isdirty.value && passwordErrors.length
                    ? 'danger'
                    : 'primary'
                "
              />
              <NuxaDisplayError
                v-if="auth.isdirty.value && passwordErrors.length"
                :data="passwordErrors"
              />
              <div v-else class="min-h-6"></div>
            </div>
            <NuxaButton type="submit" :loading="auth.pending.value">
              Cadastrar
            </NuxaButton>
            <div class="mt-4 text-center">
              <span>Já tem conta? </span
              ><NuxtLink
                class="text-primary hover:underline"
                :to="{ name: 'login', query: $route.query }"
                >Entrar</NuxtLink
              >
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

const userdata = ref({
  email: "",
  cpf: "",
  password: "",
});

const auth = new CreateAuthentication();

const errors = useZodError("registerSchema", userdata);

const emailErrors = useZodFieldError("email", errors);
const cpfErrors = useZodFieldError("cpf", errors);
const passwordErrors = useZodFieldError("password", errors);
</script>
