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
      types = await Mongo.read(() => GiftType.find())
      reasons = await Mongo.read(() => GiftReason.find())
      id = response.id
      categoryArray = await getMeli.RandomCategories(3)
      productArray = await getMeli.RandomProducts(80000)
      await createGiftSteps.StepTwo(id, types, reasons)
    })
    beforeEach(async () => {
      await status.ToInProgress(id)
    })
    it('Confirmar regalo completo', async () => {
      await createGiftSteps.StepThree(id, categoryArray, productArray, 'all')
      const response = await createGiftSteps.StepFour(id)
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepFour [ERROR]').to.be.equal(
        true
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      expect(await status.IsPending(id), 'El estado no esta inPending').to.be
        .true
    })
    it('Confirmar regalo sin productos', async () => {
      await createGiftSteps.StepThree(
        id,
        categoryArray,
        productArray,
        'onlyCategories'
      )
      const response = await createGiftSteps.StepFour(id)
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepFour [ERROR]').to.be.equal(
        true
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      expect(await status.IsPending(id), 'El estado no esta inPending').to.be
        .true
    })
    it('Confirmar regalo sin categorias', async () => {
      await createGiftSteps.StepThree(
        id,
        categoryArray,
        productArray,
        'onlyProducts'
      )
      const response = await createGiftSteps.StepFour(id)
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepFour [ERROR]').to.be.equal(
        true
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      expect(await status.IsPending(id), 'El estado no esta inPending').to.be
        .true
    })
    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
