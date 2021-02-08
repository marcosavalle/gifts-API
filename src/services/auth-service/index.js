import moment from 'moment'
import axios from 'axios'
import { AUTH_ENDPOINTS } from '../../constants/auth'
import { User } from '../../models/user.model'
import { Auth } from '../../models/auth.model'
import { Login } from '../../models/login.model'

export class AuthService {
  static async meliAuth(authCode) {
    return await axios.post(
      `${AUTH_ENDPOINTS.AUTHENTICATED}&client_id=${process.env.MELI_REGALOS_APP_ID}&client_secret=${process.env.MELI_REGALOS_SECRET_KEY}&code=${authCode}&redirect_uri=${process.env.MELI_REGALOS_REDIRECT_AUTHENTICATED}`
    )
  }

  static async meliGetUser(authToken) {
    return await axios.get(
      `${AUTH_ENDPOINTS.USER_INFO}/me?access_token=${authToken}`
    )
  }

  static async meliRenewToken(refreshToken) {
    return await axios.post(
      `${AUTH_ENDPOINTS.REFRESH_TOKEN}&client_id=${process.env.MELI_REGALOS_APP_ID}&client_secret=${process.env.MELI_REGALOS_SECRET_KEY}&refresh_token=${refreshToken}`
    )
  }

  static async createUser(userData) {
    const {
      first_name: name,
      last_name: lastName,
      email,
      id: meliId,
      nickname: meliNickname
    } = userData

    const user = new User({
      name,
      lastName,
      email,
      meliId,
      meliNickname
    })

    return await user.save()
  }

  static async createOrUpdateAuth(
    {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn
    },
    userId
  ) {
    return await Auth.findOneAndUpdate(
      { userId },
      {
        userId,
        meliToken: accessToken,
        meliRefreshToken: refreshToken,
        expireDate: moment().add(expiresIn, 's').toString()
      },
      { upsert: true, new: true }
    )
  }

  static async createLoginRegistry(userId) {
    const login = new Login({
      userId,
      inDate: moment().toString()
    })

    return await login.save()
  }
}
