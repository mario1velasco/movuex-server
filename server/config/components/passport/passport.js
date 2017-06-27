import { authConfig } from '../auth/auth'
import Strategy from 'passport-twitter'
import { UserBusiness } from '../../../app/user/business/user.business'

export class Passport {
  static get userBusiness () {
    return new UserBusiness()
  }

  static configure (passport) {
    Passport.serializeUser(passport)
    Passport.deserializeUser(passport)
    Passport.useTwitterStrategy(passport)
  }

  static useTwitterStrategy (passport) {
    const twitterConfiguration = {
      consumerKey: authConfig.twitterAuth.consumerKey,
      consumerSecret: authConfig.twitterAuth.consumerSecret,
      callbackURL: authConfig.twitterAuth.callbackURL
    }
    // flow:
    // estratégia -> callback de la estratégia con los parámetros que le lleguen
    // dependiendo de la estratégia seleccionada.
    // con el done() de la estratégia->
    // se ejecuta serializeUser, esto guarda en sesión los datos que nosotros
    // necesitemos para la siguiente función que será la de deserializeUser, por
    // ejemplo lo que necesitemos para buscar el usuario en la base de datos
    passport.use(new Strategy(twitterConfiguration, Passport.onUseTwitterStrategy))
  }

  static deserializeUser (passport) {
    passport.deserializeUser((id, done) => {
      Passport.userBusiness.findUser({ 'twitter.id': id })
        .then(user => {
          done(null, user)
        })
        .catch(err => {
          done(err)
        })
    })
  }

  static serializeUser (passport) {
    passport.serializeUser((id, done) => {
      done(null, id)
    })
  }

  static onUseTwitterStrategy (token, _, profile, done) {
    process.nextTick(() => {
      const { id } = profile
      Passport.userBusiness
        .findUser({ 'twitter.id': id })
        .then(Passport.onCompletedSearchUser(done, { profile, token }))
        .catch(err => {
          throw err
        })
    })
  }

  static onCompletedSearchUser (done, { profile, token }) {
    return (user) => {
      if (user) {
        const { id } = user.twitter
        done(null, id)
      } else {
        Passport.userBusiness
          .createUserFromTwitterProfile(profile, token)
          .then(() => {
            return done(null, profile.id)
          })
          .catch(err => {
            throw err
          })
      }
    }
  }
}
