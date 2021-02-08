import { random, date } from 'faker'
import { User } from '../models/user.model'
import { Auth } from '../models/auth.model'

export const seedAuth = async () => {
  await Auth.deleteMany()

  const rawUsers = await User.find({}, '_id')
  const users = rawUsers.map(x => x._id)

  const auths = []

  for (const { _id } of users) {
    const a = {
      userId: _id,
      meliToken: random.alphaNumeric(20),
      meliRefreshToken: random.alphaNumeric(20),
      expireDate: date.future()
    }

    auths.push(a)
  }

  await Auth.insertMany(auths)
}
