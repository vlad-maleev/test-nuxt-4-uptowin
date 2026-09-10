<template>
  <button
    type="button"
    class="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
    aria-label="Toggle color theme"
    title="Toggle color theme"
    @click="toggleTheme"
  >
    <Moon class="size-5 dark:hidden" aria-hidden="true" />
    <Sun class="hidden size-5 dark:block" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'

const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
