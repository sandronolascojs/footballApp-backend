export const responseHandler = (res, status, error, message, data) => {
  return res.status(status).json({
    status,
    error,
    message,
    data
  })
}
