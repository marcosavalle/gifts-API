import Mongo from '../../../src/services/mongo-service'
import { Gift } from '../../../src/models/gift.model'
import { status as statuses } from '../../../src/constants/status'
export class status {
  static async IsInProgress(id) {
    let theGift
    try {
      theGift = await Mongo.read(() => {
        return Gift.findById(id)
      })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
    const response = await theGift.isInProgress()
    return response
  }

  static async IsPending(id) {
    let theGift
    try {
      theGift = await Mongo.read(() => {
        return Gift.findById(id)
      })
    } catch (error) {
      throw new Error(error)
    }
    const response = await theGift.isPending()
    return response
  }

  static async IsActive(id) {
    let theGift
    try {
      theGift = await Mongo.read(() => {
        return Gift.findById(id)
      })
    } catch (error) {
      throw new Error(error)
    }
    const response = await theGift.isActive()
    return response
  }

  static async IsCancelled(id) {
    let theGift
    try {
      theGift = await Mongo.read(() => {
        return Gift.findById(id)
      })
    } catch (error) {
      throw new Error(error)
    }
    const response = await theGift.isCancelled()
    return response
  }

  static async ToInProgress(id) {
    try {
      await Gift.findByIdAndUpdate(
        id,
        { status: { main: statuses.inProgress } },
        { new: true }
      )
    } catch (error) {
      throw new Error(error)
    }
  }

  static async ToPending(id) {
    try {
      await Gift.findByIdAndUpdate(
        id,
        { status: { main: statuses.pending } },
        { new: true }
      )
    } catch (error) {
      throw new Error(error)
    }
  }

  static async ToActive(id) {
    try {
      await Gift.findByIdAndUpdate(
        id,
        { status: { main: statuses.active } },
        { new: true }
      )
    } catch (error) {
      throw new Error(error)
    }
  }
}
