import http from 'http'
import path from 'path'
import express from 'express'
import { default as socket } from './config/components/socket/socket'
import { BaseMiddlewares } from './config/middlewares/base.middlewares'
import { connectWithMongoDB } from './config/infrastructure/persistence/mongo/mongoose'
import { BaseRoutes } from './routes/base.routes'
import passport from 'passport'
import { Passport } from './config/components/passport/passport'
import session from 'express-session'
const port = process.env.PORT || 3000

Passport.configure(passport)
connectWithMongoDB()

const app = express()
const distDir = path.resolve(__dirname, '../public')
app.use(express.static(distDir))
app.set('port', port)

const server = http.createServer(app)
socket(server)

app.use(session({
  secret: 'ilovenodejs',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

BaseMiddlewares.config(app)
BaseRoutes.createRoutes(app, passport)

server.listen(port, () => console.log(`server listen to port ${port}`))
