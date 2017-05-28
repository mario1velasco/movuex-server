import http from 'http'
import express from 'express'
import { Socket } from './config/components/socket'
import { BaseMiddlewares } from './config/middlewares/base.middlewares'
import { connectWithMongoDB } from './config/infrastructure/persistence/mongo/mongoose'
import { BaseRoutes } from './routes/base.routes'

connectWithMongoDB()

const app = express()
const server = http.createServer(app)
const socket = Socket.getInstance(server)
socket.on('socket-opened', (socket) => {
  console.log(`Connected socket with id: ${socket.id}`)
})

BaseMiddlewares.config(app)
BaseRoutes.createRoutes(app)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`server listen to port ${port}`))
