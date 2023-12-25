<template>
  <div>
    <businessCreate />
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="group inline-flex w-full justify-center rounded-md bg-base-200 hover:bg-base-300 px-4 py-2 text-sm font-medium text-base-content focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <div
            v-if="business.getCurrentBusiness?.Image"
            class="isloading mr-2 h-5 w-5 mask mask-hexagon"
          >
            <nuxt-img
              width="20px"
              height="20px"
              :src="usePrefixImages(business.getCurrentBusiness.Image.Key)"
              class="mr-2 h-5 w-5"
            />
          </div>
          <span v-if="choice">
            {{ choice }}
          </span>
          <span v-else class="h-5 w-16 isloading rounded-lg" />
          <Icon
            class="-mr-1 ml-2 h-5 w-5 text-base-content group-hover:text-primary"
            aria-hidden="true"
            name="mdi:chevron-down"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute z-50 left-0 mt-2 w-56 origin-top-left divide-y divide-base-100 rounded-md bg-base-300 shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active, close }">
              <NuxtLink :to="{ name: 'dashboard' }" @mouseup="close">
                <button
                  :class="[
                    active
                      ? 'bg-base-200 text-base-content'
                      : 'text-base-content',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <Icon
                    :active="active"
                    class="mr-2 h-5 w-5 text-primary"
                    aria-hidden="true"
                    name="material-symbols:account-circle"
                  />
                  {{ user }}
                </button>
              </NuxtLink>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <div v-if="business.pendingBusinesses">
              <div
                v-for="i in 3"
                :key="i"
                class="text-base-content group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3"
              >
                <span class="isloading w-5 h-5 rounded-full" />
                <span class="isloading w-full h-5" />
              </div>
            </div>
            <MenuItem
              v-for="(store, i) in business.businessList"
              v-slot="{ active, close }"
              :key="i"
            >
              <NuxtLink
                :to="{ name: 'dashboard-id', params: { id: store.id } }"
                @mouseup="close"
              >
                <button
                  :class="[
                    active
                      ? 'bg-base-200 text-base-content'
                      : 'text-base-content',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <Icon
                    v-if="!store.Image"
                    :active="active"
                    class="mr-2 h-5 w-5 text-primary"
                    aria-hidden="true"
                    name="ic:outline-business"
                  />
                  <div v-else class="mask mask-hexagon isloading mr-2 h-5 w-5">
                    <NuxtImg
                      :active="active"
                      width="20px"
                      height="20px"
                      aria-hidden="true"
                      :src="usePrefixImages(store.Image?.Key)"
                    />
                  </div>

                  {{ store.name }}
                </button>
              </NuxtLink>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active, close }">
              <button
                :class="[
                  active
                    ? 'bg-base-200 text-base-content'
                    : 'text-base-content',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                @click="
                  business.$open();
                  close();
                "
              >
                <Icon
                  :active="active"
                  class="mr-2 h-5 w-5 text-primary"
                  aria-hidden="true"
                  name="material-symbols:add-business-outline"
                />
                Adicionar Empresa
              </button>
            </MenuItem>
            <MenuItem
              v-if="auth.session.role === 'ADMIN'"
              v-slot="{ active, close }"
            >
              <NuxtLink :to="{ name: 'dashboard-admin' }" @mouseup="close">
                <button
                  :class="[
                    active
                      ? 'bg-base-200 text-base-content'
                      : 'text-base-content',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <Icon
                    :active="active"
                    class="mr-2 h-5 w-5 text-primary"
                    aria-hidden="true"
                    name="ic:outline-admin-panel-settings"
                  />
                  Administrativo
                </button>
              </NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
const business = useBusiness();
const auth = useAuthentication();

const user = computed(() => auth.session.nome ?? auth.session.email);
const choice = computed(() =>
  business.selectedBusinessId ? business.$getBusiness()?.name : user.value,
);
</script>
