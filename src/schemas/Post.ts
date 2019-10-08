import { Schema, model, Document } from 'mongoose'

export interface ProjectInterface extends Document {
  text: string,
  user: string
}

const ProjectSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

export default model<ProjectInterface>('Project', ProjectSchema)
