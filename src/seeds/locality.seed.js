import { Province } from '../models/province.model'
import { Locality } from '../models/locality.model'
import provincesData from './data/provincias-localidades-arg.json'

export const seedLocalities = async () => {
  await Locality.deleteMany()
  const provinces = await Province.find()
  const localities = []

  for (const { _id, name } of provinces) {
    const province = provincesData.filter(
      province => province.nombre === name
    )[0]

    for (const { nombre } of province.ciudades) {
      const locality = {
        name: nombre,
        provinceId: _id
      }

      localities.push(locality)
    }
  }

  await Locality.insertMany(localities)
}
