<template>
  <main class="min-h-screen bg-slate-50 py-8 sm:py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Users</h1>
        <p class="mt-2 max-w-2xl text-slate-500">
          Browse your team, filter by role and sort users by age or creation date.
        </p>
      </header>

      <section class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-200 p-5 sm:p-6">
          <UserFilters v-model:search="search" v-model:role="role" v-model:per-page="perPage" />
        </div>

        <UserTable
          :users="paginatedUsers"
          :sort-by="sortBy"
          :sort-direction="sortDirection"
          @sort="toggleSort"
        />

        <footer
          class="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <p class="text-sm text-slate-500">
            Showing
            <span class="font-medium text-slate-900">{{ rangeStart }}–{{ rangeEnd }}</span>
            of <span class="font-medium text-slate-900">{{ filteredUsers.length }}</span> users
          </p>

          <div class="flex items-center justify-between gap-3 sm:justify-end">
            <span class="text-sm text-slate-500">Page {{ page }} of {{ totalPages }}</span>
            <div class="flex gap-2">
              <button
                class="pagination-button"
                type="button"
                :disabled="page === 1"
                @click="page--"
              >
                <ChevronLeft class="size-4" aria-hidden="true" />
                Previous
              </button>
              <button
                class="pagination-button"
                type="button"
                :disabled="page === totalPages"
                @click="page++"
              >
                Next
                <ChevronRight class="size-4" aria-hidden="true" />
              </button>
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

<style scoped>
.pagination-button {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  gap: 0.375rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: white;
  color: #334155;
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
}

.pagination-button:hover:not(:disabled) {
  border-color: #94a3b8;
  background: #f8fafc;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
</style>
