import { tvmaze } from 'tvmaze-zucchinidev'
import Votes from '../../models/votes'

export class ShowsBusiness {
  static showsWithImage (shows) {
    const hasImage = s => s.show.image !== null
    shows = shows.filter(hasImage).map(s => s.show)
    return shows
  }

  constructor (externalRepository = tvmaze.createClient(), repository = Votes) {
    this.externalRepository = externalRepository
    this.repository = repository
  }

  getShows () {
    return this.externalRepository.shows()
      .then(({body}) => body)
      .then(ShowsBusiness.showsWithImage)
  }

  getShow (id) {
    return this.externalRepository.show(id).then(({body}) => body)
  }

  search (showName) {
    return this.externalRepository.search(showName)
      .then(({body}) => body)
      .then(ShowsBusiness.showsWithImage)
  }

  getVotes () {
    return this.repository.find({})
  }

  createVote (body) {
    const vote = Object.assign(new Votes(), body)
    return vote.save()
  }

}
