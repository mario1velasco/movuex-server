import { Show } from '../models/shows.model'

export class ShowsBusiness {
  static showsWithImage (shows) {
    const hasImage = s => s.image !== null
    return shows.filter(hasImage).map(s => s)
  }

  constructor (repository = Show) {
    this.repository = repository
  }

  getShows () {
    return this.repository
      .find({})
      .limit(10)
      .then(ShowsBusiness.showsWithImage)
  }

  getShow (showId) {
    return this.repository.findOne({ showId })
  }

  search (showName) {
    return this.repository.find({ name: new RegExp('' + showName + '', 'i') })
      .then(ShowsBusiness.showsWithImage)
  }

  addVote (showId) {
    return this.repository
      .findOneAndUpdate({ showId }, { $inc: { votes: 1 } }, {new: true})
  }

  addNote (showId, note) {
    return this.repository
      .findOneAndUpdate({ showId }, { $push: { notes: note } }, {new: true})
      .then(response => response)
  }
}
