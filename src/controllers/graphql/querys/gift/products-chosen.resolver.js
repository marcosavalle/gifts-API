import { ProductChosen } from '../../../../models/product-chosen.model'

export const productsChosen = async (parent, arg, ctx, info) => {
  const productsChosen = await ProductChosen.findOne(
    { giftId: parent.id },
    'chosenDate'
  ).lean()

  if (!productsChosen) {
    return
  }

  return {
    id: productsChosen._id,
    chosenDate: productsChosen.chosenDate
  }
}
