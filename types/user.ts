export const USER_ROLES = ['admin', 'manager', 'user'] as const
export const PAGE_SIZES = [10, 15, 20] as const

export type UserRole = (typeof USER_ROLES)[number]
export type PageSize = (typeof PAGE_SIZES)[number]
export type UserSortField = 'age' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

export interface User {
  id: number
  name: string
  email: string
  age: number
  role: UserRole
  createdAt: string
}
