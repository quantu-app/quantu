export class InactiveUserError extends Error {
  constructor(message?: string) {
    super(message || "user is inactive");
    this.name = "InactiveUserError";
  }
}

export class UserNotCreatorError extends Error {
  constructor(message?: string) {
    super(message || "user is not a creator");
    this.name = "InactiveUserError";
  }
}