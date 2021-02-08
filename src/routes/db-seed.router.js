import { Router } from 'express'
import { User } from '../models/user.model'
import { TokenController } from '../controllers/auth/token.controller'
import { seedUsers } from '../seeds/user.seed'
import { seedAuth } from '../seeds/auth.seed'
import { seedLogins } from '../seeds/login.seed'
import { seedCountries } from '../seeds/country.seed'
import { seedProvinces } from '../seeds/province.seed'
import { seedLocalities } from '../seeds/locality.seed'
import { seedAddresses } from '../seeds/address.seed'
import { seedStatus } from '../seeds/status.seed'
import { seedGiftReasons } from '../seeds/gift-reason.seed'
import { seedGiftTypes } from '../seeds/gift-type.seed'
import { seedGifts } from '../seeds/gift.seed'
import { seedProducts } from '../seeds/product.seed'
import { seedProductsChosen } from '../seeds/product-chosen.seed'
import { seedProductsFilter } from '../seeds/product-filter.seed'
import { seedStatusChanges } from '../seeds/status-change.seed'
import { deleteAll } from '../seeds/delete-all.seed'
import { deleteNotAll } from '../seeds/delete-not-all.seed'
import { seedUserLogged } from '../seeds/seedUserLogged'

const router = Router()

router.get('/totalseed', async (req, res) => {
  await seedUsers(100)
  await seedAuth()
  await seedLogins()
  await seedCountries()
  await seedProvinces()
  await seedLocalities()
  await seedAddresses()
  await seedStatus()
  await seedGiftReasons()
  await seedGiftTypes()
  await seedGifts(100)
  await seedProducts()
  await seedProductsChosen()
  await seedProductsFilter()
  await seedStatusChanges()

  res.json({ message: 'Your database was seeded.' })
})

router.get('/prodSeed', async (req, res) => {
  await deleteAll()
  await seedCountries()
  await seedProvinces()
  await seedLocalities()
  await seedStatus()
  await seedGiftReasons()
  await seedGiftTypes()
  res.json({ message: 'Your database was seeded.' })
})

router.get('/testSeed', async (req, res) => {
  await deleteNotAll()
  await seedCountries()
  await seedProvinces()
  await seedLocalities()
  await seedStatus()
  await seedGiftReasons()
  await seedGiftTypes()
  res.json({
    message: 'Your database was seeded. Your test users still in the DB.'
  })
})

router.post('/logguedSeed', async (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    res.json({
      status: 403,
      message: 'Forbidden'
    })
    return
  }

  const { id } = TokenController.validateToken(token.split(' ')[1])
  const user = await User.findById(id).lean()

  if (!user) {
    res.json({
      status: 403,
      message: 'Forbidden'
    })
    return
  }

  const q = req.query.q

  if (!q) {
    res.json({
      status: 401,
      message: 'Bad Request'
    })
    return
  }

  await deleteNotAll()
  await seedCountries()
  await seedProvinces()
  await seedLocalities()
  await seedStatus()
  await seedGiftReasons()
  await seedGiftTypes()

  await seedUserLogged(user, q)

  res.json({
    message: 'Your database was seeded. Your test users still in the DB.'
  })
})

export default router
