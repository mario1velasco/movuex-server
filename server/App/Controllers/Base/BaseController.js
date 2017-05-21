import logger from '../../../Infrastructure/Persistence/Logger/Logger'

export class BaseController {
  checkForError (res, err) {
    logger.error(err.stack)
    res.send({error: 'error in your request'})
  }
}
