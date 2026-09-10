import type { LocationQuery, LocationQueryValue } from 'vue-router'
import {
  PAGE_SIZES,
  USER_ROLES,
  type SortDirection,
  type UsersTableState,
  type UserRole,
  type UserSortField
} from '~/types/user'

function getQueryValue(
  value: LocationQueryValue | LocationQueryValue[] | undefined
): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function isUserRole(value: string | undefined): value is UserRole {
  return USER_ROLES.some((role) => role === value)
}

function isSortField(value: string | undefined): value is UserSortField {
  return value === 'age' || value === 'createdAt'
}

function isSortDirection(value: string | undefined): value is SortDirection {
  return value === 'asc' || value === 'desc'
}

export function parseUsersTableQuery(query: LocationQuery): UsersTableState {
  const role = getQueryValue(query.role)
  const sortBy = getQueryValue(query.sort)
  const sortDirection = getQueryValue(query.order)
  const page = Number(getQueryValue(query.page))
  const perPage = Number(getQueryValue(query.perPage))

  return {
    search: getQueryValue(query.search) ?? '',
    role: isUserRole(role) ? role : null,
    sortBy: isSortField(sortBy) ? sortBy : null,
    sortDirection: isSortDirection(sortDirection) ? sortDirection : 'asc',
    page: Number.isInteger(page) && page > 0 ? page : 1,
    perPage: PAGE_SIZES.find((size) => size === perPage) ?? 10
  }
}

export function serializeUsersTableQuery(state: UsersTableState) {
  const query: Record<string, string> = {}

  if (state.search !== '') query.search = state.search
  if (state.role !== null) query.role = state.role

  if (state.sortBy !== null) {
    query.sort = state.sortBy
    query.order = state.sortDirection
  }

  if (state.page !== 1) query.page = String(state.page)
  if (state.perPage !== 10) query.perPage = String(state.perPage)

  return query
}
