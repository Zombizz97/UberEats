import { Router } from 'express'
// eslint-disable-next-line sort-imports
import { Product } from '../models/Product.js'

// eslint-disable-next-line new-cap
const router = Router()

// GET /api/products?restaurantId=...
router.get('/', async (req, res, next) => {
  try {
    const { restaurantId } = req.query,
        // eslint-disable-next-line no-ternary
     query = restaurantId ? { restaurant: restaurantId } : {},
        // eslint-disable-next-line sort-vars
     docs = await Product.find(element => query(element)).lean()
    res.json(docs)
  } catch (error) {
    next(error)
  }
})

export default router
