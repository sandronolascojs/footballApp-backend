import { comparePassword, hashPassword } from '../helpers/bcrypt.helpers'
import { generateEmailJWT, generateJWT } from '../helpers/jwt.helpers'
import { sendEmail } from '../helpers/sendEmail.helpers'
import { responseHandler } from '../middlewares/responseHandler.middlewares'
import User from '../models/users.models'
import { verifyEmailHtml } from '../utils/verify-email-html.utils'

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const searchUser = await User.findOne({ email })

    if (searchUser <= 0) {
      return responseHandler(res, 401, true, 'invalid credentials', null)
    }

    // Check if password is correct
    const checkPassword = await comparePassword(password, searchUser.password)

    if (!checkPassword) {
      return responseHandler(res, 401, true, 'invalid credentials', null)
    }

    // Generate JWT
    const payload = {
      id: searchUser._id,
      username: searchUser.username,
      email: searchUser.email
    }

    const token = await generateJWT(payload)

    // return response
    const data = {
      token,
      user: {
        id: searchUser._id,
        username: searchUser.username
      }
    }

    return responseHandler(res, 200, false, 'User logged in', data)
  } catch (err) {
    next(err)
  }
}

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password, country, ip, location: { latitude, longitude } } = req.body

    const searchUser = await User.find({ $or: [{ username, email }] })

    if (searchUser.length > 0) {
      return responseHandler(res, 409, true, 'User already exists', null)
    }

    const hashedPassword = await hashPassword(password)

    const userData = {
      email,
      username,
      password: hashedPassword,
      country,
      location: {
        latitude,
        longitude
      },
      ip
    }

    // Create user
    const newUser = await User(userData)

    await newUser.save()

    // Generate JWT
    const payload = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    }
    const token = await generateJWT(payload)
    const tokenEmail = await generateEmailJWT(payload)

    // Send email
    const generatedEmail = verifyEmailHtml(newUser.username, tokenEmail)

    await sendEmail(newUser.email, 'Verify your email', generatedEmail)

    // Send response
    const data = {
      token,
      user: {
        username: newUser.username,
        email: newUser.email
      }
    }
    return responseHandler(res, 201, false, 'User created', data)
  } catch (err) {
    next(err)
  }
}
