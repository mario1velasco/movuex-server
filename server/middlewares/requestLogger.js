import logger from '../Infrastructure/Persistence/Logger'
export const requestLogger = () => {
  return (req, res, next) => {
    const requestData = `Request ${req.url} - method: ${req.method}`
    logger.info(requestData)
    if (req.body && Object.keys(req.body).length > 0) {
      const bodyData = `Body: ${JSON.stringify(req.body)}`
      logger.info(bodyData)
    }
    next()
  }
}
