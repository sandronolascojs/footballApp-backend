import app from './app.js'
import { PORT } from './config/config.js'
import { dbConnection } from './database/mongoConnection.js'

const startServer = async () => {
  try {
    await dbConnection()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

startServer()
