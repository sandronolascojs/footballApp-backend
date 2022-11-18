import { Router } from 'express'
import { createGroup, deleteGroup, getAllGroups, getGroupById } from '../controllers/groups.controllers'
import { checkToken } from '../middlewares/checkToken.middlewares'
import { verifyAdmin } from '../middlewares/verifyAdmin.middlewares'

const router = Router()

router.post('/', checkToken, verifyAdmin, createGroup)
router.get('/', getAllGroups)
router.get('/:id', getGroupById)
router.delete('/:id', checkToken, verifyAdmin, deleteGroup)
router.put('/:id')

export default router
