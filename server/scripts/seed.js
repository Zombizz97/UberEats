import mongoose from 'mongoose'
import productsData from '../../src/data/products.json' with { type: 'json' }
import restaurantsData from '../../src/data/restaurants.json' with { type: 'json' }
import { Product } from '../src/models/Product.js'
import { Restaurant } from '../src/models/Restaurant.js'
import 'dotenv/config'

async function main () {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vuetify_project'
  await mongoose.connect(mongoUri)

  await Restaurant.deleteMany({})
  await Product.deleteMany({})

  const restDocs = await Restaurant.insertMany(
    (restaurantsData.restaurants || []).map(r => ({
      extId: r.id,
      name: r.name,
      categories: r.categories,
      image: r.image,
      rating: r.rating,
      deliveryFee: r.deliveryFee,
      eta: r.eta,
      featured: r.featured || false,
    })),
  ),

   byExtId = new Map(restDocs.map(d => [d.extId, d])),
   map = productsData.productsByRestaurant || {},
   productDocs = []
  for (const [restExtId, arr] of Object.entries(map)) {
    const rest = byExtId.get(restExtId)
    if (!rest) {
      continue
    }
    for (const p of arr) {
      productDocs.push({
        restaurant: rest._id,
        extId: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
      })
    }
  }
  if (productDocs.length > 0) {
    await Product.insertMany(productDocs)
  }

  console.log(`Seed done: restaurants=${restDocs.length}, products=${productDocs.length}`)
  await mongoose.disconnect()
}

main().catch(error => {
  console.error(error)
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1)
})
