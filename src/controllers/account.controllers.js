import { verifyJWT } from '../helpers/jwt.helpers'
import { responseHandler } from '../middlewares/responseHandler.middlewares'
import User from '../models/users.models'

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query
    const decoded = await verifyJWT(token)

    if (!decoded) {
      return responseHandler(res, 401, true, 'Token invalid or expired', null)
    }
    const user = decoded

    const verifyUser = await User.findByIdAndUpdate(user.id, { isVerified: true })
    if (!verifyUser) {
      return responseHandler(res, 404, true, 'User not found', null)
    }

    return responseHandler(res, 200, false, 'User verified', null)
  } catch (err) {
    next(err)
  }
}
