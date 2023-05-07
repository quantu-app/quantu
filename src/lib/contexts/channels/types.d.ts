
export type ChannelMembershipRole = "OWNER" | "MEMBER";

export interface IPublicChannel {
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