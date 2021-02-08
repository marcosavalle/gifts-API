import { Gift } from '../../../models/gift.model'
import { ProductChosen } from '../../../models/product-chosen.model'
import { status } from '../../../constants/status'

export const statisticsBudgetAvg = async (parent, { selector }, ctx, info) => {
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

  let c = 0
  let result = 0
  for (const gift of gifts) {
    const productChosen = await ProductChosen.findOne({
      giftId: gift._id
    })
      .select('price')
      .lean()

    if (productChosen?.price) {
      result += productChosen.price
      c++
    }
  }

  if (result === 0) {
    return result
  } else {
    return result / c
  }
}
