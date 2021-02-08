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
    let id, types, reasons

    before(async () => {
      const response = await createGiftSteps.StepOne()
      id = response.id
    })

    it('Llenar regalo con tipo, razón y presupuesto', async () => {
      types = await Mongo.read(() => GiftType.find())
      reasons = await Mongo.read(() => GiftReason.find())
      let response = await createGiftSteps.StepTwo(id, types, reasons)
      const stepTwoResponse = response
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepTwo [ERROR]').to.equal(
        true
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message', 'giftId')
      expect(response.giftId, 'Vino ID vacío [ERROR]').to.not.equal(null)
      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(response.productFilter.maxAmount).to.be.equal(95000)
      expect(
        response.reason,
        'La razón no se guardo correctamente [ERROR]'
      ).to.be.equal(stepTwoResponse.reason.name)
      expect(
        response.type,
        'El tipo de regalo no se guardo correctamente [ERROR]'
      ).to.be.equal(stepTwoResponse.type.name)
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Modificar tipo, razón y presupuesto máximo', async () => {
      let response = await createGiftSteps.StepTwo(id, types, reasons, true)
      const stepTwoResponse = response
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepTwo [ERROR]').to.equal(
        true
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message', 'giftId')
      expect(response.giftId, 'Vino ID vacío [ERROR]').to.not.equal(null)
      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(response.productFilter.maxAmount).to.be.equal(80000)
      expect(
        response.reason,
        'La razón no se guardo correctamente [ERROR]'
      ).to.be.equal(stepTwoResponse.reason.name)
      expect(
        response.type,
        'El tipo de regalo no se guardo correctamente [ERROR]'
      ).to.be.equal(stepTwoResponse.type.name)
    })
    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
