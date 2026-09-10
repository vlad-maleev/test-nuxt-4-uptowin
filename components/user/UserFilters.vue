<template>
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-[minmax(0,1fr)_180px_140px]">
    <label class="block sm:col-span-2 md:col-span-1">
      <span class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Search users
      </span>
      <div class="relative">
        <Search
          class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          aria-hidden="true"
        />
        <input
          v-model="search"
          type="search"
          placeholder="Name or email"
          class="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-emerald-950"
        />
      </div>
    </label>

    <label class="block">
      <span class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Role</span>
      <BaseSelect v-model="role" :options="USER_ROLES" show-all all-label="All roles" />
    </label>

    <label class="block">
      <span class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Rows per page
      </span>
      <BaseSelect v-model="perPage" :options="PAGE_SIZES" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@lucide/vue'
import { PAGE_SIZES, USER_ROLES, type PageSize, type UserRole } from '~/types/user'

const search = defineModel<string>('search', { required: true })
const role = defineModel<UserRole | null>('role', { required: true })
const perPage = defineModel<PageSize>('perPage', { required: true })
</script>
