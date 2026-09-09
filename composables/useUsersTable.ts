import type { PageSize, SortDirection, User, UserRole, UserSortField } from '~/types/user'

export function useUsersTable(users: readonly User[]) {
  // filters
  const search = ref('')
  const role = ref<UserRole | null>(null)

  const filteredUsers = computed(() => {
    const searchQuery = search.value.trim().toLowerCase()

    return users.filter((user) => {
      const matchesRole = role.value === null || user.role === role.value
      const matchesSearch =
        searchQuery === '' ||
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)

      return matchesRole && matchesSearch
    })
  })

  // sorting
  const sortBy = ref<UserSortField | null>(null)
  const sortDirection = ref<SortDirection>('asc')

  const sortedUsers = computed(() => {
    if (sortBy.value === null) {
      return filteredUsers.value
    }

    const direction = sortDirection.value === 'asc' ? 1 : -1

    return [...filteredUsers.value].sort((firstUser, secondUser) => {
      const comparison =
        sortBy.value === 'age'
          ? firstUser.age - secondUser.age
          : Date.parse(firstUser.createdAt) - Date.parse(secondUser.createdAt)

      return comparison === 0 ? firstUser.id - secondUser.id : comparison * direction
    })
  })

  // pagination
  const page = ref(1)
  const perPage = ref<PageSize>(10)

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(sortedUsers.value.length / perPage.value))
  )

  const paginatedUsers = computed(() => {
    const start = (page.value - 1) * perPage.value

    return sortedUsers.value.slice(start, start + perPage.value)
  })

  watch([search, role, perPage], () => {
    page.value = 1
  })

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    filteredUsers,
    sortedUsers,
    paginatedUsers,
    totalPages
  }
}
