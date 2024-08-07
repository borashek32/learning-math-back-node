import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.SMTP_PASSWORD,
        user: process.env.SMTP_USER,
      },
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: false,
    });
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
          <h1>To create a new password for your account follow the link</h1>
          <a href="${passwordRecoveryLink}">${passwordRecoveryLink}</a>
        </div>
      `,
      text: "",
      to,
    });
  }
}

export default new MailService();
