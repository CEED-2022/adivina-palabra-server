import express from 'express'
import { error } from "../lib/utils.js"

function logHeaders(req, _, next) {
  console.log(JSON.stringify(req.headers))
  next()
}

const parseJSON = express.json({
    verify : (req, res, buf) => {
      try {
        req.data = JSON.parse(buf)
      } catch(e) {
        res.status(400).send(error('Invalid JSON'))
        throw "Received invalid JSON"
      }
    }
  })

function randomDelay(min, random){
  return ( req, res, next ) => {
    setTimeout(next, Math.floor( ( Math.random() * random ) + min ) )
  }
}

export {
  randomDelay,
  logHeaders,
  parseJSON,
}
