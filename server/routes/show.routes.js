import express from 'express'
import { ShowsController } from '../app/shows/controllers/shows.controller'

export class ShowRoutes {
  constructor (controller = new ShowsController()) {
    this.router = express.Router()
    this.controller = controller
  }

  createRoutes () {
    this.router.get('/shows', this.controller.getShows.bind(this.controller))
    this.router.get('/show/:id', this.controller.getShow.bind(this.controller))
    this.router.get('/search', this.controller.searchShows.bind(this.controller))
    return this.router
  }
}
