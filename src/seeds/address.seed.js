import { address, lorem, phone, random } from 'faker'
import { Address } from '../models/address.model'
import { User } from '../models/user.model'
import { Locality } from '../models/locality.model'

export const seedAddresses = async () => {
  await Address.deleteMany()

  const rawUsers = await User.find({}, '_id')
  const users = rawUsers.map(x => x._id)

  const rawLocalities = await Locality.find({}, '_id', { limit: 1000 })
  const localities = rawLocalities.map(x => x._id)

  const addresses = []

  for (const { _id } of users) {
    const a = {
      street: address.streetName(),
      number: random.number(),
      description: lorem.lines(1),
      postalCode: address.zipCode(),
      localityId: random.arrayElement(localities),
      name: lorem.word(),
      contactPhone: phone.phoneNumber(),
      userId: _id
    }

    addresses.push(a)
  }

  await Address.insertMany(addresses)
}
