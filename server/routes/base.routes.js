import { ShowRoutes } from './show.routes'
import { UserRoutes } from './user.routes'

export class BaseRoutes {
  static createRoutes (app, passport) {
    const showRoutes = new ShowRoutes()
    const userRoutes = new UserRoutes(passport)
    app.use('/api', showRoutes.createRoutes())
    app.use('/api/user', userRoutes.createRoutes())
  }
}
