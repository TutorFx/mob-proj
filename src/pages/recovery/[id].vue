<template>
  <div class="min-h-full flex flex-col justify-center items-center">
    <div class="xl:min-w-[450px] px-8">
      <div class="block lg:hidden">
        <Icon name="Logotype" size="124" />
      </div>
      <div class="mb-8 hidden lg:block" />
      <div class="mb-8">
        <h3 class="mb-1">Redefinição de senha</h3>
        <p>Por favor, agora defina sua nova senha.</p>
      </div>
      <div>
        <form @submit.prevent="auth.applyReset(userdata, $route.params.id)">
          <div class="form-container vertical grid gap-2">
            <div class="form-item vertical">
              <NuxaInput
                id="senha"
                v-model="userdata.password"
                v-maska
                type="password"
                placeholder="******"
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
            <div class="form-item vertical">
              <NuxaInput
                id="csenha"
                v-model="userdata.passwordConfirmation"
                v-maska
                type="password"
                placeholder="******"
                label="Confirme a Senha"
                :theme="
                  auth.isdirty.value && passwordConfirmationError.length
                    ? 'danger'
                    : 'primary'
                "
              />
              <NuxaDisplayError
                v-if="auth.isdirty.value && passwordConfirmationError.length"
                :data="passwordConfirmationError"
              />
              <div v-else class="min-h-6"></div>
            </div>
            <NuxaButton type="submit" :loading="auth.pending.value">
              Redefinir senha
            </NuxaButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" });

const auth = new CreateAuthentication();

const userdata = ref({
  password: "",
  passwordConfirmation: "",
});

const errors = useZodError("passwordReset", userdata);
const passwordError = useZodFieldError("password", errors);
const passwordConfirmationError = useZodFieldError(
  "passwordConfirmation",
  errors,
);
</script>
