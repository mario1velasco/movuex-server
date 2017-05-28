import mongoose from 'mongoose'
import Constants from './constants'
export const connectWithMongoDB = () => {
  mongoose.Promise = Promise
// TODO set configuration
  return mongoose.connect(`${Constants.DB_CONNECTION_STRING}/${Constants.DB_COLLECTION_NAME}`)
}
