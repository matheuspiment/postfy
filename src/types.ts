/* istanbul ignore file */

import { Request } from 'express'

export interface AuthRequest extends Request {
  userId: string
}

export interface GoogleMapPrediction {
  description: string
}
