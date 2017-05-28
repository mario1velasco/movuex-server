import socketio from 'socket.io'
import { EventEmitter } from 'events'
const singleton = Symbol('singleton')
const securizeSingleton = Symbol('securize')

export class Socket extends EventEmitter {
  static getInstance (server) {
    if (!this[singleton]) {
      this[singleton] = new Socket(securizeSingleton, server)
    }
    return this[singleton]
  }

  constructor (securize, server) {
    super()
    if (securize !== securizeSingleton) {
      throw new Error('Cannot construct a singleton')
    }
    this.io = socketio(server)
    this.io.on('connection', (socket) => {
      this.emit('socket-opened', socket)
      this.socket = socket
      this.initListeners(securizeSingleton)
    })
  }

  initListeners (securize) {
    if (securize === securizeSingleton) {
      this.socket.on('ping', () => this.socket.emit('pong'))
      this.socket.on('addVote', (showId) => {
        this.io.sockets.emit('vote:added', 'successful ' + showId)
      })
    } else {
      throw new Error('You can not access this method')
    }
  }
}
