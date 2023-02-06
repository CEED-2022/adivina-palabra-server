import { v4 as uuidv4 } from 'uuid';
import { randomWord } from './dictionary.js'

const PURGE_AFTER_SECONDS = 600

class Game {
  #startedAtSeconds

  constructor() {
    this.id = uuidv4()
    this.word = randomWord()
    this.#startedAtSeconds = new Date().getTime() / 1000
  }

  shouldPurge() {
    const now = new Date().getTime() / 1000
    return now - this.#startedAtSeconds > PURGE_AFTER_SECONDS
  }
}

const games = {}

function periodicPurge() {
  for (const [id, game] of Object.entries(games)) {
    if(game.shouldPurge()) {
      delete games[id]
    }
  }
}

function newGame(){
  periodicPurge()

  const game = new Game()
  games[game.id] = game
  return game
}

function getGame(id) {
  return games[id]
}

export {
  newGame,
  getGame
}
