import { User } from '../models/user.model'

export class UserBusiness {
  constructor (repository = User) {
    this.repository = repository
  }

  logged (user) {
    const vote = Object.assign(new User(), user)
    return vote.save()
  }
}
