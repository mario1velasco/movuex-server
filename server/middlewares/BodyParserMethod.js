import bodyParser from 'body-parser'

export class BodyParserMethod {
  static getMethods () {
    return [
      bodyParser.urlencoded({
        extended: true
      }),
      bodyParser.json()
    ]
  }
}