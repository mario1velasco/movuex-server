import winston from 'winston'
import EventEmitter from 'events'

class Logger extends EventEmitter {
  static getErrorLoggerConfiguration () {
    return {
      name: 'error-file',
      filename: 'logs/filelog-error.log',
      level: 'error'
    }
  }

  static getInfoLoggerConfiguration () {
    return {
      name: 'info-file',
      filename: 'logs/filelog-info.log',
      level: 'info'
    }
  }

  constructor () {
    super()
    this.executor = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)(Logger.getInfoLoggerConfiguration()),
        new (winston.transports.File)(Logger.getErrorLoggerConfiguration())
      ]
    })
  }

  info (message) {
    this.executor.info(message)
  }
}

export default new Logger()
