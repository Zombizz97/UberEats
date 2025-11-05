import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    createdAt: { default: Date.now, type: Date },
  email: { required: true, type: String, unique: true },
    password: { required: true, type: String},
  username: { minlength: 3, required: true, type: String, unique: true },
})

export default mongoose.model('User', UserSchema)
