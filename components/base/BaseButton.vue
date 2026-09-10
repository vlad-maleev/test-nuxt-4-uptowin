<template>
  <button
    type="button"
    class="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white text-sm leading-none font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-3 focus-visible:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:focus-visible:ring-emerald-900"
    :class="iconOnly ? 'size-10' : 'gap-1.5 px-3 py-2'"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  iconOnly?: boolean
}>()
</script>
