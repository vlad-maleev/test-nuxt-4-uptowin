<template>
  <BaseButton
    icon-only
    aria-label="Toggle color theme"
    title="Toggle color theme"
    @click="toggleTheme"
  >
    <Moon class="size-5 dark:hidden" aria-hidden="true" />
    <Sun class="hidden size-5 dark:block" aria-hidden="true" />
  </BaseButton>
</template>

<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'

const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
