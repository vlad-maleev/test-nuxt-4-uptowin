<template>
  <select v-model="model" class="select">
    <option v-if="showAll" :value="null">All</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts" generic="T extends string | number | null">
defineProps<{
  options: readonly Exclude<T, null>[]
  showAll?: boolean
}>()

const model = defineModel<T>({ required: true })
</script>

<style scoped>
.select {
  padding: 6px;
}
</style>
