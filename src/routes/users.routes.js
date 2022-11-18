import { Router } from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/users.controllers'
import { checkToken } from '../middlewares/checkToken.middlewares'
import { verifyAdmin } from '../middlewares/verifyAdmin.middlewares'

const router = Router()

router.get('/', checkToken, verifyAdmin, getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', checkToken, updateUser)
router.delete('/:id', checkToken, deleteUser)

export default router
