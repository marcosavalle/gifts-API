import { service } from '../services/service'
import { getAllMeliProducts } from '../constants/queries/getAllMeliProducts'
import {
  getAllMeliCategories,
  variableGetAllMeliCategories
} from '../constants/queries/getAllMeliCategories'

export class getMeli {
  static async RandomCategories(nCategories) {
    let categoriesOld
    const categoryArray = []
    try {
      categoriesOld = await service.POST(
        getAllMeliCategories,
        variableGetAllMeliCategories
      )
      categoriesOld = categoriesOld.data.data.getAllMeliCategories
      for (const category of categoriesOld) {
        categoryArray.push({
          meliId: category.meliId,
          name: category.name
        })
      }
      for (let index = 0; index < categoriesOld.length - nCategories; index++) {
        const index = [Math.floor(Math.random() * categoryArray.length)]
        categoryArray.splice(index, 1)
      }
      return categoryArray
    } catch (error) {
      if (error.response) return console.log(error.response.data)
    }
  }

  static async RandomProducts(maxAmount) {
    try {
      let products
      const productArray = []
      const q = ['amd', 'mouse', 'samsung']
      for (let i = 0; i < 3; i++) {
        products = await service.POST(getAllMeliProducts, {
          input: {
            site: 'MLA',
            maxAmount: maxAmount,
            page: 1,
            filters: [
              {
                filter: 'q',
                value: q[i]
              }
            ]
          }
        })
        products = products.data.data.getAllMeliProducts
        let amount = maxAmount
        const product = products.results[Math.floor(Math.random() * 10)]
        if (product.price < amount) {
          amount -= product.price
          productArray.push({
            meliId: product.id,
            name: product.title,
            price: product.price,
            picture: product.thumbnail,
            meliCategoryId: product.category_id
          })
        }
      }

      let cont = 0
      products.filters.forEach(filter => {
        if (
          filter.id === 'accepts_mercadopago' &&
          filter.values[0].id === 'yes'
        ) {
          cont++
        } else if (
          filter.id === 'ITEM_CONDITION' &&
          filter.values[0].id === '2230284'
        ) {
          cont++
        }
      })

      expect(cont, 'Fallo RandomMeliProducts ! [ERROR]').to.be.equal(2)

      return productArray
    } catch (error) {
      if (error.response) return console.log(error.response.data)
    }
  }
}
