const nodemailer = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.SMTP_PASSWORD,
        user: process.env.SMTP_USER,
      },
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
    })
  }

  async sendVerificationLink(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      html: `
        <div>
          <h1>For verification of your account follow the link</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
      subject: `Verify your account ${process.env.CLIENT_URL}`,
      text: '',
      to,
    })
  }
}

module.exports = new MailService()
