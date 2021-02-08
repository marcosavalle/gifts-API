import { service } from '../service'
import {
  createGiftStepOne,
  variablesCreateGiftStepOne
} from '../../constants/mutations/createGiftStepOne'
import { createGiftStepTwo } from '../../constants/mutations/createGiftStepTwo'
import { createGiftStepThree } from '../../constants/mutations/createGiftStepThree'
import { createGiftStepFour } from '../../constants/mutations/createGiftStepFour'

export class createGiftSteps {
  // Sin parametros es creacion default, con id es modificacion default
  static async StepOne(id) {
    let response, variable
    try {
      if (id) {
        variable = {
          input: {
            giftId: id,
            senderName: 'Marcos',
            receiverName: 'Fabiana'
          }
        }
      } else {
        variable = variablesCreateGiftStepOne
      }
      const data = await service.POST(createGiftStepOne, variable)

      response = data.data.data.createGiftStepOne

      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  static async StepOneCustom(input) {
    try {
      const data = await service.POST(createGiftStepOne, input)
      const response = data.data.data.createGiftStepOne
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  static async StepTwo(id, types, reasons, update) {
    let response, type, reason, data
    try {
      type = await types[Math.floor(Math.random() * types.length)]
      reason = await reasons[Math.floor(Math.random() * reasons.length)]
      if (update) {
        data = await service.POST(createGiftStepTwo, {
          input: {
            giftId: id,
            typeId: type._id,
            reasonId: reason._id,
            maxAmount: 80000
          }
        })
      } else {
        data = await service.POST(createGiftStepTwo, {
          input: {
            giftId: id,
            typeId: type._id,
            reasonId: reason._id,
            maxAmount: 95000
          }
        })
      }

      response = data.data.data.createGiftStepTwo

      return {
        giftId: id,
        success: response.success,
        message: response.message,
        type,
        reason
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  static async StepTwoCustom(input) {
    let response
    try {
      const data = await service.POST(createGiftStepTwo, input)
      response = data.data.data.createGiftStepTwo
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  static async StepThree(id, categoryArray, productArray, scenario) {
    let response, input
    switch (scenario) {
      case 'all':
        input = {
          input: {
            giftId: id,
            categories: categoryArray,
            products: productArray
          }
        }
        break
      case 'onlyProducts':
        input = {
          input: {
            giftId: id,
            products: productArray
          }
        }
        break
      case 'onlyCategories':
        input = {
          input: {
            giftId: id,
            categories: categoryArray
          }
        }
        break
    }

    try {
      const { data } = await service.POST(createGiftStepThree, input)

      response = data.data.createGiftStepThree
      return {
        giftId: id,
        success: response.success,
        message: response.message
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  static async StepThreeCustom(input) {
    try {
      const { data } = await service.POST(createGiftStepThree, input)
      const response = data.data.createGiftStepThree

      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  static async StepFour(id) {
    let response
    try {
      const data = await service.POST(createGiftStepFour, {
        input: {
          giftId: id
        }
      })
      response = data.data.data.createGiftStepFour
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
