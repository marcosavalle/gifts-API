import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const getDateString = () => {
  const dt = new Date()
  return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${dt
    .getFullYear()
    .toString()
    .padStart(4, '0')} ${dt
    .getHours()
    .toString()
    .padStart(2, '0')}:${dt
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${dt
    .getSeconds()
    .toString()
    .padStart(2, '0')}: => Error de conexión: `
}

export default class Mongo {
  static async connect() {
    const connStr = process.env.MELI_REGALOS_API_MDB.toString()
    const connOpt = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }

    try {
      await this.disconnect()
      await mongoose.connect(connStr, connOpt)
      mongoose.connection.on('error', err => {
        throw err
      })
    } catch (e) {
      if (e.message) {
        console.log(getDateString() + e.message)
        throw ['Error de conexión']
      } else {
        console.log(getDateString() + e)
        throw ['Error de conexión']
      }
    }
  }

  static async disconnect() {
    try {
      await mongoose.connection.close()
    } catch (error) {
      console.log(error)
      if (Array.isArray(error)) {
        throw error.concat(['Error al desconectar'])
      } else {
        throw ['Error al desconectar']
      }
    }
  }

  static async init() {
    if (mongoose.connection._readyState !== 1) {
      await this.connect()
    }
    try {
      if (mongoose.connection._readyState === 1) {
        const conn = mongoose.connection
        const sess = await conn.startSession()
        return sess
      } else {
        await this.connect()
        const conn = mongoose.connection
        const sess = await conn.startSession()
        return sess
      }
    } catch (e) {
      if (Array.isArray(e)) {
        throw e.concat(['Error al iniciar sesion de transacción'])
      } else {
        if (e.message) {
          console.log(getDateString() + e.message)
          throw ['Error al iniciar sesion de transacción']
        } else {
          console.log(getDateString() + e)
          throw ['Error al iniciar sesion de transacción']
        }
      }
    }
  }

  static async success(sess) {
    try {
      await sess.endSession()
    } catch (e) {
      console.error(e)
      throw ['Error al cerrar transacción exitosa']
    }
  }

  static async rollback(sess) {
    try {
      await sess.endSession()
    } catch (e) {
      console.error(e)
      if (Array.isArray(e)) {
        throw e.concat(['Error al cerrar transacción fallida'])
      } else {
        throw ['Error al cerrar transacción fallida']
      }
    }
  }

  static read(fn) {
    try {
      try {
        return fn()
      } catch (error) {
        console.log(error)
        if (Array.isArray(error)) {
          throw error.concat(['Error en operación de lectura'])
        } else {
          throw ['Error en operación de lectura']
        }
      }
    } catch (error) {
      return error
    }
  }

  static async write(fn) {
    try {
      const sess = await this.init()
      try {
        let result
        await sess.withTransaction(async () => {
          result = await fn(sess)
        })
        await this.success(sess)
        return { success: true, message: result }
      } catch (error) {
        console.log(error)
        await this.rollback(sess)
        if (Array.isArray(error)) {
          throw error.concat(['Error en operación de escritura'])
        } else {
          throw ['Error en operación de escritura']
        }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  static async writeCustom(fn) {
    try {
      const sess = await this.init()
      try {
        let result
        await sess.withTransaction(async () => {
          result = await fn(sess)
        })
        await this.success(sess)
        return result
      } catch (error) {
        console.log(error)
        await this.rollback(sess)
        if (Array.isArray(error)) {
          throw error.concat(['Error en operación de escritura custom'])
        } else {
          throw ['Error en operación de escritura custom']
        }
      }
    } catch (error) {
      if (Array.isArray(error)) {
        throw error.concat(['Error en operación de escritura custom'])
      } else {
        throw ['Error en operación de escritura custom']
      }
    }
  }
}
