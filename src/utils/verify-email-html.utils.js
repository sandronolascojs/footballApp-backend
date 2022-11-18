import { NODE_ENV, CLIENT_URI } from '../config/config'

export const verifyEmailHtml = (username, token) => {
  return `
        <h1>Hi ${username}!</h1>
        <p>Thank you for registering to Football App.</p>
        <p>Please verify your email by clicking on the following link:</p>
        <a href="${NODE_ENV === 'development' ? CLIENT_URI.development : CLIENT_URI.production}/verify?token=${token}">Verify email</a>
    `
}
