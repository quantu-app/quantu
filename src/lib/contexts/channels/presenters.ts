import type { Channel } from "@prisma/client";
import type { IPublicChannel } from "./types"

export function toPublicChannelView(channel: Channel): IPublicChannel {
  return {
    id: channel.id,
    name: channel.name,
    uri: channel.uri
  }
}