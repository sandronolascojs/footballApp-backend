import nodeMailer from 'nodemailer'
import { NODEMAILER } from '../config/config'

export const sendEmail = async (email, subject, html) => {
  const transporter = nodeMailer.createTransport({
    host: NODEMAILER.host,
    port: NODEMAILER.port,
    secure: true,
    auth: {
      user: NODEMAILER.username,
      pass: NODEMAILER.password
    }
  })

  await transporter.sendMail({
    from: `"Football App Bizztrato" <${NODEMAILER.username}>`,
    to: email,
    subject,
    html
  })
}
