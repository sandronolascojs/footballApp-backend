import { Router } from 'express'
import { createMatch, getAllMatchs, getMatchById } from '../controllers/matchs.controllers'
import { checkToken } from '../middlewares/checkToken.middlewares'
import { verifyAdmin } from '../middlewares/verifyAdmin.middlewares'

const router = Router()

router.get('/', getAllMatchs)
router.get('/:id', getMatchById)
router.post('/', checkToken, verifyAdmin, createMatch)

export default router
