import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Mongo from './services/mongo-service'
import authRoutes from './routes/auth.routes'
import dbSeedRoutes from './routes/db-seed.router'

dotenv.config()

const app = express()
app.use(cors())
app.use(authRoutes)

if (process.env.ENVIRONMENT === 'localhost') app.use(dbSeedRoutes)
Mongo.connect()

export { app }
