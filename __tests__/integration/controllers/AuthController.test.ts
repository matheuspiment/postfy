import request from 'supertest'

import app from '../../../src/app'
import MongooseConnection from '../../helpers/MongooseConnection'
import factory from '../../factories'

describe('AuthController', () => {
  beforeAll(async () => {
    await MongooseConnection.connect('AuthController')
  })

  afterEach(async () => {
    await MongooseConnection.truncate()
  })

  afterAll(async () => {
    await MongooseConnection.disconnect()
  })

  describe('login', () => {
    it('should authenticate with valid credentials', async () => {
      const user = await factory.attrs('User')

      await request(app)
        .post('/register')
        .send(user)

      const response = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password
        })

      expect(response.body).toHaveProperty('token')
    })

    it('should not authenticate with invalid credentials', async () => {
      const user = (await factory.create('User', { password: '123456' })).toObject()

      const response = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: '123'
        })

      expect(response.status).toBe(401)
    })

    it('should not authenticate with nonexistent user', async () => {
      const user = await factory.attrs('User', { email: 'matheus@test.com' })

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@matheus.com',
          password: user.password
        })

      expect(response.status).toBe(401)
    })

    it('should not be able to authenticate with invalid args', async () => {
      const user = await factory.attrs('User')

      const responseWithoutEmail = await request(app)
        .post('/login')
        .send({
          password: user.password
        })

      expect(responseWithoutEmail.status).toBe(400)

      const responseWithoutPassword = await request(app)
        .post('/login')
        .send({
          email: user.email
        })

      expect(responseWithoutPassword.status).toBe(400)
    })
  })
})
