import { Address } from '../../../../models/address.model'
import { Locality } from '../../../../models/locality.model'
import { Province } from '../../../../models/province.model'
import { Country } from '../../../../models/country.model'

export const address = async ({ id }, args, ctx, info) => {
  const dbAddresses = await Address.find({ userId: id }, '-status').lean()

  return dbAddresses.map(async dbAddress => {
    const {
      _id,
      street,
      number,
      apt,
      description,
      postalCode,
      name,
      localityId,
      failedDeliveries,
      contactPhone,
      userId
    } = dbAddress

    const dbLocality = await Locality.findById(localityId).lean()

    const dbProvince = await Province.findById(dbLocality.provinceId).lean()

    const dbCountry = await Country.findById(dbProvince.countryId).lean()

    const locality = dbLocality?.name || null
    const province = dbProvince?.name || null
    const country = dbCountry?.name || null

    const address = {
      id: _id,
      street,
      number,
      apt,
      description,
      postalCode,
      locality: locality,
      province: province,
      country: country,
      name,
      failedDeliveries,
      contactPhone,
      user: userId
    }

    return address
  })
}
