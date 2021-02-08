import { getAddressById } from './querys/get-address-by-id.query'
import { getUser } from './querys/get-user.query'
import { getGiftReasonById } from './querys/get-gift-reason-by-id.query'
import { getGiftTypeById } from './querys/get-gift-type-by-id.query'
import { getMeliCategoryById } from './querys/get-meli-category-by-id.query'
import { getProductFilterById } from './querys/get-product-filter-by-id.query'
import { getGiftById } from './querys/get-gift-by-id.query'
import { getMeliProductDetailsById } from './querys/get-meli-product-details-by-id.query'
import { getGiftBox } from './querys/get-gift-box.query'
import { getLocalitiesByProvinceId } from './querys/get-localities-by-province-id.query'

import { getAllGiftReasons } from './querys/get-all-gift-reasons.query'
import { getAllGiftTypes } from './querys/get-all-gift-types.query'
import { getAllMeliCategories } from './querys/get-all-meli-categories.query'
import { getAllMeliProducts } from './querys/get-all-meli-products.query'
import { getAllGiftStatus } from './querys/get-all-gift-status.query'
import { getAllGiftsSent } from './querys/get-all-gifts-sent.query'
import { getAllGiftsReceived } from './querys/get-all-gifts-received.query'
import { getMostChosen } from './querys/get-most-chosen.query'
import { getGiftStatusesHistory } from './querys/get-gift-statuses-history.query'
import { getAllProvinces } from './querys/get-all-provinces.query'

import { statisticsGifts } from './querys/statistics-gifts.query'
import { statisticsBudget } from './querys/statistics-budget.query'
import { statisticsBudgetAvg } from './querys/statistics-budget-avg.query'
import { statisticsCategories } from './querys/statistics-categories.query'
import { getPaymentUrl } from './querys/get-payment-url.query'

export const Query = {
  getAddressById,
  getUser,
  getGiftReasonById,
  getAllGiftReasons,
  getGiftTypeById,
  getAllGiftTypes,
  getProductFilterById,
  getMeliCategoryById,
  getAllMeliCategories,
  getAllMeliProducts,
  getGiftById,
  getMeliProductDetailsById,
  getGiftBox,
  getAllGiftStatus,
  getAllGiftsSent,
  getAllGiftsReceived,
  getMostChosen,
  getGiftStatusesHistory,
  statisticsGifts,
  statisticsBudget,
  statisticsBudgetAvg,
  statisticsCategories,
  getPaymentUrl,
  getAllProvinces,
  getLocalitiesByProvinceId,
}
