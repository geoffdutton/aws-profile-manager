class InvalidInputError extends Error {
  constructor(...props) {
    super(...props)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports.InvalidInputError = InvalidInputError
