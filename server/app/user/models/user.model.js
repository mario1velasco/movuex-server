import mongoose from 'mongoose'
import { userSchema } from './user.schema'
export const User = mongoose.model('User', userSchema)
