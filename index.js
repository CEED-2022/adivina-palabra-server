import express from 'express'
import http from 'http'
import cors from 'cors'

import * as routes from './routes/index.js'
// import { logHeaders, randomDelay } from './routes/middleware.js'
import { randomDelay } from './routes/middleware.js'


const DEFAULT_PORT = 8888
const PORT = process.env.PORT || DEFAULT_PORT // Heroku assigns you a port

const app = express()
const server = http.createServer(app)

const dynamicCORS =  function (origin, callback) {
  return callback(null, origin)
}
const corsOptions = {
  origin: dynamicCORS,
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // include before other routes

const RANDOM_DELAY = 2000
const MIN_DELAY = 100
app.use(randomDelay(MIN_DELAY, RANDOM_DELAY))

// app.use(logHeaders)
for(const route of Object.values(routes)) app.use('/', route)

server.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}!`)
})
