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
    let id, categoryArray, productArray, types, reasons
    before(async () => {
      const response = await createGiftSteps.StepOne()
      id = response.id

      types = await Mongo.read(() => GiftType.find())
      reasons = await Mongo.read(() => GiftReason.find())
    })
    beforeEach(async () => {
      await deleteTestData.ProductFilter(id)
    })
    it('Carga de caja de regalos saltando paso 2', async () => {
      categoryArray = await getMeli.RandomCategories(3)
      productArray = await getMeli.RandomProducts(80000)
      let response = await createGiftSteps.StepThreeCustom({
        input: {
          giftId: id,
          categories: categoryArray,
          products: productArray
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'No hubo éxito en StepThree [ERROR]'
      ).to.be.equal(false)
      expect(response.message, 'No hubo éxito en StepThree [ERROR]').to.include(
        'El regalo no ha completado el paso previo'
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById

      expect(null, 'El regalo tiene filtro de productos').to.be.equal(
        response.productFilter
      )
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Carga de caja de regalos sin ID', async () => {
      await createGiftSteps.StepTwo(id, types, reasons)
      categoryArray = await getMeli.RandomCategories(3)
      productArray = await getMeli.RandomProducts(80000)
      let response = await createGiftSteps.StepThreeCustom({
        input: {
          giftId: '',
          categories: categoryArray,
          products: productArray
        }
      })
      expect(response, 'No hubo response').to.be.null

      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(
        response.productFilter.products,
        'El regalo tiene filtro de productos'
      ).to.deep.equal([])
      expect(
        response.productFilter.categories,
        'El regalo tiene filtro de productos'
      ).to.deep.equal([])
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Carga caja de regalos sin productos ni categorias', async () => {
      await createGiftSteps.StepTwo(id, types, reasons)
      let response = await createGiftSteps.StepThreeCustom({
        input: {
          giftId: id
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'No hubo éxito en StepThree [ERROR]'
      ).to.be.equal(false)
      expect(
        response.message.toString(),
        'No hubo éxito en StepThree [ERROR]'
      ).to.include(
        `"value" must contain at least one of [categories, products]`
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById

      expect(
        response.productFilter.products,
        'El regalo tiene filtro de productos'
      ).to.deep.equal([])
      expect(
        response.productFilter.categories,
        'El regalo tiene filtro de productos'
      ).to.deep.equal([])
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Carga de caja de regalos con presupuesto menor a productos seleccionados', async () => {
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
      categoryArray = await getMeli.RandomCategories(3)
      productArray = await getMeli.RandomProducts(80000)
      let response = await createGiftSteps.StepThreeCustom({
        input: {
          giftId: id,
          categories: categoryArray,
          products: productArray
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'No hubo éxito en StepThree [ERROR]'
      ).to.be.equal(false)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')

      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(
        response.productFilter.products,
        'El regalo tiene filtro de productos'
      ).to.deep.equal([])
      expect(
        response.productFilter.categories,
        'El regalo tiene filtro de productos'
      ).to.deep.equal([])
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })

    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
