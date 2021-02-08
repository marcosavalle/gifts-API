import { GiftReason } from '../../../models/gift-reason.model'

export const getGiftReasonById = async (parent, { id }, ctxt, info) => {
  const response = await GiftReason.findById(id).lean()
  response.id = response._id
  return response
}
