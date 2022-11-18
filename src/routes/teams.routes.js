import { Router } from 'express'
import { getAllTeams, getTeamById, createTeam, deleteTeam, updateTeam } from '../controllers/teams.controllers'
import { checkToken } from '../middlewares/checkToken.middlewares'
import { verifyAdmin } from '../middlewares/verifyAdmin.middlewares'

const router = Router()

router.get('/', getAllTeams)
router.get('/:id', getTeamById)
router.post('/', checkToken, verifyAdmin, createTeam)
router.put('/:id', checkToken, verifyAdmin, updateTeam)
router.delete('/:id', checkToken, verifyAdmin, deleteTeam)

export default router
