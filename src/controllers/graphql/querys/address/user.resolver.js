import { User } from '../../../../models/user.model'

export const user = async ({ user }, args, ctx, info) => {
  const response = await User.findById(user, 'name lastName avatarUrl').lean()
  response.id = response._id
  return response
}
