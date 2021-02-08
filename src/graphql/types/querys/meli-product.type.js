export const meliProduct = `
  type MeliProduct {
    site_id: String
    totalPages: Int
    actualPage: Int
    query: String
    paging: PagingType
    results: [ResultsType]
    sort: IdNameType
    available_sorts: [IdNameType]
    filters: [FilterType]
    available_filters: [FilterType]
  }

  # Primary Childrens

  type PagingType {
    total: Int
    offset: Int
    limit: Int
    primary_results: Int
  }

  type ResultsType {
    id: String
    site_id: String
    title: String
    seller: SellerType
    price: Float
    currency_id: String
    available_quantity: Int
    sold_quantity: Int
    buying_mode: String
    listing_type_id: String
    stop_time: String
    condition: String
    permalink: String
    thumbnail: String
    accepts_mercadopago: Boolean
    installments: InstallmentsType
    address: AddressType
    shipping: Shipping
    seller_address: SellerAddress
    attributes: [Attributes]
    original_price: String
    category_id: String
    official_store_id: String
    catalog_product_id: String
    tags: [String]
    catalog_listing: Boolean
  }

  type IdNameType {
    id: String
    name: String
  }

  # Secondary Childrens
  type SellerType {
    id: String
    permalink: String
    power_seller_status: String
    car_dealer: Boolean
    real_estate_agency: Boolean
    tags: [String]
  }

  type InstallmentsType {
    quantity: Int
    amount: Float
    rate: Float
    currency_id: String
  }

  type AddressType {
    state_id: String
    state_name: String
    city_id: String
    city_name: String
  }

  type SellerAddress {
    id: String
    comment: String
    address_line: String
    zip_code: String
    country: IdNameType
    state: IdNameType
    city: IdNameType
    latitude: String
    longitude: String
  }

  type Attributes {
    id: String
    name: String
    values: [ValueType]
    source: String
    value_id: String
    value_name: String
    value_struct: ValueStruct
    attribute_group_id: String
    attribute_group_name: String
  }

  type ValueType {
    id: String
    name: String
    struct: ValueStruct
    source: String
  }

  type FilterType {
    id: String
    name: String
    type: String
    values: [ValueFilterType]
  }

  type ValueFilterType {
    id: String
    name: String
    path_from_root: [PathRooth]
    results: Int
  }

  type PathRooth {
    id: String
    name: String
  }
`
