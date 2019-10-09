import faker from 'faker'
import { factory } from 'factory-girl'

import User from '../src/schemas/User'
import Post from '../src/schemas/Post'

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

factory.define('Post', Post, {
  text: faker.lorem.text()
})

export default factory
