import type { User } from "@prisma/client"
import type { IPublicUser } from "./types"

export function toPublicUserJSON(user: User): IPublicUser {
  return {
    id: user.id,
    username: user.username,
    confirmed: user.confirmed,
    active: user.active,
    creator: user.creator
  }
}