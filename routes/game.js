import express from 'express'
import { asyncRoute } from '../lib/utils.js'
import { newGame } from '../lib/games.js'

const router = express.Router()

router.post('/new',
            asyncRoute(async (req, res) => {

  const game = newGame()
  res.status(200).send({ id: game.id })
}))

export default router
