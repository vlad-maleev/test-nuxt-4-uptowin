import { USER_ROLES, type User } from '~/types/user'

export const users: User[] = Array.from({ length: 50 }, (_, index) => {
  return {
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    age: 18 + (index % 40),
    role: USER_ROLES[index % USER_ROLES.length]!,
    createdAt: new Date(Date.now() - index * 1000 * 60 * 60 * 24).toISOString()
  }
})
