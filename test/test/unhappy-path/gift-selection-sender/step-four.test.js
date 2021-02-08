import Mongo from '../../../../src/services/mongo-service'
import { GiftType } from '../../../../src/models/gift-type.model'
import { GiftReason } from '../../../../src/models/gift-reason.model'
import { createGiftSteps } from '../../../services/meli-regalos/createGiftSteps'
import { status } from '../../../services/meli-regalos/status'
import { getMeli } from '../../../services/meli'
import { deleteTestData } from '../../../services/delete'

export const stepFour = () => {
  describe('Paso 4 [Creación de regalo]', () => {
    let id, categoryArray, productArray, types, reasons
    before(async () => {
      const response = await createGiftSteps.StepOne()
      id = response.id

      types = await Mongo.read(() => GiftType.find())
      reasons = await Mongo.read(() => GiftReason.find())
      categoryArray = await getMeli.RandomCategories(3)
      productArray = await getMeli.RandomProducts(80000)
    })
    beforeEach(async () => {
      await status.ToInProgress(id)
    })
    it('Confirmar regalo con presupuesto menor a productos seleccionados', async () => {
      const type = await types[Math.floor(Math.random() * types.length)]
      const reason = await reasons[Math.floor(Math.random() * reasons.length)]
      await createGiftSteps.StepTwoCustom({
        input: {
          giftId: id,
          typeId: type._id,
          reasonId: reason._id,
          maxAmount: 500
        }
      })
      await createGiftSteps.StepThree(id, categoryArray, productArray, 'all')
      const response = await createGiftSteps.StepFour(id)
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepFour [ERROR]').to.be.equal(
        false
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.all.keys('success', 'message')
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Confirmar regalo sin productos ni categorias', async () => {
      await createGiftSteps.StepTwo(id, types, reasons)
      await deleteTestData.ProductsCategories(id)
      const response = await createGiftSteps.StepFour(id)
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepFour [ERROR]').to.be.equal(
        false
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.all.keys('success', 'message')
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Confirmar regalo que no este en estado Pendiente', async () => {
      await createGiftSteps.StepTwo(id, types, reasons)
      await createGiftSteps.StepThree(id, categoryArray, productArray, 'all')
      await status.ToActive(id)
      const response = await createGiftSteps.StepFour(id)
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepFour [ERROR]').to.be.equal(
        false
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.all.keys('success', 'message')
      expect(await status.IsPending(id), 'El estado no esta inPending').to.be
        .false
    })
    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
