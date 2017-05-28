import { BaseController } from './base/base.controller'
import { ShowsBusiness } from '../business/shows.business'

export class ShowsController extends BaseController {
  constructor (...args) {
    super(...args)
    this.showBusiness = new ShowsBusiness()
  }

  getShows (req, res) {
    try {
      this.showBusiness.getShows()
        .then(response => res.send(response))
        .catch(this.checkForError.bind(res))
    } catch (err) {
      this.checkForError(res, err)
    }
  }

  getShow (req, res) {
    try {
      const id = req.params.id
      this.showBusiness.getShow(id)
        .then(response => res.send(response))
        .catch(this.checkForError.bind(res))
    } catch (err) {
      this.checkForError(res, err)
    }
  }

  searchShows (req, res) {
    try {
      const showName = req.query.q
      this.showBusiness.search(showName)
        .then(response => res.send(response))
        .catch(this.checkForError.bind(res))
    } catch (err) {
      this.checkForError(res, err)
    }
  }
}
