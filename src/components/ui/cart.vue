<template>
  <teleport to="body">
    <div v-if="modelValue" class="absolute inset-0 top-16 bg-base-300/25 z-50">
      <div class="flex justify-end container">
        <div class="card-body rounded-xl bg-base-100 max-w-md" ref="cartzone">
          <span class="font-bold text-lg">Meu carrinho ({{ cart.$quantity }})</span>
          <span class="text-info">Subtotal: {{ useMoney(cart.$get?.info.pricesum || 0) }}</span>
          <div v-for="(item, i) in cart.$get?.items">
            <div class="grid grid-cols-[max-content_1fr_max-content] items-center gap-3 justify-start">
              <nuxt-img class="w-16 h-16 row-span-2" :src="item.images?.at(0)?.secure_url"></nuxt-img>
              <div class="truncate">{{ item.name }}</div>
              <div>{{ useMoney(item.price || 0) }}</div>
              <div class="grid grid-flow-col items-center justify-start gap-3">
                <button class="btn btn-circle btn-xs" @click="cart.decrement_amount( item.id )">
                  <Icon name="mdi:minus" />
                </button> 
                <div>
                  {{ cart.get_item_amount( item.id ) }} 
                </div>
                <button class="btn btn-circle btn-xs" @click="cart.incrise_amount( item.id )">
                  <Icon name="mdi:plus" />
                </button>
              </div>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary btn-block">Exibir carrinho</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const cart = useCart()
const cartzone = ref(null)

const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

onClickOutside(cartzone, (event) => (modelValue.value = false))

</script>
