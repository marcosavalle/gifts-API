import Gql from '../../../services/gql-service'
import { ProductFilter } from '../../../models/product-filter.model'
import { GiftReason } from '../../../models/gift-reason.model'
import { GiftType } from '../../../models/gift-type.model'
import { isValidObjectId } from 'mongoose'
import { Gift } from '../../../models/gift.model'
import { RankingCategoriesSender } from '../../../models/ranking-categories-sender.model'
import { RankingProductsSender } from '../../../models/ranking-products-sender.model'
import { MeliService } from '../../../services/meli-service'
import moment from 'moment'
import { isEmpty } from '../../../helpers/verifyers'
import Joi from 'joi'
const gql = new Gql()

export const createGiftStepFour = async (
  parent,
  { input: { giftId, edit } },
  ctx,
  info
) => {
  const gift = await Gift.findById(giftId)

  gql.checkUserLogged(ctx, gift?.userSenderId || null)

  const productFilter = await ProductFilter.findOne({ giftId })

  gql.verify(async () => {
    const msj = []

    if (!isValidObjectId(giftId)) {
      msj.push('Se debe asignar a un regalo válido')
    } else {
      if (!gift) {
        msj.push('El regalo no existe')
      } else {
        if (!productFilter) {
          msj.push('El regalo no ha completado los pasos previos')
        } else {
          if (
            (!productFilter.categories && !productFilter.products) ||
            (!productFilter.categories?.length > 0 &&
              !productFilter.products?.length > 0)
          ) {
            msj.push('El regalo no tiene elegidas categorías ni productos')
          } else {
            const giftSchema = Joi.object({
              senderName: Joi.string().min(2).max(20),
              receiverName: Joi.string().min(2).max(20)
            })
            const giftResult = giftSchema.validate(gift, { allowUnknown: true })
            if (giftResult.error) {
              msj.push(giftResult.error.details[0].message)
            }

            const productFilterSchema = Joi.object({
              maxAmount: Joi.number().min(500).max(100000).required(),
              categories: Joi.array()
                .items(
                  Joi.object({
                    meliId: Joi.string().min(3).required(),
                    name: Joi.string().min(3).required()
                  }).required()
                )
                .allow(null),
              products: Joi.array()
                .items(
                  Joi.object({
                    meliId: Joi.string().min(3).required(),
                    name: Joi.string().min(3).required(),
                    price: Joi.number().required(),
                    picture: Joi.string().required(),
                    meliCategoryId: Joi.string().min(3).required()
                  }).required()
                )
                .allow(null)
            }).or('categories', 'products')

            const productFilterResult = productFilterSchema.validate(
              productFilter,
              { allowUnknown: true }
            )
            if (productFilterResult.error) {
              msj.push(productFilterResult.error.details[0].message)
            } else {
              if (productFilter.products) {
                for (const product of productFilter.products) {
                  if (product.price > productFilter.maxAmount) {
                    msj.push(
                      `El producto ${product.meliId} - ${product.name} está fuera de presupuesto`
                    )
                  }
                }
              }
            }

            if (isEmpty(gift.senderName)) {
              msj.push('Debe proporcionar un nombre de emisor')
            }

            if (isEmpty(gift.receiverName)) {
              msj.push('Debe proporcionar un nombre de receptor')
            }

            if (gift.reasonId || gift.reasonId === '') {
              if (!isValidObjectId(gift.reasonId)) {
                msj.push('Debe proporcionar un ID de razón de regalo válido.')
              } else {
                if (!(await GiftReason.findById(gift.reasonId))) {
                  msj.push(
                    'No se encontró una razón de regalo con el ID proporcionado'
                  )
                }
              }
            }

            if (gift.typeId || gift.typeId === '') {
              if (!isValidObjectId(gift.typeId)) {
                msj.push('Debe proporcionar un ID de tipo de regalo válido')
              } else {
                if (!(await GiftType.findById(gift.typeId))) {
                  msj.push(
                    'No se encontró un tipo de regalo con el ID proporcionado'
                  )
                }
              }
            }

            if (edit) {
              if (!gift.isPending()) {
                msj.push('No se puede editar un regalo en esta instancia')
              }
            } else {
              if (!gift.isInProgress()) {
                msj.push('El regalo ya no está en proceso de creación')
              }
            }
          }
        }
      }
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    if (productFilter.products) {
      for (const prod of productFilter.products) {
        const { data: product } = await MeliService.getProductDetailsById(
          prod.meliId
        )

        const inRanking = await RankingProductsSender.findOne({
          meliId: product.catalog_product_id
        }).session(sess)

        if (inRanking) {
          const lastUpdate = moment(inRanking.lastChosen)
          const today = moment()
          const diffDays = today.diff(lastUpdate, 'days')

          inRanking.name = prod.name
          inRanking.image = product.secure_thumbnail
          inRanking.lastChosen = new Date()
          inRanking.totalChosed = inRanking.totalChosed + 1
          inRanking.daysAcumulator = inRanking.daysAcumulator + diffDays
          inRanking.daysToChooseDelayAvg =
            inRanking.daysAcumulator / inRanking.totalChosed
          await inRanking.save({ session: sess })
        } else {
          if (product.catalog_product_id !== null) {
            const newInRanking = RankingProductsSender({
              meliId: product.catalog_product_id,
              name: prod.name,
              image: product.secure_thumbnail,
              firstChosen: new Date(),
              lastChosen: new Date(),
              daysAcumulator: 0,
              daysToChooseDelayAvg: 0,
              totalChosed: 1
            })
            await newInRanking.save({ session: sess })
          }
        }
      }
    }

    if (productFilter.categories) {
      for (const category of productFilter.categories) {
        const inRanking = await RankingCategoriesSender.findOne({
          meliId: category.meliId
        }).session(sess)

        if (inRanking) {
          const lastUpdate = moment(inRanking.lastChosen)
          const today = moment()
          const diffDays = today.diff(lastUpdate, 'days')

          inRanking.name = category.name
          inRanking.lastChosen = new Date()
          inRanking.totalChosed = inRanking.totalChosed + 1
          inRanking.daysAcumulator = inRanking.daysAcumulator + diffDays
          inRanking.daysToChooseDelayAvg =
            inRanking.daysAcumulator / inRanking.totalChosed

          await inRanking.save({ session: sess })
        } else {
          const newInRanking = RankingCategoriesSender({
            meliId: category.meliId,
            name: category.name,
            firstChosen: new Date(),
            lastChosen: new Date(),
            daysAcumulator: 0,
            daysToChooseDelayAvg: 0,
            totalChosed: 1
          })
          await newInRanking.save({ session: sess })
        }
      }
    }

    if (!edit) {
      await gift.toPending(ctx, sess)
    }

    return [`El regalo se envió correctamente`]
  })
}
