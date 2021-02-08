import { Address } from '../../../models/address.model'
import { Locality } from '../../../models/locality.model'
import { Province } from '../../../models/province.model'
import { Country } from '../../../models/country.model'

export const getAddressById = async (
  parent,
  { id },
  { user: ctxUser },
  info
) => {
  const dbAddress = await Address.findById(id, '-statusId').lean()

  const {
    street,
    number,
    apt,
    description,
    postalCode,
    name,
    localityId,
    failedDeliveries,
    contactPhone,
    userId: user
  } = dbAddress

  const dbLocality = await Locality.findById(localityId).lean()
  const dbProvince = await Province.findById(dbLocality.provinceId).lean()
  const dbCountry = await Country.findById(dbProvince.countryId).lean()

  return {
    id,
    street,
    number,
    apt,
    description,
    postalCode,
    locality: dbLocality.name,
    province: dbProvince.name,
    country: dbCountry.name,
    name,
    failedDeliveries,
    contactPhone,
    user
  }
}
