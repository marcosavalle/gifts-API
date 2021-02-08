import { name, image, internet, random, phone } from 'faker'
import { User } from '../models/user.model'

export const seedUsers = async q => {
  await User.deleteMany()

  for (let i = 0; i < q; i++) {
    const user = new User({
      name: name.firstName(),
      lastName: name.lastName(),
      email: internet.email(),
      phone: phone.phoneNumber(),
      avatarUrl: image.avatar(),
      meliId: random.uuid(),
      meliNickname: `${name.firstName()}-${name.lastName()}`
    })

    await user.save()
  }
}
