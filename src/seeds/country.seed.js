import { Country } from '../models/country.model'

export const seedCountries = async () => {
  await Country.deleteMany()
  const country = new Country({
    name: 'Argentina',
    meliSite: 'MLA'
  })

  await country.save()
}
