import Mongo from '../../../src/services/mongo-service'

import { service } from '../../services/service'
import { Locality } from '../../../src/models/locality.model'
import {
  createOrUpdateAddress,
  createOrUpdateAddressVariables
} from '../../constants/mutations/createOrUpdateAddress'
export class address {
  static async Create(localityId, localities) {
    try {
      localities = await Mongo.read(() => Locality.find())
      localityId = localities[2]._id
      createOrUpdateAddressVariables.input.localityId = localityId
      const { data } = await service.POST(
        createOrUpdateAddress,
        createOrUpdateAddressVariables
      )
      const response = data.data.createOrUpdateAddress
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
