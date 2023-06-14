<template>
  <client-only>
    <div>
      <label tabindex="0" class="btn btn-ghost btn-md btn-circle animate__animated"
        :class="{ 'animate__tada': isAnimated }" @click="cart.isVisible = true">
        <div class="indicator">
          <Icon name="mdi:cart-outline" size="24" />
          <span class="badge badge-sm indicator-item" v-if="cart.$quantity > 0">{{ cart.$quantity }}</span>
        </div>
      </label>
      <ui-cart v-model="cart.isVisible" />
    </div>
    <template #fallback>
      <div>
        <label tabindex="0" class="btn btn-ghost btn-md btn-circle animate__animated"
          :class="{ 'animate__tada': isAnimated }" @click="cart.isVisible = true">
          <div class="indicator">
            <Icon name="mdi:cart-outline" size="24" />
          </div>
        </label>
      </div>
    </template>
  </client-only>
</template>

<script setup lang="ts">
import { useSound } from '@vueuse/sound';
import push from '@/sfx/push.mp3';
import pop from '@/sfx/pop.mp3';

const { play: playPush } = useSound(push, {
  interrupt: false,
})

const { play: playPop } = useSound(pop, {
  interrupt: false,
})

const cart = useCart()
const isAnimated = ref(false);
watch(
  () => cart.$quantity,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      playPush();
      cart.isVisible = true;
      isAnimated.value = true;
      setTimeout(() => {
        isAnimated.value = false;
      }, 1000);
    }
    if (oldVal > newVal) {
      playPop();
    }
  }
)
</script>