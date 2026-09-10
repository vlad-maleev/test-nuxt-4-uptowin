<template>
  <div class="relative">
    <select
      v-model="model"
      class="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white py-2 pr-10 pl-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100"
    >
      <option v-if="showAll" :value="null">{{ allLabel }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ formatOption(option) }}
      </option>
    </select>

    <ChevronDown
      class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-400"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends string | number | null">
import { ChevronDown } from '@lucide/vue'

withDefaults(
  defineProps<{
    options: readonly Exclude<T, null>[]
    showAll?: boolean
    allLabel?: string
  }>(),
  {
    allLabel: 'All'
  }
)

const model = defineModel<T>({ required: true })

function formatOption(option: Exclude<T, null>) {
  const value = String(option)

  return value.charAt(0).toUpperCase() + value.slice(1)
}
</script>
