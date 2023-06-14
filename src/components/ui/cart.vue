<template>
  <teleport to="body">
    <Transition enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="fixed inset-0 bg-base-300/25 z-40" v-if="modelValue" />
    </Transition>
    <Transition enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight">
      <div v-if="modelValue" class="fixed inset-0 pt-16 z-50">
        <div class="flex justify-end max-h-full container">
          <div class="card-body gap-3 rounded-xl bg-base-100 max-w-md" ref="cartzone">
            <div class="font-bold text-lg">Meu carrinho ({{ cart.$quantity }})</div>
            <ui-cart-item v-for="(item) in cart.$get?.items" :item="item" :key="item.id" />
            <div class="grid grid-flow-col justify-between">
              <div>Valor</div>
              <span>{{ useMoney(cart.$get?.info.pricesum || 0) }}</span>
            </div>
            <div class="card-actions">
              <nuxt-link :disabled="cart.$quantity === 0 ? true : undefined" class="btn btn-primary btn-block" :to="{ name: 'loja-slug-checkout' }">Finalizar Compra</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
const cart = useCart()
const cartzone = ref(null)

const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits<(e: 'update:modelValue', value: boolean) => void>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

onClickOutside(cartzone, (event) => (
  modelValue.value = false
))

</script>
