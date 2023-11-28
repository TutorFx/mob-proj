<template>
  <div class="block">
    <div class="relative">
      <div>
        <client-only>
          <Swiper
            class="fallimg"
            :slides-per-view="1"
            :modules="[Pagination, Virtual, Autoplay]"
            :autoplay="{ delay: 5000 }"
            :pagination="{ clickable: true }"
            virtual
          >
            <SwiperSlide v-for="(image, i) in images" :key="i">
              <div class="flex aspect-[4/3] items-center justify-center overflow-hidden lg:aspect-square">
                <nuxt-img
                  :src="usePrefixImages(image?.Key)"
                  class="min-h-full min-w-full object-cover"
                  :alt="'product-image-' + i"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <template #fallback>
            <div class="fallimg flex aspect-[4/3] items-center justify-center overflow-hidden lg:aspect-square">
              <nuxt-img v-if="images?.at(0)?.Key" :src="usePrefixImages(images?.at(0)?.Key)" class="min-h-full min-w-full object-cover" alt="product-image" />
            </div>
          </template>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Virtual } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
defineProps<{
  images: {
    id: string,
    Key: string,
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
