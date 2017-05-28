import logger from '../../../../config/infrastructure/persistence/logger/logger'

export class BaseController {
  checkForError (res, err) {
    logger.error(err.stack)
    res.send({error: 'error in your request'})
  }
}
