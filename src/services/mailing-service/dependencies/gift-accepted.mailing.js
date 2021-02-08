import Mailing from '../index'
import { Gift } from '../../../models/gift.model'
import { User } from '../../../models/user.model'

export async function giftAccepted(giftId) {
  const mailing = new Mailing()

  const gift = await Gift.findById(giftId)

  const [sender, receiver] = await Promise.all([
    User.findById(gift.userSenderId),
    User.findById(gift.userReceiverId)
  ])

  mailing.to(sender.email)
  mailing.subject('Aceptaron tu regalo')
  mailing.htmlBody(
    `<p> Hola ${sender.name}! ${gift.receiverName} aceptó tu regalo! </p>`
  )
  const senderResult = await mailing.send()

  mailing.to(receiver.email)
  mailing.subject('Aceptaste el regalo')
  mailing.htmlBody(
    `<p> Hola ${receiver.name}! Aceptaste el regalo de ${gift.senderName}! </p>`
  )
  const receiverResult = await mailing.send()

  if (senderResult.success && receiverResult.success) {
    return {
      success: true,
      message: ['Emails enviados correctamente']
    }
  } else {
    return {
      success: false,
      message: ['Server Error: Emails no enviados']
    }
  }
}
