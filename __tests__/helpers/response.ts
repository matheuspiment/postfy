import { Response } from 'express'

function createResponseObject (): Response {
  return {
    status: function (code) {
      this.statusCode = code
      return this
    },
    json: function () {
      return {
        status: this.statusCode
      }
    }
  } as Response
}

export default createResponseObject
