import { MongoClient } from './mongo-client'
import { Synchronizer } from './synchronizer'

const syncConnection = new MongoClient({
  dbConnection: 'mongodb://localhost:27017',
  dbName: 'tvmaze_sync_201759',
  collectionName: 'sync'
})
const appConnection = new MongoClient({
  dbConnection: 'mongodb://localhost:27017',
  dbName: 'movuex',
  collectionName: 'shows'
})

const client = new Synchronizer(appConnection, syncConnection)
client.sync()
