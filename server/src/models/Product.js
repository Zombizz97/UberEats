import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', index: true },
  extId: { type: String, index: true },
  name: String,
  description: String,
  price: Number,
  image: String,
}, { timestamps: true })

export const Product = mongoose.model('Product', ProductSchema)
