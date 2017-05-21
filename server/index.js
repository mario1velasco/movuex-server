import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import socketio from 'socket.io'
import cors from 'cors'
import { realTime } from './realTime'
import { requestLogger } from './middlewares/requestLogger'
import { configureMongo } from './Infrastructure/Persistence/mongoose'

import api from './api/api'

configureMongo()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(requestLogger())
app.use('/api', api)

let port = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log(`Connected socket with id: ${socket.id}`)
  realTime(io, socket)
})
server.listen(port, () => console.log('server listen to port 3000'))
