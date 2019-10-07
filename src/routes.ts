import { Router } from 'express'

const routes = Router()

routes.post('/', (req, res) => {
  res.send('Hello"')
})

export default routes
