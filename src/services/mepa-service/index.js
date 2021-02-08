import mercadopago from 'mercadopago'
import { AUTH_REDIRECTS } from '../../constants/auth'

export class MepaService {
  static async getPayUrl(body) {
    const environment = process.env.ENVIRONMENT

    try {
      mercadopago.configure({
        access_token: process.env.MEPA_ACCESS_TOKEN
      })

      const preference = body.products.map(product => {
        return {
          title: product.name,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: product.price,
          picture_url: product.picture
        }
      })

      const paymentData = {
        items: preference,
        back_urls: {
          success: `${AUTH_REDIRECTS[environment]}/pagar/${body.giftId}?address=${body.addressId}`,
          failure: `${AUTH_REDIRECTS[environment]}/pagar/${body.giftId}?address=${body.addressId}`
        }
      }

      const mepaResponse = await mercadopago.preferences.create(paymentData)
      return mepaResponse.response.sandbox_init_point
    } catch (error) {
      console.log(error)
      return ''
    }
  }
}
