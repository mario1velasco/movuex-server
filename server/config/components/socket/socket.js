import socketio from 'socket.io'
import redis from 'socket.io-redis'

const socket = (server) => {
  const io = socketio(server)
  io.adapter(redis({host: 'localhost', port: 6379}))
  io.on('connection', (socket) => {
    console.log(`Connected ${socket.id} on instance`)

    socket.on('join', room => {
      socket.room = room
      socket.join(room, () => {
        console.log('Rooms: ', socket.rooms)
      })
    })

    socket.on('addComment', data => {
      socket.broadcast.to(socket.room).emit('comment:added', data)
    })
  })
}

export default socket
