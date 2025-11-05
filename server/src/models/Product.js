import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    description: String,
    // eslint-disable-next-line sort-keys
  extId: { type: String, index: true },
    image: String,
  name: String,
  price: Number,
    // eslint-disable-next-line sort-keys
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', index: true },
}, { timestamps: true })

// eslint-disable-next-line one-var
export const Product = mongoose.model('Product', ProductSchema)
