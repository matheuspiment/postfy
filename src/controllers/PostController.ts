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
      return res.status(400).json({ error: 'Invalid argument(s)' })
    }

    try {
      const post = await Post.create({ ...req.body, user: req.userId })

      return res.status(201).json({ post })
    } catch (error) {
      return res.status(400).json({ error: 'Failed to create post' })
    }
  }

  async list (req: AuthRequest, res: Response): Promise<Response> {
    try {
      const posts = await Post.find({ user: req.userId })

      return res.json({ posts })
    } catch (error) {
      return res.status(400).json({ error: 'Failed to list posts' })
    }
  }

  async delete (req: AuthRequest, res: Response): Promise<Response> {
    try {
      const result = await Post.findByIdAndRemove(req.params.postId)

      if (!result) {
        return res.status(400).json({ error: 'Post not existent' })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: 'Failed to delete post' })
    }
  }
}

export default new PostController()
