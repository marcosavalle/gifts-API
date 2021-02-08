import Mongo from '../../../src/services/mongo-service'
import chalk from 'chalk'

import { MeliService } from '../../../src/services/meli-service'
import { GiftType } from '../../../src/models/gift-type.model'
import { GiftReason } from '../../../src/models/gift-reason.model'
import { getMeli } from '../../services/meli'
import { deleteTestData } from '../../services/delete'
import { createGiftSteps } from '../../services/meli-regalos/createGiftSteps'
import { getAllGifts } from '../../services/meli-regalos/getAllGifts'
import { acceptAndSelectGift } from '../../services/meli-regalos/acceptAndSelectGift'
import { giftSelectVariables } from '../../constants/mutations/giftSelect'
import { address } from '../../services/meli-regalos/createOrUpdateAddress'
import { RankingCategoriesReceiver } from '../../../src/models/ranking-categories-receiver.model'
import { RankingProductsReceiver } from '../../../src/models/ranking-products-receiver.model'
import { RankingCategoriesSender } from '../../../src/models/ranking-categories-sender.model'
import { RankingProductsSender } from '../../../src/models/ranking-products-sender.model'

const arrayGiftsSender = []
const quantityGifts = 2
let categoryArray = []
let productArray = []
describe('Performance', async () => {
  let rankingCategoriesReceiver, rankingProductsReceiver
  const rankingCategoriesSender = []
  const rankingProductsSender = []
  before(async () => {
    const { data } = await MeliService.getProductDetailsById(
      giftSelectVariables.input.products[0].meliProductId
    )
    const catalogProductId = data.catalog_product_id
    await Mongo.read(async () => {
      rankingCategoriesReceiver = await RankingCategoriesReceiver.findOne({
        meliId: giftSelectVariables.input.products[0].meliCategoryId
      })
      rankingProductsReceiver = await RankingProductsReceiver.findOne({
        meliId: catalogProductId
      })
    })
  })
  describe('createGiftStepsSender', async () => {
    let types, reasons
    before(async () => {
      process.env.TOKEN = process.env.TOKENSENDER
      categoryArray = await getMeli.RandomCategories(2)
      productArray = await getMeli.RandomProducts(95000)
    })
    it('Create complete gift', async () => {
      let giftId

      types = await Mongo.read(() => GiftType.find())
      reasons = await Mongo.read(() => GiftReason.find())

      // Performance Delete Ranking
      for (const category of categoryArray) {
        const data = await RankingCategoriesSender.findOne({
          meliId: category.meliId
        })
        if (data) {
          rankingCategoriesSender.push(data)
        } else {
          rankingCategoriesSender.push(category)
        }
      }
      for (const product of productArray) {
        const { data } = await MeliService.getProductDetailsById(product.meliId)
        const response = await RankingProductsSender.findOne({
          meliId: data.catalog_product_id
        })
        if (response) {
          rankingProductsSender.push(response)
        } else {
          rankingProductsSender.push({ productId: product.meliId })
        }
      }

      console.time('100 gifts created')
      for (let index = 0; index < quantityGifts; index++) {
        let response = await createGiftSteps.StepOne()
        giftId = response.giftId
        expect(response.success, 'No hubo exito en la operacion').to.equal(true)

        response = await createGiftSteps.StepTwo(giftId, types, reasons)
        expect(response.success, 'No hubo exito en la operacion').to.equal(true)

        response = await createGiftSteps.StepThree(
          giftId,
          categoryArray,
          productArray,
          'all'
        )
        expect(response.success, 'No hubo exito en la operacion').to.equal(true)

        response = await createGiftSteps.StepFour(giftId)
        expect(response.success, 'No hubo exito en la operacion').to.equal(true)

        arrayGiftsSender.push(giftId)
      }
      console.timeEnd('100 gifts created')
    })
  })
  describe('acceptAndSelectGifts', async () => {
    before(async () => {
      process.env.TOKEN = process.env.TOKENRECEIVER
    })
    it('Accept', async () => {
      const responses = await acceptAndSelectGift.AcceptPerformance(
        arrayGiftsSender
      )
      for (const response of responses) {
        expect(response.success, 'No hubo exito en la operacion').to.equal(true)
      }
    })
    it('CreateAddress', async () => {
      const response = await address.Create()
      expect(response.success, 'No hubo exito en la operacion').to.equal(true)
    })
    it('Select', async () => {
      const responses = await acceptAndSelectGift.SelectPerformance(
        arrayGiftsSender
      )
      for (const response of responses) {
        const data = response.success
        expect(true, 'No hubo exito en la operacion').to.equal(data)
      }
    })
  })
  describe('getAllGifts', async () => {
    it('Sent', async () => {
      process.env.TOKEN = process.env.TOKENSENDER
      await getAllGifts.Sent()
    })
    it('Received', async () => {
      process.env.TOKEN = process.env.TOKENRECEIVER
      await getAllGifts.Received()
    })
  })

  after(async () => {
    try {
      const input = {
        meliSellerId: giftSelectVariables.input.products[0].meliSellerId,
        meliCategoryId: giftSelectVariables.input.products[0].meliCategoryId,
        meliProductId: giftSelectVariables.input.products[0].meliProductId
      }
      const ranking = {
        rankingCategoriesReceiver: rankingCategoriesReceiver,
        rankingProductsReceiver: rankingProductsReceiver,
        rankingCategoriesSender: rankingCategoriesSender,
        rankingProductsSender: rankingProductsSender
      }
      const data = await deleteTestData.Performance(
        input,
        arrayGiftsSender,
        ranking
      )
      expect(true, 'No hubo exito en la operacion').to.equal(data.success)
      if (data) {
        console.log(
          chalk.blue.inverse.bold(
            'Datos creados por Test de Performance fueron borrados correctamente'
          )
        )
      } else {
        throw 'No se borraron correctamente los datos'
      }
    } catch (error) {
      console.log(
        chalk.red.inverse.bold(
          'Falla en el borrado de los datos de testis',
          error
        )
      )
    }
  })
})
