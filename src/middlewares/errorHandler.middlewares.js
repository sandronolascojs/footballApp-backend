import { NODE_ENV } from '../config/config'

export const errorHandler = (error, req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(error)
    return res.status(500).json({
      name: error.name,
      status: 500,
      message: error.message,
      stack: error.stack
    })
  } else if (NODE_ENV === 'production') {
    next(error)
  }
}
