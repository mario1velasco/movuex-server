import { BaseController } from './Base/BaseController'

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

  getVotes (req, res) {
    try {
      this.showBusiness.getVotes()
        .then(response => res.send(response))
        .catch(this.checkForError.bind(res))
    } catch (err) {
      this.checkForError(res, err)
    }
  }

  createVote (req, res) {
    try {
      const body = req.body
      this.showBusiness.createVote(body)
        .then(response => res.send(response))
        .catch(this.checkForError.bind(res))
    } catch (err) {
      this.checkForError(res, err)
    }
  }
}