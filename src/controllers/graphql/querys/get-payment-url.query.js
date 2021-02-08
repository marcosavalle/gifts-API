import { MepaService } from '../../../services/mepa-service'

export const getPaymentUrl = async (parent, { input }, ctxt, info) => {
  const response = await MepaService.getPayUrl(input)
  return response
}
