import type { User, Email } from "@prisma/client"
import type { IPublicUser } from "./types"
import { MD5 } from "md5-js-tools"

export function toPublicUserJSON(user: User & { emails: Email[]}): IPublicUser {
  
  const primaryEmail = user.emails[0] ? user.emails[0].email : "";

  return {
    id: user.id,
    username: user.username,
    emailHash: MD5.generate(primaryEmail),
    confirmed: user.confirmed,
    active: user.active,
    creator: user.creator
  }

}