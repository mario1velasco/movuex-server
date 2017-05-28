import { User } from '../../../app/user/models/user.model'
import { authConfig } from '../auth/auth'
import Strategy from 'passport-twitter'

export class Passport {
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
    passport.use(new Strategy(twitterConfiguration, Passport.onUseTwitterStrategy))
  }

  static deserializeUser (passport) {
    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user)
      })
    })
  }

  static serializeUser (passport) {
    passport.serializeUser(function (user, done) {
      done(null, user.id)
    })
  }

  static onUseTwitterStrategy (token, tokenSecret, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(() => {
      User.findOne({ 'twitter.id': profile.id }, function (err, user) {
        if (err) {
          return done(err)
        }

        if (user) {
          return done(null, user)
        } else {
          const newUser = new User()
          newUser.twitter.id = profile.id
          newUser.twitter.token = token
          newUser.twitter.username = profile.username
          newUser.twitter.displayName = profile.displayName
          newUser.save(function (err) {
            if (err) {
              throw err
            }
            return done(null, newUser)
          })
        }
      })
    })
  }
}
