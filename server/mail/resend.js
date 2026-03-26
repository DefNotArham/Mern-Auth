// resendMailer.js
import { Resend } from "resend";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  ACCOUNT_VERIFIED_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

const resend = new Resend(process.env.RESEND_API_KEY); // your Resend API key
const SENDER = "onboarding@resend.dev"; // must be verified domain in Resend
const CLIENT_URL = process.env.CLIENT_URL; // e.g., "https://yourfrontend.onrender.com"

// Generic send mail function
async function sendMail({ to, subject, html }) {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}:`, response);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
}

// Send verification code email
export async function sendVerificationCode(token, email) {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    `${token}`,
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
export async function sendForgotPassword(email, resetUrl) {
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
