import { BlockedUser } from '../../models/blocked-user.model'
import { status } from '../../constants/status'

const blockUser = async (blockerId, blockedId, sess, ctx) => {
  const obj = await BlockedUser.findOne({ blockedId, blockerId }).session(sess)

  if (obj) {
    await obj.toActive(ctx, sess)
  } else {
    const newBlockedUser = new BlockedUser({
      blockerId,
      blockedId,
      status: {
        main: status.active
      }
    })

    await newBlockedUser.save({ session: sess })
  }
}

const unblockUser = async (blockerId, blockedId, sess, ctx) => {
  const obj = await BlockedUser.findOne({ blockedId, blockerId }).session(sess)

  if (obj) {
    await obj.toInactive(ctx, sess)
  }
}

const checkBlocked = async (userAid, userBid) => {
  const objA = await BlockedUser.findOne({
    blockedId: userAid,
    blockerId: userBid
  }).lean()
  const objB = await BlockedUser.findOne({
    blockedId: userBid,
    blockerId: userAid
  }).lean()

  if (objA || objB) {
    return true
  } else {
    return false
  }
}

export { blockUser, unblockUser, checkBlocked }
