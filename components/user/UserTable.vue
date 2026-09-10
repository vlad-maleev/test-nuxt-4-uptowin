<template>
  <div class="max-h-[60vh] overflow-auto sm:max-h-[520px]">
    <table class="w-full min-w-[760px] text-left text-sm">
      <thead
        class="sticky top-0 z-10 bg-slate-100 text-xs tracking-wide text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400"
      >
        <tr>
          <th class="px-6 py-4 font-semibold">User</th>
          <th class="px-4 py-4 font-semibold">Email</th>
          <th class="px-4 py-4 font-semibold">
            <button
              class="sort-button hover:text-slate-900 dark:hover:text-slate-100"
              type="button"
              @click="$emit('sort', 'age')"
            >
              Age
              <component :is="sortIcon('age')" class="size-4" aria-hidden="true" />
            </button>
          </th>
          <th class="px-4 py-4 font-semibold">Role</th>
          <th class="px-6 py-4 font-semibold">
            <button
              class="sort-button hover:text-slate-900 dark:hover:text-slate-100"
              type="button"
              @click="$emit('sort', 'createdAt')"
            >
              Created
              <component :is="sortIcon('createdAt')" class="size-4" aria-hidden="true" />
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
        <tr
          v-for="user in users"
          :key="user.id"
          class="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
        >
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
              >
                {{ user.name.charAt(0) }}
              </div>
              <span class="font-medium text-slate-900 dark:text-slate-100">{{ user.name }}</span>
            </div>
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
            {{ user.email }}
          </td>
          <td class="px-4 py-4 text-slate-700 tabular-nums dark:text-slate-300">
            {{ user.age }}
          </td>
          <td class="px-4 py-4">
            <span
              class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize"
              :class="roleClasses[user.role]"
            >
              {{ user.role }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
            {{ formatDate(user.createdAt) }}
          </td>
        </tr>

        <tr v-if="users.length === 0">
          <td colspan="5" class="px-6 py-16 text-center">
            <Users
              class="mx-auto mb-3 size-8 text-slate-400 dark:text-slate-600"
              aria-hidden="true"
            />
            <p class="font-medium text-slate-900 dark:text-slate-100">No users found</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Try changing your search or role filter.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp, ArrowUpDown, Users } from '@lucide/vue'
import type { SortDirection, User, UserRole, UserSortField } from '~/types/user'

const props = defineProps<{
  users: readonly User[]
  sortBy: UserSortField | null
  sortDirection: SortDirection
}>()

defineEmits<{
  sort: [field: UserSortField]
}>()

const roleClasses: Record<UserRole, string> = {
  admin: 'bg-red-50 text-red-700 ring-1 ring-red-600/20 dark:bg-red-950 dark:text-red-300',
  manager:
    'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-950 dark:text-amber-300',
  user: 'bg-slate-100 text-slate-600 ring-1 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300'
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(date))
}

function sortIcon(field: UserSortField) {
  if (props.sortBy !== field) return ArrowUpDown

  return props.sortDirection === 'asc' ? ArrowUp : ArrowDown
}
</script>

<style scoped>
.sort-button {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  gap: 0.375rem;
  transition: color 150ms ease;
}

</style>
