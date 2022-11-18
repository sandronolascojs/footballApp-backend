import { Router } from 'express'
import { verifyEmail } from '../controllers/account.controllers'

const router = Router()

router.get('/verify', verifyEmail)

export default router
