import express from 'express'
import ApiController from '../App/Controllers/api'

export class ApiRoutes {
  constructor (controller = new ApiController()) {
    this.router = express.Router()
    this.controller = controller
  }

  createRoutes () {
    this.router.get('/show', this.constroller.getShows.bind(this.controller))
    this.router.get('/show/:id', this.constroller.getShow.bind(this.controller))
    this.router.get('/search', this.constroller.searchShows.bind(this.controller))
    this.router.get('/votes', this.constroller.getVotes.bind(this.controller))
    this.router.post('/votes', this.constroller.createVote.bind(this.controller))
    return this.router
  }
}
