import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function register (req, res) {
  try {
    const { email, username, password } = req.body
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Missing fields' })
    }
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Email already used' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ email, username, password: hashed })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.status(201).json({ token, user: { id: user._id, email: user.email, username: user.username, avatar: user.avatar } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function login (req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    user.status = 'online'
    await user.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token, user: { id: user._id, email: user.email, username: user.username, avatar: user.avatar } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function logout (req, res) {
  try {
    const user = await User.findById(req.body.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.status = 'offline'
    user.lastSeen = new Date()
    await user.save()
    res.json({ message: 'Logged out' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
