<template>
  <div class="min-h-full max-w-4xl">
    <div class="p-3">
      <div v-if="businesses && !pending" class="grid">
        <table class="w-full table-auto border-collapse text-sm">
          <thead>
            <tr>
              <th class="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium">
                Image
              </th>
              <th class="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium">
                Nome
              </th>
              <th class="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium">
                Status
              </th>
              <th class="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium">
                Visivel
              </th>
              <th class="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium">
                Dono
              </th>
            </tr>
          </thead>
          <tbody>
            <BusinessTableRule v-for="(business, i) in businesses" :key="i" :data="business" />
          </tbody>
        </table>
      </div>
      <div v-else-if="error" />
      <div v-else>
        skeletons
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: businesses, error, pending } = await useAsyncData<IBusinessWithImage[]>('admin-business', () => $fetch('/api/v1/private/admin'))
</script>
