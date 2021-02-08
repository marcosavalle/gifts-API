import Mongo from '../../../../src/services/mongo-service'
import { GiftType } from '../../../../src/models/gift-type.model'
import { GiftReason } from '../../../../src/models/gift-reason.model'
import { createGiftSteps } from '../../../services/meli-regalos/createGiftSteps'
import { deleteTestData } from '../../../services/delete'
import { acceptAndSelectGift } from '../../../services/meli-regalos/acceptAndSelectGift'
import { status } from '../../../services/meli-regalos/status'
import { getMeli } from '../../../services/meli'

export const giftAcceptUnhappy = () => {
  describe('Aceptación del regalo', () => {
    let id
    beforeEach(async () => {
      process.env.TOKEN = process.env.TOKENSENDER
      const [
        response,
        types,
        reasons,
        categoryArray,
        productArray
      ] = await Promise.all([
        createGiftSteps.StepOne(),
        Mongo.read(() => GiftType.find()),
        Mongo.read(() => GiftReason.find()),
        getMeli.RandomCategories(3),
        getMeli.RandomProducts(80000)
      ])
      id = response.id
      await createGiftSteps.StepTwo(id, types, reasons)
      await createGiftSteps.StepThree(id, categoryArray, productArray, 'all')
      await createGiftSteps.StepFour(id)
      process.env.TOKEN = process.env.TOKENRECEIVER
    })

    it('Aceptar regalo y bloquear al usuario simultáneamente', async () => {
      const response = await acceptAndSelectGift.Accept({
        input: {
          giftId: id,
          accept: true,
          blocked: true
        }
      })
      expect(response, 'No hubo response').to.exist

      expect(response.success).to.be.equal(false)
      expect(response.message).to.include(
        'No se puede aceptar regalo y bloquear usuario simultáneamente.'
      )
      expect(await status.IsPending(id)).to.be.equal(true)
    })

    afterEach(async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
