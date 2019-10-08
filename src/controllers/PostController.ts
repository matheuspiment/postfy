import { Response } from 'express'
import { AuthRequest } from '../types'
import * as Yup from 'yup'

import Post from '../schemas/Post'

class PostController {
  async create (req: AuthRequest, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      text: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    try {
      const post = await Post.create({ ...req.body, user: req.userId })

      return res.json({ post })
    } catch (error) {
      return res.status(400).json({ error: 'Creation failed' })
    }
  }

  async list (req: AuthRequest, res: Response): Promise<Response> {
    try {
      const posts = await Post.find({ user: req.userId })

      return res.json({ posts })
    } catch (error) {
      return res.status(400).json({ error: 'Listation failed' })
    }
  }

  async delete (req: AuthRequest, res: Response): Promise<Response> {
    try {
      await Post.findByIdAndRemove(req.params.postId)

      return res.status(200).send()
    } catch (error) {
      return res.status(400).json({ error: 'Deletation failed' })
    }
  }
}

export default new PostController()
