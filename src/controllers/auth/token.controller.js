import { sign, verify } from 'jsonwebtoken'
import { Auth } from '../../models/auth.model'
import moment from 'moment'
import { AuthController } from './auth.controller'

export class TokenController {
  static createToken({ _id: id, name, lastName, email }) {
    const user = { id, name, lastName, email }
    const token = sign(user, process.env.JWT_KEY)

    return {
      token,
      payload: Buffer.from(JSON.stringify(user)).toString('base64')
    }
  }

  static validateToken(token) {
    return verify(token, process.env.JWT_KEY)
  }

  static async validateMeliToken(userId) {
    const authData = await Auth.findOne({ userId })
    const isTokenExpired = moment(authData.expireDate).isBefore(moment())

    if (isTokenExpired) {
      return await AuthController.renewMeliToken(authData.meliRefreshToken)
    }
    return true
  }
}
