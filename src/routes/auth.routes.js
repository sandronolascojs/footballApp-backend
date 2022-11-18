import { Router } from 'express'
import { signIn, signUp } from '../controllers/auth.controllers'

const router = Router()

router.post('/login', signIn)
router.post('/', signUp)

export default router
