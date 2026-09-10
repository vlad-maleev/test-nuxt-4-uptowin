import type { SortDirection, UsersTableState, User, UserRole, UserSortField } from '~/types/user'
import { parseUsersTableQuery, serializeUsersTableQuery } from '~/utils/usersTableQuery'

export function useUsersTable(users: readonly User[]) {
  const route = useRoute()
  const router = useRouter()
  const queryState = computed(() => parseUsersTableQuery(route.query))

  function updateQuery(patch: Partial<UsersTableState>, replace = false) {
    const state = { ...queryState.value, ...patch }
    const query = serializeUsersTableQuery(state)

    if (replace) {
      void router.replace({ query })
    } else {
      void router.push({ query })
    }
  }

  // filters
  const search = ref(queryState.value.search)
  const debouncedSearch = useDebounce(search)

  const role = computed({
    get: () => queryState.value.role,
    set: (value: UserRole | null) => updateQuery({ role: value, page: 1 })
  })

  const filteredUsers = computed(() => {
    const searchQuery = debouncedSearch.value.trim().toLowerCase()

    return users.filter((user) => {
      const matchesRole = role.value === null || user.role === role.value
      const matchesSearch =
        searchQuery === '' ||
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)

      return matchesRole && matchesSearch
    })
  })

  watch(debouncedSearch, (value) => {
    if (value !== queryState.value.search) {
      updateQuery({ search: value, page: 1 }, true)
    }
  })

  watch(
    () => queryState.value.search,
    (value) => {
      if (value !== search.value) {
        search.value = value
      }
    }
  )

  // sorting
  const sortBy = computed(() => queryState.value.sortBy)
  const sortDirection = computed(() => queryState.value.sortDirection)

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

  function toggleSort(field: UserSortField) {
    const direction: SortDirection =
      sortBy.value === field && sortDirection.value === 'asc' ? 'desc' : 'asc'

    updateQuery({ sortBy: field, sortDirection: direction, page: 1 })
  }

  // pagination
  const perPage = computed({
    get: () => queryState.value.perPage,
    set: (value: UsersTableState['perPage']) => updateQuery({ perPage: value, page: 1 })
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(sortedUsers.value.length / perPage.value))
  )

  const page = computed({
    get: () => Math.min(queryState.value.page, totalPages.value),
    set: (value: number) => {
      const nextPage = Math.min(Math.max(value, 1), totalPages.value)
      updateQuery({ page: nextPage })
    }
  })

  const paginatedUsers = computed(() => {
    const start = (page.value - 1) * perPage.value

    return sortedUsers.value.slice(start, start + perPage.value)
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
    totalPages,
    toggleSort
  }
}
