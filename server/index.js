import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import socketio from 'socket.io'

import api from './api'

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/movuex')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', api)

let port = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log(`Connected socket with id: ${socket.id}`)
  socket.on('ping', () => socket.emit('pong'))
})
server.listen(port, () => console.log('server listen to port 3000'))
