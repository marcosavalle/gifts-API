export const getAllMeliProducts = `

query getAllMeliProducts ($input: MeliProductInput) {
    getAllMeliProducts (input: $input) {
        site_id
        totalPages
        actualPage
        query
        paging {
            total
            offset
            limit
            primary_results
        }
        results {
            id
            site_id
            title
            seller {
                id
                permalink
                power_seller_status
                car_dealer
                real_estate_agency
                tags
            }
            price
            currency_id
            available_quantity
            sold_quantity
            buying_mode
            listing_type_id
            stop_time
            condition
            permalink
            thumbnail
            accepts_mercadopago
            installments {
                quantity
                amount
                rate
                currency_id
            }
            address {
                state_id
                state_name
                city_id
                city_name
            }
            shipping {
                mode
                tags
                dimensions
                free_shipping
                local_pick_up
                logistic_type
                store_pick_up
            }
            seller_address {
                id
                comment
                address_line
                zip_code
                latitude
                longitude
            }
            attributes {
                id
                name
                source
                value_id
                value_name
                attribute_group_id
                attribute_group_name
            }
            original_price
            category_id
            official_store_id
            catalog_product_id
            tags
            catalog_listing
        }
        sort {
            id
            name
        }
        available_sorts {
            id
            name
        }
        filters {
            id
            name
            type
            values {
                id
                name
                results
            }
        }
        available_filters {
            id
            name
            type
            values {
                id
                name
                results
            }
        }
    }
}
  `
