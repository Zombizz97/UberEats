import { Router } from 'express'
import { Product } from '../models/Product.js'

const router = Router()

// GET /api/products?restaurantId=...
router.get('/', async (req, res, next) => {
  try {
    const { restaurantId } = req.query
    const query = restaurantId ? { restaurant: restaurantId } : {}
    const docs = await Product.find(element => query(element)).lean()
    res.json(docs)
  } catch (error) {
    next(error)
  }
})

export default router
