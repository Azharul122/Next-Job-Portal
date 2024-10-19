import nodemailer from "nodemailer";
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN!;

const client = new MailtrapClient({ token: TOKEN });

const sender = {
  email: "azharulip@gmail.com",
  name: "Fs Niraj",
};

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_TEST_USER,
    pass: process.env.MAILTRAP_TEST_PASS,
  },
});

type Options = { to: string; name: string; link: string };
const sendVerificationMail = async (options: Options) => {
  if (process.env.NODE_ENV === "development") {
    await transport.sendMail({
      to: options.to,
      from: process.env.VERIFICATION_MAIL,
      subject: "Welcome Email",
      html: `<div>
              <p>Please click on <a href="${options.link}">this link</a></p>
          </div>`,
    });
  } else {
    const recipients = [
      {
        email: options.to,
      },
    ];

    client
      .send({
        from: sender,
        to: recipients,
        subject: "Welcome Email",
        html: `<div>
              <p>Please click on <a href="${options.link}">this link</a></p>
          </div>`,
        category: "Integration Test",
      })
      .then(console.log, console.error);
  }
};

const sendPassResetMail = async (options: Options) => {
  await transport.sendMail({
    to: options.to,
    from: process.env.VERIFICATION_MAIL,
    subject: "Update Password Request",
    html: `<div>
            <p>Please click on <a href="${options.link}">this link</a> to update your password.</p>
        </div>`,
  });
};

const mail = {
  sendVerificationMail,
  sendPassResetMail,
};

export default mail;
