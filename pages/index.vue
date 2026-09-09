<template>
  <div>
    <UserFilters v-model:search="search" v-model:role="role" v-model:per-page="perPage" />

    <UserTable :users="paginatedUsers" @sort="onSort" />

    <div class="pagination">
      <button :disabled="page === 1" @click="page--">Prev</button>

      <span>{{ page }} / {{ totalPages }}</span>

      <button :disabled="page === totalPages" @click="page++">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { users } from '~/data/users'
import { useUsersTable } from '~/composables/useUsersTable'
import type { UserSortField } from '~/types/user'

const { search, role, sortBy, sortDirection, page, perPage, paginatedUsers, totalPages } =
  useUsersTable(users)

function onSort(field: UserSortField) {
  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortDirection.value = 'asc'
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
