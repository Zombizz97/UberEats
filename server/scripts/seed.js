import mongoose from 'mongoose'
import productsData from '../../src/data/products.json' with { type: 'json' }
import restaurantsData from '../../src/data/restaurants.json' with { type: 'json' }
// eslint-disable-next-line sort-imports
import { Product } from '../src/models/Product.js'
import { Restaurant } from '../src/models/Restaurant.js'
// eslint-disable-next-line sort-imports
import 'dotenv/config'

// eslint-disable-next-line func-style,max-statements,max-lines-per-function
async function main () {
    // eslint-disable-next-line no-undef
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vuetify_project'
  await mongoose.connect(mongoUri)

  await Restaurant.deleteMany({})
  await Product.deleteMany({})

    // eslint-disable-next-line one-var
  const restDocs = await Restaurant.insertMany(
    (restaurantsData.restaurants || []).map(res => ({
        categories: res.categories,
        deliveryFee: res.deliveryFee,
        eta: res.eta,
      extId: res.id,
        featured: res.featured || false,
        image: res.image,
      name: res.name,
      rating: res.rating,
    })),
  ),

      // eslint-disable-next-line sort-vars,id-length
   byExtId = new Map(restDocs.map(d => [d.extId, d])),
      // eslint-disable-next-line sort-vars
   map = productsData.productsByRestaurant || {},
      // eslint-disable-next-line sort-vars
   productDocs = []
  for (const [restExtId, arr] of Object.entries(map)) {
    const rest = byExtId.get(restExtId)
    if (!rest) {
        // eslint-disable-next-line no-continue
      continue
    }
      // eslint-disable-next-line id-length
    for (const p of arr) {
      productDocs.push({
          // eslint-disable-next-line no-underscore-dangle
        restaurant: rest._id,
          // eslint-disable-next-line sort-keys
        extId: p.id,
        name: p.name,
          // eslint-disable-next-line sort-keys
        description: p.description,
        price: p.price,
          // eslint-disable-next-line sort-keys
        image: p.image,
      })
    }
  }
    // eslint-disable-next-line no-magic-numbers
  if (productDocs.length > 0) {
    await Product.insertMany(productDocs)
  }

  await mongoose.disconnect()
}
