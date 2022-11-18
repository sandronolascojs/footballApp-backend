import { Schema, model } from 'mongoose'

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  match: {
    type: Schema.Types.ObjectId,
    ref: 'Match'
  },
  vote: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('Vote', voteSchema)
