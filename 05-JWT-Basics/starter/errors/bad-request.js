const CustomApiError = require('./custom-error')

class badRequest extends Error {
    constructor(message) {
      super(message)
      this.statusCode = statusCode
    }
  }
  
  module.exports = CustomAPIError