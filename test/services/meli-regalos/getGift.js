import Mongo from '../../../src/services/mongo-service'
import { Gift } from '../../../src/models/gift.model'

export class getGift {
  static async ById(id) {
    try {
      const theGift = await Mongo.read(() => {
        return Gift.findById(id)
      })
      return theGift
    } catch (error) {
      throw new Error(error)
    }
  }
}
