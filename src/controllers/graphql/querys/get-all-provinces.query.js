import { Province } from '../../../models/province.model'

export const getAllProvinces = async () => {
  const provinces = await Province.find().lean()

  return provinces.map(province => {
    return {
      id: province._id,
      name: province.name
    }
  })
}
