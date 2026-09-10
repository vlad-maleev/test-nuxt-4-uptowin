<template>
  <main class="min-h-screen bg-slate-50 py-5 transition-colors dark:bg-slate-950 sm:py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header class="mb-6 flex items-start justify-between gap-4 sm:mb-8">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Users
          </h1>
          <p class="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            Browse your team, filter by role and sort users by age or creation date.
          </p>
        </div>

        <ThemeToggle />
      </header>

      <section
        class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="border-b border-slate-200 p-4 dark:border-slate-800 sm:p-6">
          <UserFilters v-model:search="search" v-model:role="role" v-model:per-page="perPage" />
        </div>

        <UserTable
          :users="paginatedUsers"
          :sort-by="sortBy"
          :sort-direction="sortDirection"
          @sort="toggleSort"
        />

        <footer
          class="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Showing
            <span class="font-medium text-slate-900 dark:text-slate-100">
              {{ rangeStart }}–{{ rangeEnd }}
            </span>
            of
            <span class="font-medium text-slate-900 dark:text-slate-100">
              {{ filteredUsers.length }}
            </span>
            users
          </p>

          <div class="flex items-center justify-between gap-3 sm:justify-end">
            <span class="text-sm text-slate-500 dark:text-slate-400">
              Page {{ page }} of {{ totalPages }}
            </span>
            <div class="flex gap-2">
              <BaseButton aria-label="Previous page" :disabled="page === 1" @click="page--">
                <ChevronLeft class="size-4 translate-y-px" aria-hidden="true" />
                <span class="hidden sm:inline">Previous</span>
              </BaseButton>
              <BaseButton aria-label="Next page" :disabled="page === totalPages" @click="page++">
                <span class="hidden sm:inline">Next</span>
                <ChevronRight class="size-4 translate-y-px" aria-hidden="true" />
              </BaseButton>
            </div>
          </div>
        </footer>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { users } from '~/data/users'
import { useUsersTable } from '~/composables/useUsersTable'

const {
  search,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  filteredUsers,
  paginatedUsers,
  totalPages,
  toggleSort
} = useUsersTable(users)

const rangeStart = computed(() =>
  filteredUsers.value.length === 0 ? 0 : (page.value - 1) * perPage.value + 1
)
const rangeEnd = computed(() => Math.min(page.value * perPage.value, filteredUsers.value.length))
</script>
