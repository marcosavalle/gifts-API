import Mongo from '../../../../src/services/mongo-service'
import { GiftType } from '../../../../src/models/gift-type.model'
import { GiftReason } from '../../../../src/models/gift-reason.model'
import { createGiftSteps } from '../../../services/meli-regalos/createGiftSteps'
import { deleteTestData } from '../../../services/delete'
import { acceptAndSelectGift } from '../../../services/meli-regalos/acceptAndSelectGift'
import { status } from '../../../services/meli-regalos/status'
import { getMeli } from '../../../services/meli'
import { expect } from 'chai'
import { it } from 'mocha'

export const giftAcceptHappy = () => {
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
    it('Rechazar regalo y bloquear usuario', async () => {
      const response = await acceptAndSelectGift.Accept({
        input: {
          giftId: id,
          accept: false,
          blocked: true
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(response.success).to.be.equal(true)
      expect(response.message[0]).to.include(
        'El regalo fue rechazado correctamente'
      )
      expect(response.message[1]).to.include(
        'El usuario fue bloqueado correctamente'
      )
      await deleteTestData.BlockedUser()
    })
    it('Aceptar regalo', async () => {
      const response = await acceptAndSelectGift.Accept({
        input: {
          giftId: id,
          accept: true,
          blocked: false
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(response.success).to.be.equal(true)
      expect(response.message).to.include(
        'El regalo fue aceptado correctamente'
      )
      expect(await status.IsActive(id)).to.be.equal(true)
    })
    it('Rechazar regalo', async () => {
      const response = await acceptAndSelectGift.Accept({
        input: {
          giftId: id,
          accept: false,
          blocked: false
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(response.success).to.be.equal(true)
      expect(response.message).to.include(
        'El regalo fue rechazado correctamente'
      )
      expect(await status.IsCancelled(id)).to.be.equal(true)
    })

    afterEach(async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
