import mongoose from 'mongoose'

const RestaurantSchema = new mongoose.Schema({
  extId: { type: String, index: true },
  name: String,
  categories: [String],
  image: String,
  rating: Number,
  deliveryFee: Number,
  eta: String,
  featured: Boolean,
}, { timestamps: true })

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
