import { NODE_ENV } from '../config/config'

export const errorHandler = (error, req, res, next) => {
  if (NODE_ENV === 'development') {
    return null
  } else if (NODE_ENV === 'production') {
    next(error)
  }
}
