import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config'

export const generateJWT = async (payload) => {
  return await jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 * 24 })
}

export const generateEmailJWT = async (payload) => {
  return await jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 })
}

export const verifyJWT = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    console.log(err)
  }
}
