// const nodemailer = require("nodemailer");

class MailService {
  // constructor() {
  //   this.transporter = nodemailer.createTransport({
  //     auth: {
  //       pass: process.env.SMTP_PASSWORD,
  //       user: process.env.SMTP_USER,
  //     },
  //     host: process.env.SMTP_HOST,
  //     port: process.env.SMTP_PORT,
  //     secure: false,
  //   })
  // }

  // async sendVerificationLink(to, verificationLink) {
  // await this.transporter.sendMail({
  //   from: process.env.SMTP_USER,
  //   subject: `Verify your account ${process.env.CLIENT_WEB_URL}`,
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
  //   text: '',
  //   to,
  // })
  // console.log("Email sent successfully");
  // }

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
      text: "",
      to,
    });
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
      text: "",
      to,
    });
  }
}

module.exports = new MailService();
