import { Locality } from '../../../models/locality.model'

export const getLocalitiesByProvinceId = async (
  parent,
  { provinceId },
  ctx,
  info
) => {
  const localities = await Locality.find({
    provinceId
  }).lean()

  return localities.map(locality => {
    return {
      id: locality._id,
      name: locality.name
    }
  })
}
