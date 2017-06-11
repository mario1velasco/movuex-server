import { BaseController } from './base/base.controller'
import { UserBusiness } from '../business/user.business'

export class UserController extends BaseController {
  constructor (...args) {
    super(...args)
    this.userBusiness = new UserBusiness()
  }

  profile (req, res) {
    try {
      const user = req.user.toJSON()
      this.userBusiness.logged(user)
        .then(response => {
          res.send({
            msg: 'Logged',
            user: user
          })
        })
        .catch(this.checkForError.bind(res))
    } catch (err) {
      this.checkForError(res, err)
    }
  }

  isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.statusCode(401).json({
      msg: 'Unauthorized'
    })
  }

  unlinkTwitter (req, res) {
    const user = req.user
    user.twitter.token = undefined
    user.save(() => {
      res.redirect('/')
    })
  }
}
