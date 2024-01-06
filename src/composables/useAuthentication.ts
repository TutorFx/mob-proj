import { useTimestamp } from "@vueuse/core";
import { useCookies } from "@vueuse/integrations/useCookies";
import type { z } from "zod";
import { ZodError } from "zod";
import moment from "moment";
import { FetchError } from "ofetch";
import { defineStore } from "pinia";
import type { IValidateToken } from "@/types";
import type { IUseSchemas } from "./useSchemas";
type Login = z.infer<typeof useSchemas.loginSchema>;
type Register = z.infer<typeof useSchemas.registerSchema>;

export const useAuthentication = defineStore("authentication", () => {
  const cookies = useCookies(["token"]);
  const token = ref(cookies.get("token"));
  const timestamp = useTimestamp({ offset: 0 });

  setInterval(function () {
    token.value = cookies.get("token");
  }, 500);

  const tokenData = computed(() => {
    try {
      return JSON.parse(atob(token.value?.split(".")[1])) as IValidateToken;
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

class Auth {
  public lastRequest: Ref<number | null> = ref(null);
  public isdirty = computed(() => {
    const r = this.lastRequest.value;
    const t = useTimestamp({ offset: 0 });
    const now = new Date(t.value);

    if (typeof r !== "number") return false;

    const lastRequest = new Date(r);
    const nextTime = lastRequest.setSeconds(lastRequest.getSeconds() + 3);

    if (now.valueOf() > nextTime.valueOf()) return false;

    return true;
  });
  touch() {
    const now = new Date();
    this.lastRequest.value = now.valueOf();
  }
}

export class CreateAuthentication extends Auth {
  public status = ref(200);
  public pending: Ref<boolean> = ref(false);

  async login(state: Login) {
    try {
      this.touch();
      useSchemas.loginSchema.parse(state);
      this.pending.value = true;
      await $fetch("/api/v1/auth/login", {
        method: "POST",
        body: state,
      });
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
    } catch (err) {
      if (err instanceof FetchError) {
        if (err.statusCode) {
          this.status.value = err.statusCode;
        } else {
          this.status.value = 204;
        }
      }
      if (err instanceof ZodError) {
        this.status.value = 204;
      }
    } finally {
      this.pending.value = false;
    }
  }
  async register(state: Register) {
    try {
      this.touch();
      this.pending.value = true;
      useSchemas.registerSchema.parse(state);
      await $fetch("/api/v1/register", {
        method: "POST",
        body: {
          ...state,
        },
      });
      this.login({
        username: state.email,
        password: state.password,
      });
    } catch (err) {
      if (err instanceof FetchError) {
        if (err.statusCode) {
          this.status.value = err.statusCode;
        } else {
          this.status.value = 204;
        }
      }
      if (err instanceof ZodError) {
        this.status.value = 204;
      }
    } finally {
      this.pending.value = false;
    }
  }
  async requestReset(state: IUseSchemas["resetSchema"]) {
    try {
      this.pending.value = true;
      this.touch();
      useSchemas.resetSchema.parse(state);
      await $fetch("/api/v1/auth/request-reset", {
        method: "POST",
        body: state,
      });
    } catch (err) {
      if (err instanceof FetchError) {
        if (err.statusCode) {
          this.status.value = err.statusCode;
        } else {
          this.status.value = 204;
        }
      }
      if (err instanceof ZodError) {
        this.status.value = 204;
      }
    } finally {
      this.pending.value = false;
    }
  }
  async applyReset(
    state: IUseSchemas["passwordReset"],
    token: string | string[],
  ) {
    try {
      this.pending.value = true;
      this.touch();
      useSchemas.passwordReset.parse(state);
      const router = useRouter();
      await $fetch("/api/v1/auth/apply-reset", {
        method: "POST",
        body: {
          password: state.password,
          token,
        },
      });
      await router.push("/dashboard");
    } catch (err) {
      if (err instanceof FetchError) {
        if (err.statusCode) {
          this.status.value = err.statusCode;
        } else {
          this.status.value = 204;
        }
      }
      if (err instanceof ZodError) {
        this.status.value = 204;
      }
    } finally {
      this.pending.value = false;
    }
  }
}

export const useDeleteAuthetication = () => {
  const cookie = useCookie("token");
  cookie.value = undefined;
};
