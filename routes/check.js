import express from 'express'
import { asyncRoute, error } from '../lib/utils.js'
import words from '../lib/dictionary.js'

const router = express.Router()

function checkWord(req, res, next) {
  const word = req.params.word

  if(word?.match(/^[a-zñ]{5}$/i)) {
    next()
    return
  }

  res.status(200).send(error('You must provide a five letters word in "word" field'))
}

function sendResult(req, word, res) {
  const valid = words.includes(word.toLowerCase())

  res.send({ valid })
}

router.get('/check/:word',
            checkWord,
            asyncRoute(async (req, res) => {
  const word = req.params.word
  sendResult(req, word, res)
}))

export default router
