import { BodyParserMethod } from './BodyParserMethod'
import { requestLogger } from './requestLogger'
import cors from 'cors'

export class BaseMiddlewares {
  constructor (app) {
    this.app = app
  }

  config () {
    BodyParserMethod.getMethods().forEach(method => this.app.use(method))
    this.app.use(requestLogger())
    this.app.use(cors())
  }
}
