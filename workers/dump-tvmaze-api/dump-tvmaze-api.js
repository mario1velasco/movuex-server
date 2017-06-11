import { sync } from 'tvmaze-sync'
const constants = {
  mongo: {
    dbConnection: 'mongodb://localhost:27017',
    dbName: 'tvmaze_sync',
    collectionName: 'sync'
  },
  request: {
    maxNumberOfPages: 200,
    initialPage: 0
  }
}

sync.createClient(constants).sync()
