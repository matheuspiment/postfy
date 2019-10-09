import { Request, Response } from 'express'
import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../schemas/User'
import authConfig from '../config/auth'

class AuthController {
  async login (req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).send({ error: 'User not found' })
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ error: 'Password does not match' })
      }

      const { _id, name } = user

      return res.json({
        user: {
          _id,
          name,
          email
        },
        token: jwt.sign({ _id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      })
    } catch (err) {
      return res.status(400).send({ error: 'Login failed' })
    }
  }
}

export default new AuthController()
