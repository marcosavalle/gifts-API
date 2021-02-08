import { Gift } from '../../../models/gift.model'
import { ProductChosen } from '../../../models/product-chosen.model'
import { status } from '../../../constants/status'

export const statisticsCategories = async (parent, { selector }, ctx, info) => {
  let query

  if (selector === 'SENT') {
    query = Gift.find({
      userSenderId: ctx.user.id,
      'status.main': status.done
    })
      .lean()
      .select('_id')
  } else {
    query = Gift.find({
      userReceiverId: ctx.user.id,
      'status.main': status.done
    })
      .lean()
      .select('_id')
  }
  const gifts = await query

  const acumulator = []
  for (const gift of gifts) {
    const productChosen = await ProductChosen.findOne({
      giftId: gift._id
    })
      .select('categories')
      .lean()

    if (productChosen?.categories) {
      for (const categorie of productChosen.categories) {
        acumulator.push(categorie)
      }
    }
  }

  const agroup = acumulator.reduce((c, categorie) => {
    c[categorie] = (c[categorie] || 0) + 1
    return c
  }, {})

  const result = []
  for (const key in agroup) {
    result.push({
      name: key,
      amount: agroup[key]
    })
  }

  return result
}
