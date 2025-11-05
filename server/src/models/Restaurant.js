import mongoose from 'mongoose'

const RestaurantSchema = new mongoose.Schema({
    categories: [String],
    deliveryFee: Number,
    eta: String,
  extId: { index: true, type: String, },
    featured: Boolean,
    image: String,
  name: String,
  rating: Number,
}, { timestamps: true })

// eslint-disable-next-line one-var
export const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
