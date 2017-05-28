import { sync } from 'tvmaze-sync'
import Constants from '../../server/config/infrastructure/persistence/mongo/constants'
const constants = {
  mongo: {
    dbConnection: Constants.DB_CONNECTION_STRING,
    dbName: Constants.DB_COLLECTION_NAME,
    collectionName: 'shows'
  },
  request: {
    maxNumberOfPages: 200,
    initialPage: 0
  }
}

sync.createClient(constants).sync()
