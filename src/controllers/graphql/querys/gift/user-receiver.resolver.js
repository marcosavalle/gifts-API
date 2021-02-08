import { Gift } from '../../../../models/gift.model'
import { User } from '../../../../models/user.model'

export const userReceiver = async (parent, arg, ctx, info) => {
  const gift = await Gift.findById(parent.id, 'userReceiverId').lean()
  const user = await User.findById(
    gift.userReceiverId,
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
