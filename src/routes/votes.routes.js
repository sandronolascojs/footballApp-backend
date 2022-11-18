import { Router } from 'express'
import { getAllVotes, createVote, getVotesByMatch } from '../controllers/votes.controllers'
import { checkToken } from '../middlewares/checkToken.middlewares'

const router = Router()

router.get('/', getAllVotes)
router.get('/match/:id', getVotesByMatch)
router.post('/', checkToken, createVote)

export default router
