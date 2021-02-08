import { Payment } from '../../../../models/payment.model'

export const payment = async (parent, arg, ctx, info) => {
  const pay = await Payment.findOne(
    { giftId: parent.id },
    'paidDate mepaPaymentType'
  ).lean()

  if (!pay) {
    return
  }

  return {
    id: pay._id,
    paidDate: pay.paidDate,
    name: pay.mepaPaymentType
  }
}
