import { TokenController } from '../controllers/auth/token.controller'
import { Auth } from '../models/auth.model'
import { AuthenticationError } from 'apollo-server-express'

export const authMiddleware = async req => {
  try {
    const token = req.headers.authorization || ''
    const user = TokenController.validateToken(token.split(' ')[1])
    await TokenController.validateMeliToken(user.id)
    const auth = await Auth.findOne({ userId: user.id })

    return { user, auth }
  } catch (error) {
    throw new AuthenticationError('You must be logged in')
  }
}
