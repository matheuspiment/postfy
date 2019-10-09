import request from 'supertest'
import omit from 'lodash/omit'

import MongooseConnection from '../../helpers/MongooseConnection'
import app from '../../../src/app'
import factory from '../../factories'

describe('UserController', () => {
  beforeAll(async () => {
    await MongooseConnection.connect('UserController')
  })

  afterEach(async () => {
    await MongooseConnection.truncate()
  })

  afterAll(async () => {
    await MongooseConnection.disconnect()
  })

  describe('register', () => {
    it('should register an user with valid arguments', async () => {
      const user = await factory.attrs('User')

      const response = await request(app)
        .post('/register')
        .send(user)

      expect(response.body).toHaveProperty('user')
    })

    it('should not be able to register with duplicated email', async () => {
      const user = await factory.create('User')

      const response = await request(app)
        .post('/register')
        .send(user.toObject())

      expect(response.status).toBe(400)
    })

    it('should not be able to register with invalid args', async () => {
      const user = await factory.attrs('User')

      const responseWithoutName = await request(app)
        .post('/register')
        .send(omit(user, ['name']))

      expect(responseWithoutName.status).toBe(400)

      const responseWithoutEmail = await request(app)
        .post('/register')
        .send(omit(user, ['email']))

      expect(responseWithoutEmail.status).toBe(400)

      const responseWithoutPassword = await request(app)
        .post('/register')
        .send(omit(user, ['password']))

      expect(responseWithoutPassword.status).toBe(400)
    })
  })
})
