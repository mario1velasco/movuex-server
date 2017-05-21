import mongoose from 'mongoose'
export const configureMongo = () => {
  mongoose.Promise = Promise
// TODO set configuration
  mongoose.connect('mongodb://localhost/movuex')
}
