import { createOrUpdateAddress } from './mutations/create-or-update-address.mutation'
import { updateUser } from './mutations/update-user.mutation'
import { giftAccept } from './mutations/gift-accept.mutation'
import { giftBuy } from './mutations/gift-buy.mutation'
import { giftSelect } from './mutations/gift-select.mutation'
import { giftDiscardBySender } from './mutations/gift-discard-by-sender.mutation'
import { giftDiscardByReceiver } from './mutations/gift-discard-by-receiver.mutation'
import { addressActive } from './mutations/address-active.mutation'
import { addressInactive } from './mutations/address-inactive.mutation'
import { createGiftStepOne } from './mutations/create-gift-step-one.mutation'
import { createGiftStepTwo } from './mutations/create-gift-step-two.mutation'
import { createGiftStepThree } from './mutations/create-gift-step-three.mutation'
import { createGiftStepFour } from './mutations/create-gift-step-four.mutation'
import { resetGift } from './mutations/reset-gift-mutation'
import { changeStatusDelivery } from './mutations/change-status-delivery.mutation'

export const Mutation = {
  createOrUpdateAddress,
  updateUser,
  giftAccept,
  giftBuy,
  giftSelect,
  giftDiscardBySender,
  giftDiscardByReceiver,
  addressActive,
  addressInactive,
  createGiftStepOne,
  createGiftStepTwo,
  createGiftStepThree,
  createGiftStepFour,
  resetGift,
  changeStatusDelivery
}
