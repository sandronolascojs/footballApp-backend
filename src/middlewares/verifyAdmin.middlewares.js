import User from '../models/users.models'
import { responseHandler } from './responseHandler.middlewares'

export const verifyAdmin = async (req, res, next) => {
  const { user } = req

  const foundUser = await User.findById(user.id)

  if (foundUser.role !== 'admin') {
    return responseHandler(res, 403, true, 'forbidden', null)
  }

  next()
}
