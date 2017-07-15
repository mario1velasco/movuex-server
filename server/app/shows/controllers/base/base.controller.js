import logger from '../../../../config/infrastructure/persistence/logger/logger'

export class BaseController {
  checkForError (res, err) {
    let msg = ''
    try {
      if (typeof err.stack !== 'undefined') {
        msg = err.stack
      } else {
        msg = JSON.stringify(err)
      }
      logger.error(msg)
    } catch (e) {
      logger.error('Base controller error')
    }
    res.send({error: 'error in your request'})
  }
}
