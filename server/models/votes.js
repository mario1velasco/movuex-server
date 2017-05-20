import mongoose from 'mongoose'

const VoteSchema = new mongoose.Schema({
  showId: {
    type: Number,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  }
})

export default mongoose.model('Vote', VoteSchema)

