<template>
  <div>
    <UserFilters v-model:search="search" v-model:role="role" v-model:per-page="perPage" />

    <UserTable :users="paginatedUsers" @sort="toggleSort" />

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

const { search, role, page, perPage, paginatedUsers, totalPages, toggleSort } = useUsersTable(users)
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
