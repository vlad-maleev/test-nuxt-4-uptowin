<template>
  <div class="filters">
    <input v-model="search" placeholder="Search by name or email" />

    <BaseSelect v-model="role" :options="USER_ROLES" show-all />

    <BaseSelect v-model="perPage" :options="PAGE_SIZES" />
  </div>
</template>

<script setup lang="ts">
import { PAGE_SIZES, USER_ROLES, type PageSize, type UserRole } from '~/types/user'

const search = defineModel<string>('search', { required: true })
const role = defineModel<UserRole | null>('role', { required: true })
const perPage = defineModel<PageSize>('perPage', { required: true })
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
