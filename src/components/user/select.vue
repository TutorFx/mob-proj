<template>
  <div>
    <businessCreate />
    <ClientOnly>
      <Listbox v-model="selectedUser">
        <div class="relative">
          <ListboxButton
            class="group relative grid w-full cursor-default grid-flow-col rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            :class="{ 'flex h-10 items-center': !currentUserName }"
          >
            <span
              class="block truncate font-semibold"
              :class="{
                'isloading h-4 w-32 rounded-md bg-primary-content':
                  !currentUserName,
              }"
              >{{ currentUserName }}</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center rounded-md px-1 group-hover:bg-base-200"
            >
              <Icon class="h-5 w-5 text-gray-400" name="mdi:chevron-up-down" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="scrollbar w-46 border-ghost shadow-lg absolute z-10 mt-1 max-h-96 overflow-auto rounded-md border bg-base-100/30 p-2 text-base ring-1 ring-black ring-opacity-5 drop-shadow-xl backdrop-blur-2xl focus:outline-none sm:text-sm"
            >
              <div class="relative">
                <div
                  class="truncate px-4 py-3 text-base-300 mix-blend-difference"
                >
                  Conta pessoal
                </div>
                <ListboxOption
                  v-slot="{ active, selected }"
                  key="profile"
                  value=""
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-base-100/50 text-base-100' : 'text-base-100',
                      'relative cursor-default select-none rounded-md py-2 pl-4 pr-10',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate mix-blend-difference',
                      ]"
                      >{{ auth.session.email }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 right-0 flex items-center pr-3 text-nuxa"
                    >
                      <Icon class="h-5 w-5" name="mdi:check" />
                    </span>
                  </li>
                </ListboxOption>
                <div
                  class="truncate px-4 py-3 text-base-300 mix-blend-difference"
                >
                  Conta empresarial
                </div>
                <div v-if="pendingBusinesses" class="flex justify-center py-3">
                  <ui-spinner />
                </div>
                <ListboxOption
                  v-for="place in scopedBusinesses"
                  v-else
                  v-slot="{ active, selected }"
                  :key="place?.name"
                  :value="place"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-base-100/50 text-base-100' : 'text-base-100',
                      'relative cursor-default select-none rounded-md py-2 pl-4 pr-10',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate mix-blend-difference',
                      ]"
                      >{{ place?.name }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 right-0 flex items-center pr-3 text-nuxa"
                    >
                      <Icon class="h-5 w-5" name="mdi:check" />
                    </span>
                  </li>
                </ListboxOption>
                <button
                  class="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-2 text-nuxa hover:bg-nuxa hover:text-white"
                  @click.prevent="businessStore.$open()"
                >
                  <Icon name="ic:outline-add-business" size="20" />
                  <div>adicionar empresa</div>
                </button>
                <nuxt-link
                  v-if="auth.session.role === 'ADMIN'"
                  :to="{ name: 'dashboard-admin' }"
                  class="group flex w-full cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-2 text-nuxa hover:bg-nuxa hover:text-white"
                >
                  <Icon name="mdi:shield-outline" size="20" />
                  <div>administrativo</div>
                </nuxt-link>
              </div>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
      <template #fallback>
        <div
          class="group relative flex h-10 w-full animate-pulse cursor-default items-center rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span
            class="isloading block h-4 w-32 truncate rounded-md bg-base-300 font-semibold"
          />
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center rounded-md px-1 group-hover:bg-base-300"
          >
            <Icon class="h-5 w-5 text-gray-400" name="mdi:chevron-up-down" />
          </span>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Business } from "@prisma/client";
import { storeToRefs } from "pinia";

const auth = useAuthentication();

const { uuid } = useSchemas;

const props = defineProps<{ modelValue: Business | undefined }>();
const emits =
  defineEmits<(e: "update:modelValue", value: Business | undefined) => void>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const businessStore = useBusiness();

const { scopedBusinesses, pendingBusinesses } = storeToRefs(businessStore);

const route = useRoute();
const router = useRouter();

try {
  uuid.parse(route.params?.id);
} catch (e) {
  if (route.params?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Business Not Found",
    });
  }
}

const selectedUser = computed({
  get: () => {
    const { id } = route.params;
    return scopedBusinesses.value?.find((e) => e.id == id);
  },
  set: (user) => {
    const id = user?.id;
    if (id) {
      router.push({ name: "dashboard-id", params: { id: user.id } });
      console.log(id);
    } else {
      router.push({ name: "dashboard" });
    }
  },
});

watchEffect(() => (model.value = selectedUser.value));

const currentUserName = computed(() => {
  const { id } = route.params;
  return id ? selectedUser.value?.name : auth.session?.email;
});
</script>
