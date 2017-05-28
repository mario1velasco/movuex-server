import { User } from '../models/user.model'

export class UserBusiness {
  constructor (repository = User) {
    this.repository = repository
  }

  logged (user) {
    console.log(user)
    // return this.repository
    //   .find({})
    //   .limit(10)
    //   .then(ShowsBusiness.showsWithImage)
  }
}
