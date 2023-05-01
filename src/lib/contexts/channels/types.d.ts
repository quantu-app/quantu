
export type ChannelMembershipRole = "OWNER" | "MEMBER";

export interface IChannel {
  id: number
  name: string
  uri: string
}

export type ChannelCreateParams = {
  owner_id: number
  name: string
  uri: string
  role: ChannelMembershipRole
}