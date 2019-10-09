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

  it('should return false if the email does not exist', async () => {
    const user = await factory.attrs('User')

    const userExists = await CheckUserEmail.run(user.email)

    expect(userExists).toBe(false)
  })

  it('should return true if the email already exists', async () => {
    const user = await factory.create(
      'User', { email: 'duplicated@email.com' }
    )

    const userExists = await CheckUserEmail.run(user.email)

    expect(userExists).toBe(true)
  })

  it('should throw an error if the email argument is invalid', async () => {
    await expect(CheckUserEmail.run('matheus.com')).rejects.toThrow()
  })
})
