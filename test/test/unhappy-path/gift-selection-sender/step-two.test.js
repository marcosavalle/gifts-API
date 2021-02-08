import Mongo from '../../../../src/services/mongo-service'
import { GiftType } from '../../../../src/models/gift-type.model'
import { GiftReason } from '../../../../src/models/gift-reason.model'
import { createGiftSteps } from '../../../services/meli-regalos/createGiftSteps'
import { getGiftById } from '../../../constants/queries/getGiftById'
import { service } from '../../../services/service'
import { status } from '../../../services/meli-regalos/status'
import { deleteTestData } from '../../../services/delete'

export const stepTwo = () => {
  describe('Paso 2 [Creación de regalo]', () => {
    let id, types, reasons, type, reason

    before(async () => {
      const response = await createGiftSteps.StepOne()
      id = response.id
      types = await Mongo.read(() => GiftType.find())
      reasons = await Mongo.read(() => GiftReason.find())
    })

    it('Modificar sin ID', async () => {
      type = await types[Math.floor(Math.random() * types.length)]
      reason = await reasons[Math.floor(Math.random() * reasons.length)]

      const response = await createGiftSteps.StepTwoCustom({
        input: {
          giftId: '',
          typeId: type._id,
          reasonId: reason._id,
          maxAmount: 95000
        }
      })
      expect(response, 'No hubo response').to.be.equal(null)
    })
    it('Modificar sin tipo de regalo', async () => {
      type = await types[Math.floor(Math.random() * types.length)]
      reason = await reasons[Math.floor(Math.random() * reasons.length)]

      let response = await createGiftSteps.StepTwoCustom({
        input: {
          giftId: id,
          typeId: '',
          reasonId: reason._id,
          maxAmount: 95000
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepTwo [ERROR]').to.equal(
        false
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(response.productFilter).to.be.equal(null)
      expect(
        response.reason,
        'La razón no se guardo correctamente [ERROR]'
      ).to.be.equal(null)
      expect(
        response.type,
        'El tipo de regalo no se guardo correctamente [ERROR]'
      ).to.be.equal(null)
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Modificar sin razón de regalo', async () => {
      type = await types[Math.floor(Math.random() * types.length)]
      reason = await reasons[Math.floor(Math.random() * reasons.length)]

      let response = await createGiftSteps.StepTwoCustom({
        input: {
          giftId: id,
          typeId: type._id,
          reasonId: '',
          maxAmount: 95000
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepTwo [ERROR]').to.equal(
        false
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(response.productFilter).to.be.equal(null)
      expect(
        response.reason,
        'La razón no se guardo correctamente [ERROR]'
      ).to.be.equal(null)
      expect(
        response.type,
        'El tipo de regalo no se guardo correctamente [ERROR]'
      ).to.be.equal(null)
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
