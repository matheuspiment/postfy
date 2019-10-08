import { Response, NextFunction } from 'express'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import { AuthRequest } from '../types'
import authConfig from '../config/auth'

export default async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret) as unknown as { _id: string }

    req.userId = decoded._id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
