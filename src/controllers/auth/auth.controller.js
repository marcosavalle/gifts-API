import { AUTH_ENDPOINTS, AUTH_REDIRECTS } from '../../constants/auth'
import { AuthService } from '../../services/auth-service'
import { User } from '../../models/user.model'
import { TokenController } from './token.controller'

export class AuthController {
  static login(req, res) {
    res.redirect(
      `${AUTH_ENDPOINTS.GRANT_ACCESS}&client_id=${process.env.MELI_REGALOS_APP_ID}`
    )
  }

  static async authenticated(req, res) {
    const environment = process.env.ENVIRONMENT

    if (req.query.error)
      return res.redirect(`${AUTH_REDIRECTS[environment]}/notauthorized`)

    try {
      const authCode = req.query.code
      const { data: authData } = await AuthService.meliAuth(authCode)
      let user = await User.findOne({ meliId: authData.user_id })

      if (!user) {
        const { data: meliUserData } = await AuthService.meliGetUser(
          authData.access_token
        )
        user = await AuthService.createUser(meliUserData)
      }

      await AuthService.createOrUpdateAuth(authData, user._id)
      await AuthService.createLoginRegistry(user._id)

      const token = TokenController.createToken(user)

      res.redirect(
        `${AUTH_REDIRECTS[environment]}/?token=${token.token}&payload=${token.payload}`
      )
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async renewMeliToken(refreshToken) {
    try {
      const { data: authData } = await AuthService.meliRenewToken(refreshToken)
      const user = await User.findOne({ meliId: authData.user_id })

      await AuthService.createOrUpdateAuth(authData, user._id)
      return true
    } catch (error) {
      throw new Error(error)
    }
  }
}
