import express from 'express'
// eslint-disable-next-line sort-imports
import { login, logout, register } from '../controllers/authController.js'
// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router
