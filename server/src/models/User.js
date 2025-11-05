import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', UserSchema)
