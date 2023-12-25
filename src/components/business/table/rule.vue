<template>
  <tr>
    <td class="border-b p-4">
      <div class="flex h-10 w-16 items-center justify-center overflow-hidden">
        <nuxt-img
          v-if="data.Image?.Key"
          height="40"
          width="64"
          class="bg-base-100"
          fit="contain"
          :src="usePrefixImages(data.Image?.Key)"
          placeholder
        />
      </div>
    </td>
    <td class="border-b p-4">
      {{ data.name }}
    </td>
    <td class="border-b p-4">
      <NuxaButton
        :color="!data.banned ? 'success' : 'danger'"
        @click="$emit('toggle-ban', data.id)"
      >
        {{ data.banned ? "Banido" : "Online" }}
      </NuxaButton>
    </td>
    <td class="border-b p-4">
      {{ data.visible }}
    </td>
    <td class="border-b p-4">
      {{ data.Owner?.nome ?? data.Owner?.email }}
    </td>
    <td class="border-b p-4">...</td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{ data: IBusinessWithImage }>();
defineEmits<{
  (e: "toggle-ban", id: string): void;
}>();
</script>
