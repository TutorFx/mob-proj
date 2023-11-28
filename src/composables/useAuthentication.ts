import { useTimestamp } from "@vueuse/core";
import jwt from "jsonwebtoken";
import { useCookies } from "@vueuse/integrations/useCookies";
import type { z } from "zod";
import { ZodError } from "zod";
import moment from "moment";
import { FetchError } from "ofetch";
import { defineStore } from "pinia";
import { VerifyAuthentication } from "@/server/utils/auth";
import type { IValidateToken } from "@/types";
import { useSchemas } from "@/composables/useSchemas";
type Login = z.infer<typeof useSchemas.loginSchema>;

export const useAuthentication = defineStore("authentication", () => {
  const cookies = useCookies(["token"]);
  const token = ref(cookies.get("token"));
  const timestamp = useTimestamp({ offset: 0 });

  setInterval(function () {
    token.value = cookies.get("token");
  }, 500);

  const tokenData = computed(() => {
    try {
      return JSON.parse(atob(token.value?.split(".")[1])) as validateToken;
    } catch (e) {
      return false;
    }
  });

  const session = computed(() => {
    try {
      return JSON.parse(atob(token.value?.split(".")[1])) as IValidateToken;
    } catch (e) {
      return {
        id: null,
        nome: null,
        email: null,
        plan: null,
        iat: null,
        exp: null,
        role: null,
      };
    }
  });

  const isAuthenticated = computed(() => {
    try {
      if (!tokenData.value) {
        return false;
      }
      if (!moment.unix(tokenData.value?.exp).isValid()) {
        return false;
      }
      const expiration = moment.unix(tokenData.value?.exp);
      const now = moment(timestamp.value);
      return Boolean(expiration.diff(now) > 0);
    } catch (e) {
      return false;
    }
  });

  return { token, isAuthenticated, session };
});

export class CreateAuthentication {
  static status: number;
  static message: string;
  login(state: Login) {
    try {
      useSchemas.loginSchema.parse(state);
      $fetch("/api/v1/auth/login", {
        method: "POST",
        body: state,
      }).then(() => {
        const route = useRoute();
        const store = useAuthentication();
        const { callback } = route.query;
        if (!callback) {
          return useRouter().push("/dashboard");
        }
        if (store.isAuthenticated && !(callback instanceof Array)) {
          return useRouter().push(decodeURI(callback));
        } else {
          watch(
            () => store.isAuthenticated,
            (newVal, oldVal) => {
              if (!(newVal && !oldVal)) {
                return;
              }
              if (!(callback instanceof Array)) {
                return useRouter().push(decodeURI(callback));
              }
            },
          );
        }
      });
    } catch (err) {}
  }
}

export class CreateRecovery {
  state = ref({
    credential: "",
  });

  get = () => {
    return this.state.value;
  };

  async generate() {
    try {
      const alert = new NuxaAlert();
      await $fetch("/api/v1/auth/request-reset", {
        method: "POST",
        body: { ...this.get() },
      });
      return alert.success({
        title: "Sucesso",
        body: "Enviamos um email para redefinir sua senha",
        cancel: "Voltar",
      });
    } catch (error) {
      const alert = new NuxaAlert();
      if (error instanceof FetchError) {
        if (error.status === 404) {
          return alert.warning({
            title: "Usuário inválido",
            body: "Usuário não encontrado",
            cancel: "Voltar",
          });
        }

        return alert.warning({
          title: "Erro inesperado",
          body: "Ocorreu um erro ao processar seu pedido, tente novamente mais tarde.",
          cancel: "Voltar",
        });
      }
    }
  }
}

export class UseRecovery {
  state = ref({
    password: "",
    passwordConfirmation: "",
  });

  get = () => {
    return this.state.value;
  };

  async reset(token: string | string[]) {
    try {
      useSchemas.passwordReset.parse(this.get());
      const router = useRouter();
      await $fetch("/api/v1/auth/apply-reset", {
        method: "POST",
        body: {
          password: this.state.value.password,
          token,
        },
      });
      await router.push("/dashboard");
    } catch (error) {
      const alert = new NuxaAlert();
      if (error instanceof ZodError) {
        return alert.warning({
          title: "Senha inválida",
          body: /* html */ `
          <div>
            Tente novamente, utilizando senhas que atendem aos seguintes critérios:
            <div class="prose">
              <div>
                <ol class="w-auto mx-auto grid">
                  <li>Pelo menos 8 caracteres</li>
                  <li>Pelo menos 1 letra maiúscula</li>
                  <li>Pelo menos 1 número</li>
                  <li>As senhas devem conferir</li>
                </ol>
              </div>
            </div>
          </div>
          `,
          cancel: "Voltar",
        });
      }
      if (error instanceof FetchError) {
        return alert.warning({
          title: "Erro ao enviar dados",
          body: "Tente novamente mais tarde",
          cancel: "Voltar",
        });
      }
    }
  }
}

export const useDeleteAuthetication = () => {
  const cookie = useCookie("token");
  cookie.value = undefined;
};
