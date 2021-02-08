import axios from 'axios'
import { BASE_ENDPOINT } from '../../constants/base'

export class MeliService {
  static async getCategoryById(id) {
    return await axios.get(`${BASE_ENDPOINT}/categories/${id}`)
  }

  static async getCategoriesBySite(site) {
    return await axios.get(`${BASE_ENDPOINT}/sites/${site}/categories`)
  }

  static async getProducts(site, filters, accessToken, offset, limit) {
    let filtersUrl =
      'ITEM_CONDITION=2230284&accepts_mercadopago=yes&sort=price_asc'

    for (const { filter, value } of filters) {
      filtersUrl += `&${filter}=${value}`
    }

    return await axios.get(
      `${BASE_ENDPOINT}/sites/${site}/search?${filtersUrl}&access_token=${accessToken}&offset=${offset}&limit=${limit}`
    )
  }

  static async getProductDetailsById(id) {
    return await axios.get(`${BASE_ENDPOINT}/items/${id}`)
  }

  static async getItemReviewsById(id) {
    return await axios.get(`${BASE_ENDPOINT}/reviews/item/${id}`)
  }

  static async getProductDescriptionById(productId, descriptionId) {
    return await axios.get(
      `${BASE_ENDPOINT}/items/${productId}/descriptions/${descriptionId}`
    )
  }
}
