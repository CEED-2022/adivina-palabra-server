import express from 'express'
import { parseJSON } from './middleware.js'
import { asyncRoute, error } from '../lib/utils.js'
import { getGame } from '../lib/games.js'

const router = express.Router()
router.use(parseJSON)

function checkId(req, res, next) {
  const gameId =req.params.id
  const game = getGame(gameId)

  if(game) {
    next()
    return
  }

  res.status(200).send(error(`Game ${gameId} not found`))
}

function checkPosition(req, res, next) {
  const position = Number(req.data?.position)

  if(position >= 0 && position < 5) {
    next()
    return
  }

  res.status(200).send(error('You must provide a position between 0 and 4'))
}

function checkLetter(req, res, next) {
  const letter = req.data?.letter

  if(letter?.match(/^[a-zñ]$/i)) {
    next()
    return
  }

  res.status(200).send(error('You must provide a single letter'))
}

function letterStatus(word, position, letter) {
  word = word.toLowerCase()
  letter = letter.toLowerCase()

  if(word[position] === letter) return 'in position'
  if(word.includes(letter)) return 'in word'
  return 'wrong'
}

function sendResult(req, word, res) {
  const { position, letter } = req.data
  const status = letterStatus(word, position, letter)

  res.send({ status })
}

function getWord(gameId) {
  const game = getGame(gameId)
  return game?.word
}

router.post('/guess/:id',
            checkId, checkPosition, checkLetter,
            asyncRoute(async (req, res) => {

  const word = getWord(req.params.id)
  sendResult(req, word, res)
}))

// For debugging, so you can send /guess/<a word for debugging>
router.post('/guess/:id/:word',
            checkPosition, checkLetter,
            asyncRoute(async (req, res) => {

  const word = req.params.word
  sendResult(req, word, res)
}))

export default router



