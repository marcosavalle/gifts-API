import { stepOne } from './step-one.test'
import { stepTwo } from './step-two.test'
import { stepThree } from './step-three.test'
import { stepFour } from './step-four.test'

export const giftSelectionSenderHappy = () => {
  describe('Selección regalo emisor', () => {
    before(async () => {
      process.env.TOKEN = process.env.TOKENSENDER
    })
    stepOne()
    stepTwo()
    stepThree()
    stepFour()
  })
}
