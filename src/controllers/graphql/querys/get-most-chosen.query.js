import { MeliService } from '../../../services/meli-service'
import { RankingCategoriesReceiver } from '../../../models/ranking-categories-receiver.model'
import { RankingCategoriesSender } from '../../../models/ranking-categories-sender.model'
import { RankingProductsSender } from '../../../models/ranking-products-sender.model'
import { RankingProductsReceiver } from '../../../models/ranking-products-receiver.model'

function dateCalculate(a, b) {
  a.setDate(a.getDate() + b)
  return a
}

export const getMostChosen = async (
  parent,
  { filter, choosenBy, periodActivity, limit },
  ctx,
  info
) => {
  let model
  let days
  let hasPeriod = true
  const select = filter === 'CATEGORIES' ? 'meliId name' : 'meliId name image'

  if (choosenBy === 'SENDERS') {
    if (filter === 'CATEGORIES') {
      model = RankingCategoriesSender
    } else {
      model = RankingProductsSender
    }
  } else {
    if (filter === 'CATEGORIES') {
      model = RankingCategoriesReceiver
    } else {
      model = RankingProductsReceiver
    }
  }

  if (periodActivity === 'FOUR_WEEKS') {
    days = 30
  } else if (periodActivity === 'TWO_WEEKS') {
    days = 15
  } else {
    hasPeriod = false
  }

  let result

  if (hasPeriod) {
    const d = new Date()
    const dateToCompare = dateCalculate(d, -days)

    if (limit) {
      result = await model
        .find({ lastChosen: { $gte: dateToCompare } })
        .sort({ totalChosed: -1, daysToChooseDelayAvg: 1 })
        .select(select)
        .limit(limit)
        .lean()
    } else {
      result = await model
        .find({ lastChosen: { $gte: dateToCompare } })
        .sort({ totalChosed: -1, daysToChooseDelayAvg: 1 })
        .select(select)
        .lean()
    }
  } else {
    if (limit) {
      result = await model
        .find()
        .sort({ totalChosed: -1, daysToChooseDelayAvg: 1 })
        .select(select)
        .limit(limit)
        .lean()
    } else {
      result = await model
        .find()
        .sort({ totalChosed: -1, daysToChooseDelayAvg: 1 })
        .select(select)
        .lean()
    }
  }

  return result.map(async item => {
    if (filter === 'CATEGORIES') {
      const {
        data: { picture }
      } = await MeliService.getCategoryById(item.meliId)

      return {
        meliId: item.meliId,
        name: item.name,
        image: picture
      }
    } else {
      const review = await MeliService.getItemReviewsById(item.meliId)

      return {
        meliId: item.meliId,
        name: item.name,
        image: item.image,
        rating: review.data.rating_average
      }
    }
  })
}
