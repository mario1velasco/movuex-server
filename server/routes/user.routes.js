import express from 'express'
import { UserController } from '../app/user/controllers/user.controller'

export class UserRoutes {
  constructor (passport, controller = new UserController()) {
    this.router = express.Router()
    this.controller = controller
    this.passport = passport
  }

  createRoutes () {
    this.router.get('/twitter', this.passport.authenticate('twitter', { scope: 'email' }))
    this.router.get('/twitter/callback', this.passport.authenticate('twitter', {
      successRedirect: '/api/user/logged',
      failureRedirect: '/api/user/logged'
    }))
    this.router.get('/logged', this.controller.logged.bind(this.controller))
    this.router.get('/connect/twitter', this.passport.authorize('twitter', { scope: 'email' }))
    this.router.get('/connect/twitter/callback',
      this.passport.authorize('twitter', {
        successRedirect: '/api/user/logged',
        failureRedirect: '/api/user/logged'
      }))
    this.router.get('/unlink/twitter', this.controller.isLoggedIn, this.controller.unlinkTwitter)
    return this.router
  }
}
