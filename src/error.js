export class ApplicationError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

export class RequestError extends ApplicationError {
  constructor(status, message, body) {
    super(message)
    this.status = status
    this.body = body
  }
}
