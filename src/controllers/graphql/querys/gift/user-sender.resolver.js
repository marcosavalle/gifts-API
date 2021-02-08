import { Gift } from '../../../../models/gift.model'
import { User } from '../../../../models/user.model'

export const userSender = async (parent, arg, ctx, info) => {
  const gift = await Gift.findById(parent.id, 'userSenderId').lean()
  const user = await User.findById(
    gift.userSenderId,
    'name lastName avatarUrl'
  ).lean()

  if (!user) {
    return
  }

  return {
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl
  }
}
