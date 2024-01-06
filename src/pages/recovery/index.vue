<template>
  <div class="min-h-full flex flex-col justify-center items-center">
    <div class="xl:min-w-[450px] px-8">
      <div class="block lg:hidden">
        <Icon name="Logotype" size="124" />
      </div>
      <div class="mb-8 hidden lg:block" />
      <div class="mb-8">
        <h3 class="mb-1">Redefinição de senha</h3>
        <p>Por favor, preencha suas credenciais.</p>
      </div>
      <div>
        <form @submit.prevent="auth.requestReset(userdata)">
          <div class="form-container vertical grid gap-2">
            <div class="form-item vertical">
              <NuxaInput
                id="username"
                v-model="userdata.credentials"
                v-maska
                :data-maska="isCredentialsCpf ? '###.###.###-##' : undefined"
                placeholder="E-mail ou CPF"
                label="Login"
                :theme="
                  auth.isdirty.value && credentialsError.length
                    ? 'danger'
                    : 'primary'
                "
              />
              <NuxaDisplayError
                v-if="auth.isdirty.value && credentialsError.length"
                :data="credentialsError"
              />
              <div v-else class="min-h-6"></div>
            </div>
            <NuxaButton type="submit" :loading="auth.pending.value">
              Redefinir senha
            </NuxaButton>
            <NuxtLink
              class="text-primary hover:underline"
              :to="{ name: 'login' }"
            >
              Voltar ao login
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" });
const auth = new CreateAuthentication();

const userdata = ref<IUseSchemas["resetSchema"]>({
  credentials: "",
});

const isCredentialsCpf = computed(
  () => !isNaN(Number(userdata.value.credentials.substring(0, 3))),
);

const errors = useZodError("resetSchema", userdata);
const credentialsError = useZodFieldError("credentials", errors);
</script>
