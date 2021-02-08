import { Gift } from '../../../models/gift.model'
import { status } from '../../../constants/status'

function dateCalculate(a, b) {
  a.setDate(a.getDate() + b)
  return a
}

export const statisticsGifts = async (parent, { selector }, ctx, info) => {
  let query
  const d = new Date()
  const dateToCompare = dateCalculate(d, -180)

  if (selector === 'SENT') {
    query = Gift.find({
      userSenderId: ctx.user.id,
      createdDate: { $gte: dateToCompare },
      'status.main': status.done
    })
      .lean()
      .select('createdDate')
  } else {
    query = Gift.find({
      userReceiverId: ctx.user.id,
      createdDate: { $gte: dateToCompare },
      'status.main': status.done
    })
      .lean()
      .select('createdDate')
  }
  const gifts = await query

  const today = new Date()
  const actualMonth = today.getMonth() + 1

  const result = [
    { month: actualMonth, amount: 0 },
    { month: actualMonth - 1, amount: 0 },
    { month: actualMonth - 2, amount: 0 },
    { month: actualMonth - 3, amount: 0 },
    { month: actualMonth - 4, amount: 0 },
    { month: actualMonth - 5, amount: 0 }
  ]

  let dGift
  for (const item of result) {
    for (const gift of gifts) {
      dGift = new Date(gift.createdDate)
      if (item.month === dGift.getMonth() + 1) {
        item.amount++
      }
    }
  }

  return result.reverse()
}
