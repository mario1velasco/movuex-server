import { User } from '../models/user.model'

export class UserBusiness {
  constructor (repository = User) {
    this.repository = repository
  }

  logged (user) {
    return this.repository.findOne({ 'twitter.id': user.twitter.id })
      .then(response => {
        if (!response) {
          return this.save(user)
        }
        return response
      })
  }

  save (user) {
    return new Promise((resolve, reject) => {
      const newUser = Object.assign(new User(), user)
      newUser.save((err) => {
        if (err) {
          return reject(err)
        }
        resolve(newUser)
      })
    })
  }

  findUser (query) {
    return this.repository.findOne(query)
  }

  createUserFromTwitterProfile (profile, token) {
    return this.save({
      twitter: {
        id: profile.id,
        token: token,
        username: profile.username,
        displayName: profile.displayName
      }
    })
  }
}
