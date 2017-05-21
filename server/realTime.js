export const realTime = (io, socket) => {
  socket.on('ping', () => socket.emit('pong'))
  socket.on('addVote', (showId) => {
    console.log(showId, ' se ha votado')
    io.sockets.emit('vote:added', 'successful ' + showId)
  })
}