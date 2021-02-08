import Mongo from '../../src/services/mongo-service'
import dotenv from 'dotenv'
import { giftSelectionSenderHappy } from './happy-path/gift-selection-sender/index.test'
import { giftSelectionSenderUnhappy } from './unhappy-path/gift-selection-sender/index.test'
import { giftAcceptHappy } from './happy-path/gift-accept/index.test'
import { giftAcceptUnhappy } from './unhappy-path/gift-accept/index.test'

dotenv.config()

before('Conexión a Mongo', async () => {
  await Mongo.connect()
})

describe('MainProcess', () => {
  describe('Happy Path Test Suite', () => {
    giftSelectionSenderHappy()
    giftAcceptHappy()
  })
  describe('Unhappy Path Test Suite', () => {
    giftSelectionSenderUnhappy()
    giftAcceptUnhappy()
  })
})

after('Cortar conexión de Mongo', async () => {
  await Mongo.disconnect()
})
