import { Delivery } from '../../../../models/delivery.model'
import { Address } from '../../../../models/address.model'
import { Locality } from '../../../../models/locality.model'
import { Country } from '../../../../models/country.model'
import { Province } from '../../../../models/province.model'
import { Status } from '../../../../models/status.model'

export const deliveryAddress = async (parent, arg, ctx, info) => {
  const del = await Delivery.findById(parent.id, 'deliveryAddressId').lean()
  const addr = await Address.findById(del.deliveryAddressId).lean()
  const loc = await Locality.findById(addr.localityId).lean()
  const prov = await Province.findById(loc.provinceId).lean()
  const count = await Country.findById(prov.countryId).lean()
  const status = await Status.findById(addr.status.main).lean()
  return {
    id: addr._id,
    street: addr.street,
    number: addr.number,
    apt: addr.apt,
    description: addr.description,
    postalCode: addr.postalCode,
    locality: loc.name,
    name: addr.name,
    contactPhone: addr.contactPhone,
    country: count.name,
    province: prov.name,
    status: {
      id: status?._id || null,
      name: status?.name || null,
      isMain: status?.isMain || null
    }
  }
}
