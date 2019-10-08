import { Schema, model, Document, HookNextFunction } from 'mongoose'
import * as bcrypt from 'bcryptjs'

export interface UserInterface extends Document {
  email: string,
  name: string,
  password: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  versionKey: false,
  timestamps: true
})

UserSchema.pre('save', async function (next: HookNextFunction) {
  const hash = await bcrypt.hash(this.password, 8)
  this.password = hash

  next()
})

export default model<UserInterface>('User', UserSchema)
