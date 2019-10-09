import User, { UserInterface } from '../schemas/User'
import * as Yup from 'yup'

class CheckUserEmail {
  async run (email: UserInterface['email']): Promise<boolean> {
    const schema = Yup.string().email().required()

    if (!(await schema.isValid(email))) {
      throw new Error('Invalid email')
    }

    if (await User.findOne({ email })) {
      return true
    }

    return false
  }
}

export default new CheckUserEmail()
