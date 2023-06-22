<template>
  <div ref="container" class="overflow-hidden relative">
    <div class="absolute inset-0 flex items-center gap-3 p-3 bg-error/10 rounded-lg">
      <Icon name="mdi:cart-remove" class="text-error my-auto" size="30"  />
      <h3 class="text-error font-black">Remover</h3>
    </div>
    <div ref="target" :class="{ animated: !isSwiping }" :style="{ left, opacity }"
      class="overlay rounded-lg bg-base-100 relative grid grid-cols-[max-content_1fr_max-content] items-center gap-3 justify-start">
      <div class="w-16 h-16 row-span-2 rounded-lg overflow-hidden">
        <nuxt-img class="object-cover min-h-full min-w-full" :src="item.images?.at(0)?.secure_url"></nuxt-img>
      </div>
      <div class="truncate">{{ item.name }}</div>
      <div>{{ useMoney(item.price || 0) }}</div>
      <div class="grid grid-flow-col items-center justify-start gap-3">
        <button class="btn btn-circle btn-ghost btn-xs" @click="cart.decrement_amount(item.id)">
          <Icon v-if="cart.get_item_amount(item.id) > 1" size="24" name="mdi:minus" />
          <Icon v-else size="24" name="mdi:cart-remove" class="text-error" />
        </button>
        <div>
          {{ cart.get_item_amount(item.id) || 0 }}
        </div>
        <button class="btn btn-circle btn-ghost btn-xs" @click="cart.incrise_amount(item.id)">
          <Icon size="24" name="mdi:plus" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from '@vueuse/core';
import type { UseSwipeDirection } from '@vueuse/core'
import { IItem } from '~/types/cart';

const props = defineProps<{ item: IItem }>()
const cart = useCart()

const target = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const containerWidth = computed(() => container.value?.offsetWidth)
const left = ref('0')
const opacity = ref(1)
const { direction, isSwiping, lengthX, lengthY } = useSwipe(
  target, {
  onSwipe(e: TouchEvent) {
    if (containerWidth.value) {
      if (lengthX.value < 0) {
        const length = Math.abs(lengthX.value)
        left.value = `${length}px`
        opacity.value = 1.1 - length / containerWidth.value
      }
      else {
        left.value = '0'
        opacity.value = 1
      }
    }
  },
  onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
    if (lengthX.value < 0 && containerWidth.value && (Math.abs(lengthX.value) / containerWidth.value) >= 0.5) {
      left.value = '100%'
      opacity.value = 0
      cart.remove_product(props.item.id);
    }
    else {
      left.value = '0'
      opacity.value = 1
    }
  },
})
</script>

<style lang="scss" scoped>

.overlay.animated {
  transition: all 0.2s ease-in-out;
}

.overlay>p {
  color: #fff;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}

.status {
  text-align: center;
}
</style>