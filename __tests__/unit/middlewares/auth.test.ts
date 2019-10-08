import jwt from 'jsonwebtoken'

import { AuthRequest } from '../../../src/types'
import createResponseObject from '../../helpers/response'
import authMiddleware from '../../../src/middlewares/auth'
import authConfig from '../../../src/config/auth'

describe('authMiddleware', () => {
  it('should append the userId property in the req object when a valid header is provided', async () => {
    const token = jwt.sign({ _id: 'qwert' }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    })

    const req = {
      headers: {
        authorization: `Bearer ${token}`
      },
      userId: ''
    } as AuthRequest

    const response = createResponseObject()

    await authMiddleware(req, response, () => {})

    expect(req.userId).toBe('qwert')
  })

  it('should return an error when a token is not provided', async () => {
    const req = {
      headers: {},
      userId: ''
    } as AuthRequest

    const response = createResponseObject()

    await authMiddleware(req, response, () => {})

    expect(response.statusCode).toBe(401)
  })

  it('should return an error when the token provided is invalid', async () => {
    const req = {
      headers: {
        authorization: 'Bearer qwert'
      },
      userId: ''
    } as AuthRequest

    const response = createResponseObject()

    await authMiddleware(req, response, () => {})

    expect(response.statusCode).toBe(401)
  })
})
