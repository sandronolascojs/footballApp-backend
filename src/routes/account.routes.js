import { Router } from 'express'
import { verifyEmail } from '../controllers/account.controllers'

const router = Router()

router.post('/verify', verifyEmail)

export default router
