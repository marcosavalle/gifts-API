import { GiftReason } from '../models/gift-reason.model'

export const seedGiftReasons = async () => {
  await GiftReason.deleteMany()

  const giftReasons = [
    { name: 'Casamiento' },
    { name: 'Cumpleaños' },
    { name: 'Bautismo' },
    { name: 'San Valentín' },
    { name: 'Día de la madre' },
    { name: 'Día del padre' },
    { name: 'Navidad' },
    { name: 'Año nuevo' },
    { name: 'Día del amigo' },
    { name: 'Otro' }
  ]

  await GiftReason.insertMany(giftReasons)
}
