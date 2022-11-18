import { Schema, model } from 'mongoose'

const TeamSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  groupId: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  status: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  versionKey: false
})

const Team = model('Team', TeamSchema)

export default Team
