import { BodyParser } from './bodyParser.middlewares'
import { requestLogger } from './requestLogger.middlewares'
import cors from 'cors'

export class BaseMiddlewares {

  static config (app) {
    BodyParser.getMethods().forEach(method => app.use(method))
    app.use(requestLogger())
    app.use(cors())
  }
}
