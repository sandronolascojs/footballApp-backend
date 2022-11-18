import express from 'express'
import cors from 'cors'

// Routes import
import usersRoutes from './routes/users.routes'
import AccountRoutes from './routes/account.routes'
import authRoutes from './routes/auth.routes'
import groupsRoutes from './routes/groups.routes'
import teamsRoutes from './routes/teams.routes'
import matchsRoutes from './routes/matchs.routes'
import votesRoutes from './routes/votes.routes'

// Middlewares Handler
import { errorHandler } from './middlewares/errorHandler.middlewares'

// app is an instance of express
const app = express()

// App middlewares
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

// Routes API
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/account', AccountRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/groups', groupsRoutes)
app.use('/api/v1/teams', teamsRoutes)
app.use('/api/v1/matchs', matchsRoutes)
app.use('/api/v1/votes', votesRoutes)

errorHandler()

export default app
