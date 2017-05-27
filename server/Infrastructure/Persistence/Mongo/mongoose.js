import mongoose from 'mongoose'
import Constants from './Constants'
export const configureMongo = () => {
  mongoose.Promise = Promise
// TODO set configuration
  mongoose.connect(`${Constants.DB_CONNECTION_STRING}/${Constants.DB_COLLECTION_NAME}`)
}
