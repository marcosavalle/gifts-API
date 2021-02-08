import { User } from '../../../models/user.model'

export const getUser = async (parent, input, ctx, info) => {
  const id = ctx.user.id
  const dbUser = await User.findById(id).lean()

  const { name, lastName, email, phone, avatarUrl, points } = dbUser

  return {
    id,
    name,
    lastName,
    email,
    phone,
    avatarUrl,
    points
  }
}
