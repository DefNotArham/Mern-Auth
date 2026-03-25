// nodemailer.js
import nodemailer from "nodemailer";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  ACCOUNT_VERIFIED_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

// Load environment variables
const SENDER = process.env.SENDER;
const APP_PASSWORD = process.env.APP_PASSWORD;
const CLIENT_URL = process.env.CLIENT_URL; // e.g., "https://yourfrontend.onrender.com"

// Create a single transporter to reuse
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: SENDER,
    pass: APP_PASSWORD,
  },
});

// Generic send mail function
async function sendMail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: { name: "Arham", address: SENDER },
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
}

// Send verification code email
export async function sendVerificationCode(token, email) {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    `${CLIENT_URL}/verify-email/${token}`,
  );
  await sendMail({ to: email, subject: "Verify your account", html });
}

// Send account verified success email
export async function sendVerificationSuccess(email) {
  await sendMail({
    to: email,
    subject: "Account verified successfully",
    html: ACCOUNT_VERIFIED_TEMPLATE,
  });
}

// Send forgot password email
export async function sendForgotPassword(email, token) {
  const resetUrl = `${CLIENT_URL}/reset-password/${token}`;
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl);
  await sendMail({ to: email, subject: "Reset your password", html });
}

// Send password reset success email
export async function sendResetPasswordSuccess(email) {
  await sendMail({
    to: email,
    subject: "Password reset successfully",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  });
}
