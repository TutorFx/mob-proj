<template>
  <div class="block">
    <div class="relative">
      <div>
        <client-only>
          <Swiper class="fallimg" :slides-per-view="1" :modules="[Pagination, Virtual, Autoplay]" :autoplay="{ delay: 5000 }" :pagination="{ clickable: true }" virtual>
            <SwiperSlide v-for="(image, i) in images" :key="i">
              <div class="aspect-[4/3] lg:aspect-square flex items-center justify-center overflow-hidden">
                <nuxt-img :src="image?.secure_url" class="object-cover min-w-full min-h-full"
                  :alt="'product-image-' + i" />
              </div>
            </SwiperSlide>
          </Swiper>
          <template #fallback>
            <div class="fallimg aspect-[4/3] lg:aspect-square flex items-center justify-center overflow-hidden">
              <nuxt-img v-if="images?.at(0)?.secure_url" :src="images?.at(0)?.secure_url" class="object-cover min-w-full min-h-full" alt="product-image" />
            </div>
          </template>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Virtual, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
defineProps<{
  images: {
    id: string,
    secure_url: string,
  }[] | undefined
}>()
</script>

<style lang="scss">
:root {
  --swiper-theme-color: {
    @apply bg-none;
  }
}

.swiper-pagination-bullet-active {
  @apply bg-primary;
}
</style>

<style scoped>
.fallimg {
  view-transition-name: selected-product;
}
</style>