import Gql from '../../../services/gql-service'
import { Address } from '../../../models/address.model'
import { Gift } from '../../../models/gift.model'
import { ProductChosen } from '../../../models/product-chosen.model'
import { Product } from '../../../models/product.model'
import { Delivery } from '../../../models/delivery.model'
import { arrayIsEmpty } from '../../../helpers/verifyers'
import { RankingCategoriesReceiver } from '../../../models/ranking-categories-receiver.model'
import { RankingProductsReceiver } from '../../../models/ranking-products-receiver.model'
import { ProductFilter } from '../../../models/product-filter.model'
import { MeliService } from '../../../services/meli-service'
import moment from 'moment'
import { types } from '../../../constants/types'

const gql = new Gql()

export const giftSelect = async (parent, { input }, ctx, info) => {
  const gift = await Gift.findById(input.giftId)

  gql.checkUserLogged(ctx, gift?.userReceiverId || null)

  const { giftId, addressId, products } = input

  gql.verify(async () => {
    const msj = []

    if (!giftId) {
      msj.push('La elección de regalo debe incluir un ID de regalo.')
    }

    if (arrayIsEmpty(products)) {
      msj.push('La elección de regalo debe incluir al menos un producto.')
    }

    if (!gift.isActive()) {
      msj.push(
        'No se puede seleccionar productos de un regalo en esta instancia'
      )
    }

    if (gift.typeId.toString() === types.remoto && !addressId) {
      msj.push('Se debe ingresar ID de dirección para el delivery')
    } else if (gift.typeId.toString() === types.presencial && addressId) {
      msj.push('No se debe ingresar ID de dirección para un regalo presencial')
    } else if (addressId) {
      const address = await Address.findById(addressId)
      if (!address) {
        msj.push('La dirección no fue encontrada.')
      } else if (address.userId.toString() !== ctx.user.id) {
        msj.push('La dirección ingresada no pertenece al usuario')
      }
    }

    const productFilter = await ProductFilter.findOne(
      { giftId },
      'maxAmount'
    ).lean()

    for (const product of products) {
      if (product.price > productFilter.maxAmount) {
        msj.push(`${product.title} está fuera de presupuesto`)
      }
    }

    if (msj.length > 0) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    await gift.toChosen(ctx, sess)

    const productsIdList = []
    let totalPrice = 0
    const categoriesList = []
    for (const product of products) {
      totalPrice += product.price

      const newProduct = new Product({
        title: product.title,
        price: product.price,
        pictures: product.pictures,
        meliCategoryId: product.meliCategoryId,
        meliProductId: product.meliProductId
      })
      productsIdList.push(newProduct._id)
      await newProduct.save()

      const { data } = await MeliService.getProductDetailsById(
        product.meliProductId
      )

      const inRankingProd = await RankingProductsReceiver.findOne({
        meliId: data.catalog_product_id
      })

      if (inRankingProd) {
        const lastUpdate = moment(inRankingProd.lastChosen)
        const today = moment()
        const diffDays = today.diff(lastUpdate, 'days')

        inRankingProd.name = product.title
        inRankingProd.image = data.secure_thumbnail
        inRankingProd.lastChosen = new Date()
        inRankingProd.totalChosed = inRankingProd.totalChosed + 1
        inRankingProd.daysAcumulator = inRankingProd.daysAcumulator + diffDays
        inRankingProd.daysToChooseDelayAvg =
          inRankingProd.daysAcumulator / inRankingProd.totalChosed

        inRankingProd.save({ session: sess })
      } else {
        if (data.catalog_product_id !== null) {
          const newInRanking = RankingProductsReceiver({
            meliId: data.catalog_product_id,
            name: product.title,
            image: data.secure_thumbnail,
            firstChosen: new Date(),
            lastChosen: new Date(),
            daysAcumulator: 0,
            daysToChooseDelayAvg: 0,
            totalChosed: 1
          })
          newInRanking.save({ session: sess })
        }
      }

      const {
        data: { name }
      } = await MeliService.getCategoryById(product.meliCategoryId)

      const inRankingCat = await RankingCategoriesReceiver.findOne({
        meliId: product.meliCategoryId
      }).session(sess)

      if (inRankingCat) {
        const lastUpdate = moment(inRankingCat.lastChosen)
        const today = moment()
        const diffDays = today.diff(lastUpdate, 'days')

        inRankingCat.name = name
        inRankingCat.lastChosen = new Date()
        inRankingCat.totalChosed = inRankingCat.totalChosed + 1
        inRankingCat.daysAcumulator = inRankingCat.daysAcumulator + diffDays
        inRankingCat.daysToChooseDelayAvg =
          inRankingCat.daysAcumulator / inRankingCat.totalChosed

        inRankingCat.save({ session: sess })

        categoriesList.push(name)
      } else {
        const newInRanking = RankingCategoriesReceiver({
          meliId: product.meliCategoryId,
          name: name,
          firstChosen: new Date(),
          lastChosen: new Date(),
          daysAcumulator: 0,
          daysToChooseDelayAvg: 0,
          totalChosed: 1
        })
        newInRanking.save({ session: sess })

        categoriesList.push(name)
      }
    }

    const newProductChosen = new ProductChosen({
      giftId: giftId,
      chosenProducts: productsIdList,
      chosenDate: new Date(),
      price: totalPrice,
      categories: categoriesList
    })
    await newProductChosen.save()

    if (gift.typeId.toString() === types.remoto) {
      const newDelivery = new Delivery({
        giftId: giftId,
        deliveryAddressId: addressId
      })
      await newDelivery.toPending(ctx, sess)
    }

    return [`Los productos seleccionados se procesaron correctamente.`]
  })
}
