import { Router, Request, Response } from 'express'
export const postsRoutes = Router()

//apagar
import { CreatePostService } from '../../../services/CreatePostService'

postsRoutes.post('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const { tittle, message } = req.body

  const createPost = new CreatePostService()

  const post = await createPost.execute({ id, tittle, message })

  return res.status(201).json(post)
})

postsRoutes.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'teste' })
})
