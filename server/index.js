import http from 'http'
import express from 'express'
import { Socket } from './config/components/socket/socket'
import { BaseMiddlewares } from './config/middlewares/base.middlewares'
import { connectWithMongoDB } from './config/infrastructure/persistence/mongo/mongoose'
import { BaseRoutes } from './routes/base.routes'
import passport from 'passport'
import { Passport } from './config/components/passport/passport'
import session from 'express-session'
Passport.configure(passport)
connectWithMongoDB()

const app = express()
const server = http.createServer(app)
const socket = Socket.getInstance(server)
socket.on('socket-opened', (socket) => {
  console.log(`Connected socket with id: ${socket.id}`)
})

app.use(session({
  secret: 'ilovenodejs',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

BaseMiddlewares.config(app)
BaseRoutes.createRoutes(app, passport)

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`server listen to port ${port}`))
