import { Schema, model } from 'mongoose'

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }]
}, {
  timestamps: true,
  versionKey: false
})

const Group = model('Group', GroupSchema)

export default Group
