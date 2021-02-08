import { Router } from 'express'
import { AuthController } from '../controllers/auth/auth.controller'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Hello! welcome to Mercadolibre Regalos API' })
})

router.get('/login', AuthController.login)

router.get('/authenticated', AuthController.authenticated)

export default router
