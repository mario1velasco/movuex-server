import logger from '../infrastructure/persistence/logger/logger'
export const requestLogger = () => {
  return (req, res, next) => {
    const requestData = `Request ${req.url} - method: ${req.method}`
    logger.info(requestData)
    const hasBody = req.body && Object.keys(req.body).length > 0
    if (hasBody) {
      const bodyData = `Body: ${JSON.stringify(req.body)}`
      logger.info(bodyData)
    }
    next()
  }
}
