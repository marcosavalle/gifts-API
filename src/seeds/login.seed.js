import { date, random } from 'faker'
import { User } from '../models/user.model'
import { Login } from '../models/login.model'

export const seedLogins = async () => {
  await Login.deleteMany()

  const rawUsers = await User.find({}, '_id')
  const users = rawUsers.map(x => x._id)

  const logins = []

  for (let i = 0; i < users.length / 2; i++) {
    const l = {
      userId: random.arrayElement(users),
      inDate: date.recent()
    }

    logins.push(l)
  }

  await Login.insertMany(logins)
}
