import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
// eslint-disable-next-line sort-imports
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import restaurantsRouter from './routes/restaurants.js'
// eslint-disable-next-line sort-imports
import 'dotenv/config'
import * as path from "node:path";

const app = express()

app.use(helmet())
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('dev'))

// eslint-disable-next-line one-var,no-undef
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vuetify_project'
await mongoose.connect(mongoUri)

app.get('/health', (req, res) => res.json({ ok: true }))
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)

// eslint-disable-next-line one-var,no-undef,no-magic-numbers
const port = process.env.PORT || 4000
// eslint-disable-next-line no-inline-comments
app.listen(port, () => { /* Empty */ })
