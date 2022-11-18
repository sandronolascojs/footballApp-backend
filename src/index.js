import app from './app'
import { NODE_ENV, PORT } from './config/config'
import { dbConnection } from './database/mongoConnection'

console.log(NODE_ENV)

console.log('Starting server...')

const startServer = async () => {
  try {
    await dbConnection()
    if (NODE_ENV === 'development') {
      console.log('NODE ENV:', NODE_ENV)
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

startServer()
