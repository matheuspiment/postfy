/* istanbul ignore file */

import { Request } from 'express'

export interface AuthRequest extends Request {
  userId: string
}

export interface GoogleMapsPrediction {
  description: string
}
