import MongooseConnection from '../../helpers/MongooseConnection'
import CheckUserEmail from '../../../src/services/CheckUserEmail'
import factory from '../../factories'

describe('CheckUserEmail', () => {
  beforeAll(async () => {
    await MongooseConnection.connect('CheckUserEmail')
  })

  afterEach(async () => {
    await MongooseConnection.truncate()
  })

  afterAll(async () => {
    await MongooseConnection.disconnect()
  })

  it('should return true if user already exists', async () => {
    const user = await factory.create(
      'User', { email: 'duplicated@email.com' }
    )

    const userExists = await CheckUserEmail.run(user.email)

    expect(userExists).toBe(true)
  })
})
