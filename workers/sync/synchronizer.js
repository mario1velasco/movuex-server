import EventEmitter from 'events'

export class Synchronizer extends EventEmitter {
  constructor (appConnection, syncConnection) {
    super()
    this.appConnection = appConnection
    this.syncConnection = syncConnection
  }

  sync () {
    this.syncConnection.find({})
      .then(Synchronizer.onRetrieveDocuments)
      .then(this.insertBatches.bind(this))
  }

  static onRetrieveDocuments (response) {
    const docs = response
      .filter(Synchronizer.hasImage)
      .map(Synchronizer.transformDataToDomain)
    return Promise.resolve(docs)
  }

  insertBatches (docs) {
    const getSlice = Synchronizer.getSlice(docs)
    this.insertBatch(docs.length, getSlice, 0)
  }

  insertBatch (max, getSlice, accumulator) {
    const slice = getSlice()
    accumulator += slice.length
    Promise.all(slice.map(this.upsertDocument.bind(this)))
      .then(() => {
        if (accumulator < max) {
          this.insertBatch(max, getSlice, accumulator)
        } else {
          this.emit('sync-completed')
          process.exit(0)
        }
      })
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  }

  static getSlice (docs) {
    let init = 0
    return () => {
      const min = init + 10
      const fin = Math.min(min, docs.length)
      const result = docs.slice(init, fin)
      init += 10
      return result
    }
  }

  static hasImage (document) {
    return typeof document.image !== 'undefined'
  }

  upsertDocument (document) {
    const query = { showId: document.showId }
    return this.appConnection.upsert(query, document)
      .then((response) => {
        let msg
        if (typeof response.matchedCount !== 'undefined' && response.matchedCount === 0) {
          msg = `Inserted document with showId: ${document.showId}`
        } else {
          msg = `Updated docuement with showId: ${document.showId}`
        }
        console.log(msg)
        return response
      }).catch(err => {
        console.log(err)
        console.log('Error ocurrido')
      })
  }

  static transformDataToDomain (document) {
    const {
      id: showId,
      name,
      url: externalUrl,
      genres,
      status,
      schedule,
      image
    } = document
    const language = Synchronizer.getLanguage(document)
    const premiered = Synchronizer.getPremiered(document)
    const externalRating = Synchronizer.getRating(document)
    const network = Synchronizer.getNetwork(document)
    return {
      showId,
      name,
      externalUrl,
      genres,
      status,
      image,
      language,
      premiered,
      schedule,
      externalRating,
      network
    }
  }

  static getLanguage ({ language }) {
    // TODO extract, Need to have the country codes
    const defaultValue = 'EN'
    const countryCodes = {
      'English': 'EN'
      // ....
    }
    return countryCodes[language] || defaultValue
  }

  static getPremiered ({ premiered }) {
    return new Date(premiered)
  }

  static getRating ({ rating = {} }) {
    return rating.average || 0
  }

  static getNetwork ({ network }) {
    let result = {}
    if (typeof network === 'undefined' || network === null) {
      result.name = 'empty'
      result.countryCode = ''
    } else {
      let { name, country: { code: countryCode } } = network
      result = {
        name,
        countryCode
      }
    }
    return result
  }
}
