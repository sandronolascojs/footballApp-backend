import mongoose from 'mongoose'
import { MONGODB_URI } from '../config/config'

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to DB mongo')
  } catch (error) {
    console.log(error)
    throw new Error('Error connecting to DB')
  }
}
