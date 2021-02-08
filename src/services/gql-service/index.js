import Mongo from '../mongo-service'
import { pubsub } from '../../index'
import { withFilter } from 'apollo-server-express'

class Gql {
  checkUserLogged(ctx, id) {
    this.checkUserLoggedFn = () => {
      if (!id) {
        return false
      }
      if (ctx.user.id === id.toString()) {
        return true
      } else {
        return false
      }
    }
  }

  joi(fn) {
    this.joiFn = fn
  }

  verify(fn) {
    this.verifyFn = fn
  }

  withAfterMutation() {
    this.withAfterMutationDec = true
  }

  afterMutation(fn) {
    this.afterMutationFn = fn
  }

  async audit() {
    if (this.checkUserLoggedFn) {
      try {
        if (!this.checkUserLoggedFn()) {
          if (
            process.env.DEVELOPMENT === 'false' ||
            process.env.NEED_AUTH === 'true'
          ) {
            return {
              success: false,
              message: ['Usuario no autorizado a realizar esta petición']
            }
          }
        }
      } catch (error) {
        console.log(error)
        if (Array.isArray(error)) {
          throw error.concat(['No se pudo verificar la autenticación'])
        } else {
          throw ['No se pudo verificar la autenticación']
        }
      }
    }

    if (this.joiFn) {
      const result = this.joiFn()
      if (result.error) {
        return { success: false, message: [result.error.details[0].message] }
      }
    }

    if (this.verifyFn) {
      try {
        const result = await Mongo.read(this.verifyFn)
        if (typeof result !== 'boolean') {
          return { success: false, message: result }
        }
      } catch (error) {
        console.log(error)
        if (Array.isArray(error)) {
          throw error.concat(['No se pudo realizar verificación'])
        } else {
          throw ['No se pudo realizar verificación']
        }
      }
    }

    return true
  }

  async mutation(fn) {
    try {
      const result = await this.audit()
      if (typeof result !== 'boolean') {
        return result
      }

      if (this.withAfterMutationDec) {
        const result = await Mongo.write(fn)
        this.afterMutationFn()
        return result
      }

      return await Mongo.write(fn)
    } catch (error) {
      console.log(error)
      if (Array.isArray(error)) {
        throw error.concat(['No se pudo ejecutar la acción'])
      } else {
        throw ['No se pudo ejecutar la acción']
      }
    }
  }

  async mutationCustom(fn) {
    try {
      const result = await this.audit()
      if (typeof result !== 'boolean') {
        return result
      }

      if (this.withAfterMutationDec) {
        const result = await Mongo.writeCustom(fn)
        this.afterMutationFn()
        return result
      }

      return await Mongo.writeCustom(fn)
    } catch (error) {
      console.log(error)
      if (Array.isArray(error)) {
        throw error.concat(['No se pudo ejecutar la acción'])
      } else {
        throw ['No se pudo ejecutar la acción']
      }
    }
  }

  query(fn) {
    try {
      return Mongo.read(fn)
    } catch (error) {
      console.log(error)
      if (Array.isArray(error)) {
        throw error.concat(['No se pudo devolver la consulta'])
      } else {
        throw ['No se pudo devolver la consulta']
      }
    }
  }

  subscription(array) {
    return { subscribe: () => pubsub.asyncIterator(array) }
  }

  subscriptionWithFilter(array, filter) {
    return {
      subscribe: withFilter(() => pubsub.asyncIterator(array), filter)
    }
  }
}

export default Gql
