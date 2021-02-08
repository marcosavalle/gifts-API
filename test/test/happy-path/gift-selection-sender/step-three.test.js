import Mongo from '../../../../src/services/mongo-service'
import { GiftType } from '../../../../src/models/gift-type.model'
import { GiftReason } from '../../../../src/models/gift-reason.model'
import { createGiftSteps } from '../../../services/meli-regalos/createGiftSteps'
import { getGiftById } from '../../../constants/queries/getGiftById'
import { service } from '../../../services/service'
import { status } from '../../../services/meli-regalos/status'
import { getMeli } from '../../../services/meli'
import { deleteTestData } from '../../../services/delete'

export const stepThree = () => {
  describe('Paso 3 [Creación de regalo]', () => {
    let id, categoryArray, productArray
    before(async () => {
      const [response, types, reasons] = await Promise.all([
        createGiftSteps.StepOne(),
        Mongo.read(() => GiftType.find()),
        Mongo.read(() => GiftReason.find())
      ])

      id = response.id
      await createGiftSteps.StepTwo(id, types, reasons)
    })
    it('Carga de caja de regalos', async () => {
      ;[categoryArray, productArray] = await Promise.all([
        getMeli.RandomCategories(3),
        getMeli.RandomProducts(80000)
      ])

      let response = await createGiftSteps.StepThree(
        id,
        categoryArray,
        productArray,
        'all'
      )
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'No hubo éxito en StepThree [ERROR]'
      ).to.be.equal(true)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      const data = await service.POST(getGiftById, {
        id: id
      })

      response = data.data.data.getGiftById

      expect(categoryArray, 'El array de categorias no coincide').to.deep.equal(
        response.productFilter.categories
      )
      expect(productArray, 'El array de productos no coincide').to.deep.equal(
        response.productFilter.products
      )
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Modificar caja de regalos sin categorias', async () => {
      ;[categoryArray, productArray] = await Promise.all([
        getMeli.RandomCategories(3),
        getMeli.RandomProducts(80000)
      ])

      let response = await createGiftSteps.StepThree(
        id,
        categoryArray,
        productArray,
        'onlyProducts'
      )
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'No hubo éxito en StepThree [ERROR]'
      ).to.be.equal(true)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      const data = await service.POST(getGiftById, {
        id: id
      })

      response = data.data.data.getGiftById
      expect(productArray, 'El array de productos no coincide').to.deep.equal(
        response.productFilter.products
      )
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Modificar caja de regalos sin productos', async () => {
      ;[categoryArray, productArray] = await Promise.all([
        getMeli.RandomCategories(3),
        getMeli.RandomProducts(80000)
      ])
      let response = await createGiftSteps.StepThree(
        id,
        categoryArray,
        productArray,
        'onlyCategories'
      )
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'No hubo éxito en StepThree [ERROR]'
      ).to.be.equal(true)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      const data = await service.POST(getGiftById, {
        id: id
      })

      response = data.data.data.getGiftById

      expect(categoryArray, 'El array de categorias no coincide').to.deep.equal(
        response.productFilter.categories
      )
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
