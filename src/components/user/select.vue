<template>
  <businessCreate />
  <ClientOnly>
    <Listbox v-model="selectedUser">
      <div class="relative">
        <ListboxButton
          class="group relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm grid-flow-col grid"
          :class="{ 'h-10 flex items-center': !currentUserName }">
          <span class="block truncate font-semibold"
            :class="{ 'animate-pulse w-32 h-4 bg-primary-content rounded-md': !currentUserName }">{{ currentUserName
            }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 group-hover:bg-base-200 rounded-md">
            <Icon class="h-5 w-5 text-gray-400" name="mdi:chevron-up-down" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">

          <ListboxOptions
            class="scrollbar backdrop-blur-md bg-primary-content/10 z-10 absolute mt-1 max-h-96 w-46 overflow-auto border border-ghost rounded-md p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div class="relative">
              <div class="text-gray-400 px-4 py-3 truncate">Conta pessoal</div>
              <ListboxOption v-slot="{ active, selected }" key="profile" value="" as="template">
                <li :class="[
                  active ? 'bg-primary/10 text-primary' : 'text-base-content',
                  'relative cursor-default select-none py-2 pr-10 pl-4 rounded-md',
                ]">
                  <span :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]">{{ data?.user?.email }}</span>
                  <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-3 text-primary">
                    <Icon class="h-5 w-5" name="mdi:check" />
                  </span>
                </li>
              </ListboxOption>
              <div class="text-gray-400 px-4 py-3 truncate">Conta empresarial</div>
              <div class="flex justify-center py-3" v-if="pendingBusinesses">
                <ui-spinner />
              </div>
              <ListboxOption v-else v-slot="{ active, selected }" v-for="place in scopedBusinesses" :key="place?.name"
                :value="place" as="template">
                <li :class="[
                  active ? 'bg-primary/10 text-primary' : 'text-base-content',
                  'relative cursor-default select-none py-2 pr-10 pl-4 rounded-md',
                ]">
                  <span :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]">{{ place?.name }}</span>
                  <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-3 text-primary">
                    <Icon class="h-5 w-5" name="mdi:check" />
                  </span>
                </li>
              </ListboxOption>
              <button @click.prevent="businessStore.$open()"
                class="group px-3 py-2 w-full flex items-center gap-2 truncate text-primary hover:bg-primary hover:text-primary-content rounded-lg cursor-pointer">
                <Icon name="mdi:plus-circle-outline" size="20" />
                <div>
                  adicionar empresa
                </div>
              </button>
            </div>
          </ListboxOptions>

        </transition>
      </div>
    </Listbox>
    <template #fallback>
      <div
        class="animate-pulse h-10 flex items-center group relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span class="block bg-base-300 truncate font-semibold w-32 h-4 rounded-md"></span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 group-hover:bg-gray-800 rounded-md">
          <Icon class="h-5 w-5 text-gray-400" name="mdi:chevron-up-down" />
        </span>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
const { data } = useAuth()
const { uuid } = useSchemas


const businessStore = useBusiness();

const { scopedBusinesses, pendingBusinesses } = storeToRefs(businessStore)


const route = useRoute();
const router = useRouter();

try {
  uuid.parse(route.params?.id)
} catch (e) {
  if (route.params?.id) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Business Not Found'
    })
  }
}

const selectedUser = computed({
  get: () => {
    const { id } = route.params;
    return scopedBusinesses.value?.find(e => e.id == id);
  },
  set: (user) => {
    const id = user?.id
    if (id) {
      router.push({ name: 'dashboard-id', params: { id: user.id } });
    } else {
      router.push({ name: 'dashboard' });
    }
  }
})

const currentUserName = computed(
  () => {
    const { id } = route.params;
    return id ? selectedUser.value?.name : data.value?.user?.email
  }
)
</script>