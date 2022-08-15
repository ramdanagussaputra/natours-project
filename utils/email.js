const nodemailer = require('nodemailer');
const htmltotext = require('html-to-text');
const pug = require('pug');
const path = require('path');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = `Ramdan <ramdanaguss@gmail.com>`;
    this.url = url;
    this.firstname = user.name.split(' ')[0];
  }

  _newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, `../views/email/${template}.pug`),
      {
        firstname: this.firstname,
        url: this.url,
        subject,
      }
    );

    const message = {
      to: this.to,
      from: this.from,
      url: this.url,
      html,
      subject,
      text: htmltotext.convert(html),
    };

    await this._newTransport().sendMail(message);
  }

  async sendWelcome() {
    await this._send('welcome', 'Welcome to the Natours Family');
  }

  async sendPasswordReset() {
    await this._send(
      'passwordReset',
      'Reset password token (Valid for 10 minutes)'
    );
  }
};

// const sendEmail = async (emailOption) => {
//   // CREATE TRANSPORT
//   const transport = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   // CREATE EMAIL
//   const message = {
//     from: 'Ramdan <ramdanaguss@gmail.com>',
//     to: emailOption.email,
//     subject: emailOption.subject,
//     text: emailOption.message,
//   };

//   // SEND EMAIL
//   await transport.sendMail(message);
// };

// module.exp orts = sendEmail;
