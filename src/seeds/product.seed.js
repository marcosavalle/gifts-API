import { Product } from '../models/product.model'
import products from './data/products.json'

export const seedProducts = async auth => {
  await Product.deleteMany()
  const productsList = []

  for (const product of products) {
    const pictures = product.pictures.map(p => p.url)
    const attributes = product.attributes.map(a => {
      return {
        meliId: a.id,
        name: a.name,
        meliValueId: a.value_id,
        valueName: a.value_name
      }
    })

    let variations = []

    if (product.variations.length) {
      variations = product.variations[0].attribute_combinations.map(v => {
        return {
          meliId: v.id,
          name: v.name,
          meliValueId: v.value_id,
          valueName: v.value_name
        }
      })
    }

    const p = {
      title: product.title,
      price: product.price,
      meliSellerId: product.seller_id,
      pictures,
      meliCategoryId: product.category_id,
      meliProductId: product.id,
      warranty: product.warranty,
      attributes,
      variations
    }

    productsList.push(p)
  }

  await Product.insertMany(productsList)
}
