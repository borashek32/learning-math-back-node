const nodemailer = require('nodemailer')
const resend = require('resend')

const Resend = require('resend').Resend

class MailService {
  constructor() {
    this.resendInstance = new Resend({
      host: process.env.RESEND_HOST,
      port: process.env.RESEND_PORT,
      username: process.env.RESEND_USERNAME,
      password: process.env.RESEND_PASSWORD
    })
    // this.resendInstance = new Resend(process.env.RESEND_API_KEY)
    // this.resendInstance = new Resend('re_bdh6T6p8_AfvzpHUBo3458gJu3qVEgerM')
    // this.transporter = nodemailer.createTransport({
    //   auth: {
    //     pass: process.env.SMTP_PASSWORD,
    //     user: process.env.SMTP_USER,
    //   },
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: false,
    // })
  }

  async sendVerificationLink(to, verificationLink) {
    try {
      await this.resendInstance.emails.send({
        from: 'onboarding@resend.dev',
        // to: to,
        to: 'baranova.natalia.frontend@gmail.com',
        subject: 'Verify your account on free-math-trainer.com',
        html: `
          <div>
            <p>
              You successfully registered on 
              <a href="#">Free-math-trainer.com</a>
            </p>
            <p>For verification of your account follow the link</p>
            <a href="${verificationLink}">
              <button>Verify your account and login</button>
            </a>
          </div>
        `,
      });
  
    // try {
    //   await this.resendInstance.emails.send({
    //     from: 'mail@free-math-trainer.com',
    //     to: 'baranova.natalia.frontend@gmail.com',
    //     subject: `Verify your account on free-math-trainer.com`,
      //   html: `
      //     <div>
      //       <p>
      //         You successfully registered on 
      //         <a href="#">Learn-math.com</a>
      //       </p>
      //       <p>For verification of your account follow the link</p>
      //       <a href="${verificationLink}">
      //         <button>Verify your account and login</button>
      //       </a>
      //     </div>
      //   `,
      // });
    //   console.log('Email sent successfully')
    } catch (error) {
      console.error('Error sending email:', error)
    }
    // await this.transporter.sendMail({
    //   from: process.env.SMTP_USER,
    //   subject: `Verify your account ${process.env.CLIENT_MOBILE_URL}`,
      // html: `
      //   <div>
      //     <p>
      //       You successfully registered on 
      //       <a href="#">Learn-math.com</a>
      //     </p>
      //     <p>For verification of your account follow the link</p>
      //     <a href="${verificationLink}">
      //       <button>Verify your account and login</button>
      //     </a>
      //   </div>
      // `,
    //   text: '',
    //   to,
    // })
  }

  async sendConfirmationLetter(to, user) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      subject: `Your new account on Learn-math.com`,
      html: `
        <div>
          <p>
            You successfully registered on 
            <a href="#">Learn-math.com</a>
          </p>
          <p>User email: ${user.email}</p>
        </div>
      `,
      text: '',
      to,
    })
  }

  async sendPasswordRecoveryLink(to, passwordRecoveryLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      subject: `Follow the link to create new password on Learn-math.com`,
      html: `
        <div>
          <h1>To create new password of your account follow the link</h1>
          <a href="${passwordRecoveryLink}">${passwordRecoveryLink}</a>
        </div>
      `,
      text: '',
      to,
    })
  }
}

module.exports = new MailService()
