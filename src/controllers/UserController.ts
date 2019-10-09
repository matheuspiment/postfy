import { Request, Response } from 'express'
import * as Yup from 'yup'
import pick from 'lodash/pick'

import User from '../schemas/User'
import CheckUserEmail from '../services/CheckUserEmail'

class UserController {
  async register (req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    try {
      const { email } = req.body

      if (await CheckUserEmail.run(email)) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const user = await User.create(req.body)
      return res.json(pick(user.toObject(), ['_id', 'name', 'email']))
    } catch (err) {
      return res.status(400).json({ error: 'Registration failed' })
    }
  }
}

export default new UserController()
