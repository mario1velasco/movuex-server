import mongoose from 'mongoose'
import { ShowSchema } from './shows.schema'
export const Show = mongoose.model('Show', ShowSchema)
