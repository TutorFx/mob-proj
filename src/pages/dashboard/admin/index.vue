<template>
  <div class="max-w-4xl min-h-full">
    <div class="p-3">
      <div v-if="businesses && !pending" class="grid">
        <table class="border-collapse table-auto w-full text-sm">
          <thead>
            <tr>
              <th class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Image</th>
              <th class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Nome</th>
              <th class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Status</th>
              <th class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Visivel</th>
              <th class="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Dono</th>
            </tr>
          </thead>
          <tbody>
            <BusinessTableRule v-for="(business, i) in businesses" :key="i" :data="business" />
          </tbody>
        </table>
      </div>
      <div v-else-if="error">

      </div>
      <div v-else>
        skeletons
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { data: businesses, error, pending } = await useAsyncData<IBusinessWithImage[]>('admin-business', () => $fetch('/api/v1/private/admin'))
</script>