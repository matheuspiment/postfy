import faker from 'faker'
import { factory } from 'factory-girl'

import User from '../src/schemas/User'

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export default factory
