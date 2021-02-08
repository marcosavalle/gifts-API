export const meliProductDetails = `
 type MeliProductDetails{
     id: String
     site_id: String
     title: String
     subtitle: String
     seller_id: String
     category_id: String
     official_store_id: String
     price: Float
     base_price: Float
     original_price: Float
     currency_id: String
     initial_quantity: Int
     sold_quantity: Int
     sale_terms: [SaleTerms]
     buying_mode: String
     listing_type_id: String
     start_time: String
     stop_time: String
     condition: String
     permalink: String
     thumbnail: String
     secure_thumbnail: String
     pictures: [Pictures]
     video_id: String
     descriptions: [Descriptions]
     accepts_mercadopago: Boolean
     shipping: Shipping
     internacional_delivery_mode: String
     seller_address: SellerAddressDetail
     geolocation: Geolocation
     attributes: [Attributes]
     tags: [String]
     warranty: String
     variations: Variations
     catalog_product_id: String
     domain_id: String
     parent_item_id: String
     differential_pricing: String
     deal_ids:[String]
     automatic_relist: Boolean
     date_created: String
     last_updated: String
     health: Float
     catalog_listing: Boolean
 }

 type SaleTerms{
     id: String
     name: String
     value_id: String
     value_name: String
     value_struct: ValueStruct
 }

 type Pictures{
     id: String
     url: String
     secure_url: String
     size: String
     max_size: String
     quality: String
 }

 type Descriptions{
    id: String
    created: String
    plain_text: String
 }

 type Shipping{
     mode: String
     tags: [String]
     free_methods: [FreeMethods]
     dimensions: String
     free_shipping: Boolean
     local_pick_up: Boolean
     logistic_type: String
     store_pick_up: Boolean
 }

 type SellerAddressDetail{
     city: IdNameType
     state: IdNameType
     country: IdNameType
     search_location: SearchLocation
     latitude: Float
     longitud: Float
     id: String
 }

 type Geolocation{
     latitude: String
     longitude: String
 }

 type Variations{
     id: String
     price: Float
     attribute_combinations: [Attributes]
     available_quantity: Int,
     sol_quantity: Int,
     sale_terms: [String]
     picture_ids: [String]
     catalog_product_id: String
 }

 # Deepest 

 type ValueStruct{
     number: Float
     unit: String
 }

 type FreeMethods{
     id: String
     rule: Rule
 }

 type Rule{
     default: Boolean
     free_mode: String
     free_shipping_flag: Boolean
 }

 type SearchLocation{
     neighborhood: IdNameType
     city: IdNameType
     state: IdNameType
 }
`
