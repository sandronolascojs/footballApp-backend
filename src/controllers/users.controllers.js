import { responseHandler } from '../middlewares/responseHandler.middlewares'
import User from '../models/users.models'
import { comparePassword, hashPassword } from '../helpers/bcrypt.helpers'
import { generateEmailJWT, generateJWT } from '../helpers/jwt.helpers'
import { verifyEmailHtml } from '../utils/verify-email-html.utils'
import { sendEmail } from '../helpers/sendEmail.helpers'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    if (users.length <= 0) {
      return responseHandler(res, 404, true, 'No users found', null)
    }
    return responseHandler(res, 200, false, 'Users found', users)
  } catch (err) {
    next(err)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const searchUser = await User.findbyId(id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0
    })

    if (!searchUser) {
      return responseHandler(res, 404, true, 'User not found', null)
    }

    return responseHandler(res, 200, false, 'User found', searchUser)
  } catch (err) {
    next(err)
  }
}

export const createUser = async (req, res, next) => {
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

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { username, email, password, newPassword, country } = req.body
    const { user } = req

    const searchUser = await User.findById(id)

    if (searchUser.length < 0) {
      return responseHandler(res, 404, true, 'User not found', null)
    }

    if (user.id !== searchUser._id.toString()) {
      return responseHandler(res, 401, true, 'Unauthorized', null)
    }

    if (newPassword) {
      const verifyPassword = await comparePassword(
        password,
        searchUser.password
      )

      if (!verifyPassword) {
        return responseHandler(res, 401, true, 'password does not match', null)
      }

      const hashedPassword = await hashPassword(newPassword)

      const newUserData = {
        ...searchUser,
        password: hashedPassword
      }
      await User.findByIdAndUpdate(id, newUserData, { new: true })

      return responseHandler(res, 200, false, 'User updated', null)
    }

    const newUserData = {
      ...searchUser,
      username,
      email,
      country
    }

    await User.findByIdAndUpdate(id, newUserData, { new: true })
    return responseHandler(res, 200, false, 'User updated', null)
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const searchUser = await User.findById(id)

    if (searchUser.length <= 0) {
      return responseHandler(res, 404, true, 'User not found', null)
    }

    const { user } = req

    if (user.id !== searchUser._id.toString()) {
      return responseHandler(res, 401, true, 'Unauthorized', null)
    }

    await User.findByIdAndDelete(id)

    return responseHandler(res, 200, false, 'User deleted', null)
  } catch (err) {
    next(err)
  }
}
