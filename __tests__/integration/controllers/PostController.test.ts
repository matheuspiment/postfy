import request from 'supertest'

import MongooseConnection from '../../helpers/MongooseConnection'
import app from '../../../src/app'
import factory from '../../factories'

describe('PostController', () => {
  beforeAll(async () => {
    await MongooseConnection.connect('PostController')
  })

  afterEach(async () => {
    await MongooseConnection.truncate()
  })

  afterAll(async () => {
    await MongooseConnection.disconnect()
  })

  describe('create', () => {
    it('should create a post with valid arguments', async () => {
      const user = await factory.attrs('User')

      await request(app)
        .post('/register')
        .send(await factory.attrs('User'))

      const { body: loginBody } = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password
        })

      const post = await factory.attrs('Post')

      const response = await request(app)
        .post('/create/post')
        .set('Authorization', `Bearer ${loginBody.token}`)
        .send(post)

      expect(response.body).toHaveProperty('post')
    })

    it('should not create a post without a logged in user', async () => {
      const post = await factory.attrs('Post')

      const response = await request(app)
        .post('/create/post')
        .send(post)

      expect(response.status).toBe(401)
    })

    it('should not create a post with invalid args', async () => {
      const user = await factory.attrs('User')

      await request(app)
        .post('/register')
        .send(await factory.attrs('User'))

      const { body: loginBody } = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password
        })

      const response = await request(app)
        .post('/create/post')
        .set('Authorization', `Bearer ${loginBody.token}`)
        .send({})

      expect(response.status).toBe(400)
    })
  })

  describe('list', () => {
    it('should list logged in user posts', async () => {
      const user = await factory.attrs('User')

      await request(app)
        .post('/register')
        .send(await factory.attrs('User'))

      const { body: loginBody } = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password
        })

      const { body: emptyPostsBody } = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${loginBody.token}`)

      expect(emptyPostsBody.posts).toHaveLength(0)

      const post = await factory.attrs('Post')

      await request(app)
        .post('/create/post')
        .set('Authorization', `Bearer ${loginBody.token}`)
        .send(post)

      const response = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${loginBody.token}`)

      expect(response.body.posts).toHaveLength(1)
    })

    it('should not list the posts without a logged in user', async () => {
      const response = await request(app)
        .get('/posts')

      expect(response.status).toBe(401)
    })
  })

  describe('delete', () => {
    it('should delete a post with a valid postId', async () => {
      const user = await factory.attrs('User')

      await request(app)
        .post('/register')
        .send(await factory.attrs('User'))

      const { body: loginBody } = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password
        })

      const post = await factory.attrs('Post')

      const { body: createPostBody } = await request(app)
        .post('/create/post')
        .set('Authorization', `Bearer ${loginBody.token}`)
        .send(post)

      const response = await request(app)
        .delete(`/post/${createPostBody.post._id}`)
        .set('Authorization', `Bearer ${loginBody.token}`)

      expect(response.status).toBe(200)
    })

    it('should not delete a post with a non-existent postId', async () => {
      const user = await factory.attrs('User')

      await request(app)
        .post('/register')
        .send(await factory.attrs('User'))

      const { body: loginBody } = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password
        })

      const response = await request(app)
        .delete(`/post/a${5}`)
        .set('Authorization', `Bearer ${loginBody.token}`)

      expect(response.status).toBe(400)
    })

    it('should not delete a post without a logged in user', async () => {
      const response = await request(app)
        .delete('/post/a5')

      expect(response.status).toBe(401)
    })
  })
})
