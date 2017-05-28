import { ShowRoutes } from './show.routes'

export class BaseRoutes {
  static createRoutes (app) {
    const showRoutes = new ShowRoutes()
    app.use('/api', showRoutes.createRoutes())
  }
}
