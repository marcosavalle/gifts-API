import { GiftType } from '../../../models/gift-type.model'

export const getGiftTypeById = async (parent, { id }, ctxt, info) => {
  const response = await GiftType.findById(id).lean()
  response.id = response._id
  return response
}
