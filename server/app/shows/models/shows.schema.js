import mongoose from 'mongoose'
const showId = {
  type: Number,
  required: true,
  unique: true
}
const name = {
  type: String,
  required: true
}
const externalUrl = {
  type: String,
  required: true
}
const language = {
  type: String,
  default: 'EN'
}
const genres = Array
const status = String
const premiered = Date
const schedule = {
  time: {
    type: String
  },
  days: {
    type: Array
  }
}
const externalRating = Number
const network = {
  name: {
    type: String
  },
  countryCode: {
    type: String,
    uppercase: true
  }
}
const image = {
  medium: {
    type: String,
    required: true
  },
  original: {
    type: String
  }
}
const updated = {
  type: Date,
  default: Date.now
}
const synchronized = Date
const votes = Number
const notes = Array

export const ShowSchema = new mongoose.Schema({
  showId,
  name,
  externalUrl,
  language,
  genres,
  status,
  premiered,
  schedule,
  externalRating,
  network,
  image,
  updated,
  synchronized,
  votes,
  notes
})
