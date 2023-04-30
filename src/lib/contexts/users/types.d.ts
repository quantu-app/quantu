export type IPublicUser = {
  id: number
  username: string
  confirmed: boolean
  active: boolean
  creator: boolean
}

export class InactiveUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InactiveUserError";
  }
}