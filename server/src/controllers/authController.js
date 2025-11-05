import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// eslint-disable-next-line sort-imports
import User from '../models/User.js'

// eslint-disable-next-line func-style,consistent-return
export async function register (req, res) {
  try {
    const { email, username, password } = req.body
    if (!email || !password || !username) {
        // eslint-disable-next-line no-magic-numbers
      return res.status(400).json({ message: 'Missing fields' })
    }
      // eslint-disable-next-line one-var
    const exists = await User.findOne({ email })
    if (exists) {
        // eslint-disable-next-line no-magic-numbers
      return res.status(400).json({ message: 'Email already used' })
    }
      // eslint-disable-next-line one-var,no-magic-numbers
    const hashed = await bcrypt.hash(password, 10),
        // eslint-disable-next-line sort-keys
     user = await User.create({ email, username, password: hashed }),
        // eslint-disable-next-line sort-vars,no-underscore-dangle,no-undef
     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      // eslint-disable-next-line no-underscore-dangle,no-magic-numbers,sort-keys
    res.status(201).json({ token, user: { id: user._id, email: user.email, username: user.username, avatar: user.avatar } })
  } catch (error) {
      // eslint-disable-next-line no-magic-numbers
    res.status(500).json({ message: error.message })
  }
}

// eslint-disable-next-line func-style,max-statements,consistent-return
export async function login (req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
        // eslint-disable-next-line no-magic-numbers
      return res.status(400).json({ message: 'Missing fields' })
    }
      // eslint-disable-next-line one-var
    const user = await User.findOne({ email })
    if (!user) {
        // eslint-disable-next-line no-magic-numbers
      return res.status(401).json({ message: 'Invalid credentials' })
    }
      // eslint-disable-next-line one-var
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
        // eslint-disable-next-line no-magic-numbers
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    user.status = 'online'
    await user.save()
      // eslint-disable-next-line one-var,no-underscore-dangle,no-undef
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      // eslint-disable-next-line no-underscore-dangle,sort-keys
    res.json({ token, user: { id: user._id, email: user.email, username: user.username, avatar: user.avatar } })
  } catch (error) {
      // eslint-disable-next-line no-magic-numbers
    res.status(500).json({ message: error.message })
  }
}

// eslint-disable-next-line func-style,consistent-return
export async function logout (req, res) {
  try {
    const user = await User.findById(req.body.userId)
    if (!user) {
        // eslint-disable-next-line no-magic-numbers
      return res.status(404).json({ message: 'User not found' })
    }
    user.status = 'offline'
    user.lastSeen = new Date()
    await user.save()
    res.json({ message: 'Logged out' })
  } catch (error) {
      // eslint-disable-next-line no-magic-numbers
    res.status(500).json({ message: error.message })
  }
}
