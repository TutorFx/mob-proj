<template>
  <teleport to="body">
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="modelValue" class="fixed inset-0 z-40 bg-base-300/25" />
    </Transition>
    <Transition
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 pt-16">
        <div class="container flex max-h-full justify-end">
          <div ref="cartzone" class="card-body max-w-md gap-3 rounded-xl bg-base-100">
            <div class="grid grid-flow-col justify-between">
              <div class="text-lg font-bold">
                Meu carrinho ({{ cart.$quantity ?? 0 }})
              </div><button class="btn btn-circle btn-ghost btn-sm" @click.prevent="modelValue = false">
                <Icon name="mdi:close" />
              </button>
            </div>
            <ui-cart-item v-for="(item) in cart.$get?.items" :key="item.id" :item="item" />
            <div class="grid grid-flow-col justify-between">
              <div>Valor</div>
              <span>{{ useMoney(cart.$get?.info.pricesum || 0) }}</span>
            </div>
            <div class="card-actions">
              <nuxt-link :disabled="cart.$quantity === 0 ? true : undefined" class="btn btn-primary btn-block" :to="{ name: 'loja-slug-checkout', params: { slug:route.params.slug } }">
                Finalizar Compra
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const cart = useCart()
const cartzone = ref(null)
const route = useRoute()

const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits<(e: 'update:modelValue', value: boolean) => void>()

const modelValue = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emits('update:modelValue', value)
  }
})

onClickOutside(cartzone, event => (
  modelValue.value = false
))
</script>
