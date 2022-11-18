import { Schema, model } from 'mongoose'

const MatchSchema = new Schema({
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  date: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  rawDate: {
    type: Date
  },
  stadium: {
    type: String,
    required: true
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
})

const Match = model('Match', MatchSchema)

export default Match
