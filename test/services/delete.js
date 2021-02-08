import Mongo from '../../src/services/mongo-service'
import { Gift } from '../../src/models/gift.model'
import { ProductFilter } from '../../src/models/product-filter.model'
import { StatusChange } from '../../src/models/status-change.model'
import { ProductChosen } from '../../src/models/product-chosen.model'
import { Product } from '../../src/models/product.model'
import { MeliService } from '../../src/services/meli-service'
import { RankingCategoriesReceiver } from '../../src/models/ranking-categories-receiver.model'
import { RankingProductsReceiver } from '../../src/models/ranking-products-receiver.model'
import { RankingCategoriesSender } from '../../src/models/ranking-categories-sender.model'
import { RankingProductsSender } from '../../src/models/ranking-products-sender.model'
import { BlockedUser } from '../../src/models/blocked-user.model'

export class deleteTestData {
  static async createGiftUnhappyPath(giftId) {
    const response = await Mongo.write(async () => {
      await Promise.all([
        StatusChange.deleteMany({ documentId: giftId }),
        ProductFilter.deleteMany({ giftId: giftId }),
        Gift.deleteMany({ _id: giftId })
      ])
    })
    if (response) {
      return true
    } else {
      return false
    }
  }

  static async AllSteps(giftId) {
    const response = await Mongo.write(async () => {
      await Promise.all([
        StatusChange.deleteMany({ documentId: giftId }),
        ProductFilter.deleteMany({ giftId: giftId }),
        Gift.deleteMany({ _id: giftId })
      ])
    })
    if (response) {
      return true
    } else {
      return false
    }
  }

  static async BlockedUser() {
    try {
      const response = await Mongo.write(async () => {
        await BlockedUser.findOneAndDelete().sort({ _id: -1 })
      })
      if (response) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  static async ProductFilter(giftId) {
    const response = await Mongo.write(async () => {
      await ProductFilter.deleteMany({ giftId: giftId })
    })
    if (response) {
      return true
    } else {
      return false
    }
  }

  static async ProductsCategories(giftId) {
    const response = await Mongo.write(async () => {
      let productFilter = await ProductFilter.findOne({ giftId: giftId })
      const input = {
        giftId: giftId,
        maxAmount: productFilter.maxAmount
      }
      productFilter = await ProductFilter.findByIdAndUpdate(
        productFilter._id,
        input
      )
    })
    if (response) {
      return true
    } else {
      return false
    }
  }

  static async Performance(
    { meliSellerId, meliCategoryId, meliProductId },
    arrayGiftId,
    {
      rankingCategoriesReceiver,
      rankingProductsReceiver,
      rankingCategoriesSender,
      rankingProductsSender
    }
  ) {
    for (const giftId of arrayGiftId) {
      try {
        const response = await Mongo.write(async () => {
          await StatusChange.deleteMany({ documentId: giftId })
          await ProductFilter.deleteMany({ giftId: giftId })
          await Gift.deleteMany({ _id: giftId })
          await ProductChosen.deleteMany({ giftId: giftId })
          await Product.deleteMany({
            $and: [
              { meliSellerId: meliSellerId },
              { meliCategoryId: meliCategoryId },
              { meliProductId: meliProductId }
            ]
          })
          if (rankingCategoriesReceiver) {
            await RankingCategoriesReceiver.findByIdAndUpdate(
              { _id: rankingCategoriesReceiver._id },
              rankingCategoriesReceiver
            )
          } else {
            await RankingCategoriesReceiver.deleteMany({
              meliId: meliCategoryId
            })
          }
          if (rankingProductsReceiver) {
            await RankingProductsReceiver.findByIdAndUpdate(
              { _id: rankingProductsReceiver._id },
              rankingProductsReceiver
            )
          } else {
            const { data } = await MeliService.getProductDetailsById(
              meliProductId
            )
            const catalogProductId = data.catalog_product_id
            await RankingProductsReceiver.deleteMany({
              meliId: catalogProductId
            })
          }
          for (const category of rankingCategoriesSender) {
            if (category._id) {
              await RankingCategoriesSender.findByIdAndUpdate(
                { _id: category._id },
                category
              )
            } else if (category.meliId) {
              await RankingCategoriesSender.deleteMany({
                meliId: category.meliId
              })
            }
          }
          for (const product of rankingProductsSender) {
            if (product._id) {
              await RankingProductsSender.findByIdAndUpdate(
                { _id: product._id },
                product
              )
            } else if (product.productId) {
              const { data } = await MeliService.getProductDetailsById(
                product.productId
              )
              const catalogProductId = data.catalog_product_id
              await RankingProductsSender.deleteMany({
                meliId: catalogProductId
              })
            }
          }
        })
        return response
      } catch (error) {
        console.log(error)
      }
    }
  }
}
