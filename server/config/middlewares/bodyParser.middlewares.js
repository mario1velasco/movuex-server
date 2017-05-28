import bodyParser from 'body-parser'

export class BodyParser {
  static getMethods () {
    return [
      bodyParser.urlencoded({
        extended: true
      }),
      bodyParser.json()
    ]
  }
}
