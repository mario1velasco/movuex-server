import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import { realTime } from './realTime'
import { BaseMiddlewares } from './middlewares/Base'
import { configureMongo } from './Infrastructure/Persistence/Mongo/mongoose'

import ApiRoutes from './router/ShowsRoutes'

configureMongo()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const middlewares = new BaseMiddlewares(app)
middlewares.config()

app.use('/api', new ApiRoutes().createRoutes())

let port = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log(`Connected socket with id: ${socket.id}`)
  realTime(io, socket)
})
server.listen(port, () => console.log('server listen to port 3000'))
