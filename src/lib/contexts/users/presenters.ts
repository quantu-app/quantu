import type { User } from "@prisma/client"

export type IPublicUser = {
  id: number
  username: string
  confirmed: boolean
}

export function toPublicUserJSON(user: User): IPublicUser {
  return {
    id: user.id,
    username: user.username,
    confirmed: user.confirmed
  }
}