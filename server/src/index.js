import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import restaurantsRouter from './routes/restaurants.js'
import 'dotenv/config'

const app = express()

app.use(helmet())
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('dev'))

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vuetify_project'
await mongoose.connect(mongoUri)

app.get('/health', (req, res) => res.json({ ok: true }))
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
