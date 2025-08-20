import Mailgen from "mailgen";
import nodemailer from "nodemailer";

// ✅ Send Email function
const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  // ⚡️ yahan pe generateHTML hona chahiye tha, tumne dono jagah generatePlaintext likh diya tha
  const emailHTML = mailGenerator.generate(options.mailgenContent);
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // ✅ Mailtrap transporter config
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT, // typo tha tumhare code me POST likha tha
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject, // typo tha: tumne sebject likha tha
    text: emailTextual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error(
      "❌ Email service failed. Make sure that you have provided your MAILTRAP credentials in the .env file"
    );
    console.error("Error:", error);
  }
};

// ✅ Email verification template
const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! We are excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro: "Need help? Just reply to this email, we’d love to help.",
    },
  };
};

// ✅ Forgot password template
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "You requested to reset the password of your account.",
      action: {
        instructions: "To reset your password, click the button below:",
        button: {
          color: "#22BC66",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro: "If you didn’t request this, you can safely ignore this email.",
    },
  };
};

export { sendEmail, emailVerificationMailgenContent, forgotPasswordMailgenContent };
