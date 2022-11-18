import { verifyJWT } from '../helpers/jwt.helpers'
import { responseHandler } from './responseHandler.middlewares'

export const checkToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    const decoded = await verifyJWT(token)

    console.log(token)

    if (!decoded) {
      return responseHandler(res, 401, true, 'Unauthorized', null)
    }

    req.user = decoded

    next()
  } catch (err) {
    next(err)
  }
}
