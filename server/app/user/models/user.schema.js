import mongoose from 'mongoose'
export const userSchema = mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
})
