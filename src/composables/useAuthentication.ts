import { useSchemas } from "@/composables/useSchemas";
import { useTimestamp } from "@vueuse/core";
import { useCookies } from "@vueuse/integrations/useCookies";
import moment from "moment";
import { defineStore } from "pinia";
import { z } from "zod";
import {validateToken} from "@/types";

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
      return JSON.parse(atob(token.value?.split(".")[1])) as validateToken;
    } catch (e) {
      return {
        id: null,
        nome: null,
        email: null,
        plan: null,
        iat: null,
        exp: null,
      };
    }
  });

  const isAuthenticated = computed(() => {
    try {
      if (!tokenData.value) return false;
      if (!moment.unix(tokenData.value?.exp).isValid()) return false;
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
      useSchemas.loginSchema.parse(state)
      $fetch('/api/v1/auth/login', {
        method: 'POST',
        body: state
      }).then(() => {
        const route = useRoute()
        const store = useAuthentication()
        const { callback } = route.query;
        if (!callback) return useRouter().push('/dashboard');
        if (store.isAuthenticated && !(callback instanceof Array)) return useRouter().push(decodeURI(callback));
        else watch(() => store.isAuthenticated, (newVal, oldVal) => {
          if (!(newVal && !oldVal)) return;
          if (!(callback instanceof Array)) return useRouter().push(decodeURI(callback));
        })
      })
    } catch (err) { }
  }
}

export class CreateRecovery {
  static status: number;
  static message: string;
  async login(credential: string) {
    try {
      await $fetch("/api/v1/auth/request-reset", {
        method: "POST",
        body: { credential },
      })
    } catch (err) {

    }
  }
}

export const useDeleteAuthetication = () => {
  const cookie = useCookie("token");
  cookie.value = undefined;
};
