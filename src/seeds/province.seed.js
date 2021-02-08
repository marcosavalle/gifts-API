import { Province } from '../models/province.model'
import provinces from './data/provincias-localidades-arg.json'
import { Country } from '../models/country.model'

export const seedProvinces = async () => {
  await Province.deleteMany()

  const country = await Country.findOne({ name: 'Argentina' })

  const result = provinces.map(async ({ nombre }) => {
    const province = new Province({
      name: nombre,
      countryId: country._id
    })

    await province.save()
  })

  await Promise.all(result)
}
