import type { PageSize, SortDirection, User, UserRole, UserSortField } from '~/types/user'

export function useUsersTable(_users: readonly User[]) {
  // filters
  const search = ref('')
  const role = ref<UserRole | null>(null)

  // sorting
  const sortBy = ref<UserSortField | null>(null)
  const sortDirection = ref<SortDirection>('asc')

  // pagination
  const page = ref(1)
  const perPage = ref<PageSize>(10)

  // TODO:
  // - filteredUsers
  // - sortedUsers
  // - paginatedUsers
  // - totalPages
  const paginatedUsers = computed<User[]>(() => [])
  const totalPages = computed(() => 1)

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    paginatedUsers,
    totalPages
  }
}
