export const getMeliProductDetailsById = `query getMeliProductDetailsById ($id: ID) {
    getMeliProductDetailsById (id: $id) {
        id
        title
        seller_id
        category_id
        price
        permalink
        thumbnail
        secure_thumbnail
        pictures {
            id
            url
            secure_url
            size
            max_size
            quality
        }
        attributes {
            id
            name
            values {
                id
                name
                source
            }
        }
        tags
        warranty
        variations {
            id
            price
            attribute_combinations {
                id
                name
                source
                value_id
                value_name
                attribute_group_id
                attribute_group_name
            }
            available_quantity
            sol_quantity
            sale_terms
            picture_ids
            catalog_product_id
        }
        catalog_product_id
    }
}`
