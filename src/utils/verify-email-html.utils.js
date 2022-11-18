export const verifyEmailHtml = (username, token) => {
  return `
        <h1>Hi ${username}!</h1>
        <p>Thank you for registering to Football App.</p>
        <p>Please verify your email by clicking on the following link:</p>
        <a href="http://localhost:4000/api/v1/account/verify?token=${token}">Verify email</a>
    `
}
