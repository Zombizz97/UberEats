import { Router } from 'express'
// eslint-disable-next-line sort-imports
import { Product } from '../models/Product.js'
import { Restaurant } from '../models/Restaurant.js'

// eslint-disable-next-line new-cap
const router = Router()

// GET /api/restaurants
router.get('/', async (req, res, next) => {
  try {
    const docs = await Restaurant.find().lean()
    res.json(docs)
  } catch (error) {
    next(error)
  }
})

// GET /api/restaurants/:id
// eslint-disable-next-line consistent-return
router.get('/:id', async (req, res, next) => {
  try {
    const doc = await Restaurant.findById(req.params.id).lean()
    if (!doc) {
        // eslint-disable-next-line no-magic-numbers
      return res.status(404).json({ error: 'Not found' })
    }
    res.json(doc)
  } catch (error) {
    next(error)
  }
})

// GET /api/restaurants/:id/products
router.get('/:id/products', async (req, res, next) => {
  try {
    const docs = await Product.find({ restaurant: req.params.id }).lean()
    res.json(docs)
  } catch (error) {
    next(error)
  }
})

export default router
