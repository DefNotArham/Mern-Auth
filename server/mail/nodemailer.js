import nodemailer from "nodemailer";

import {
  VERIFICATION_EMAIL_TEMPLATE,
  ACCOUNT_VERIFIED_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

const SENDER = process.env.SENDER;
const APP_PASSWORD = process.env.APP_PASSWORD;

export async function sendVerificationCode(verificationToken, email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: SENDER,
        pass: APP_PASSWORD,
      },
    });

    const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken,
    );

    const info = await transporter.sendMail({
      from: {
        name: "Arham",
        address: SENDER,
      },
      to: email,
      subject: "Verify your account",
      html: htmlContent,
    });
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.log(`Error senidng email: ${error}`);
  }
}

export async function sendVerificationSuccess(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: SENDER,
        pass: APP_PASSWORD,
      },
    });

    const htmlContent = ACCOUNT_VERIFIED_TEMPLATE;

    const info = await transporter.sendMail({
      from: {
        name: "Arham",
        address: SENDER,
      },
      to: email,
      subject: "Verification successfull",
      html: htmlContent,
    });
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.log(`Error senidng email: ${error}`);
  }
}

export async function sendForgotPassword(email, resetUrl) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: SENDER,
        pass: APP_PASSWORD,
      },
    });

    const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetUrl,
    );

    const info = await transporter.sendMail({
      from: {
        name: "Arham",
        address: SENDER,
      },
      to: email,
      subject: "Reset your password",
      html: htmlContent,
    });
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.log(`Error senidng email: ${error}`);
  }
}

export async function sendResetPasswordSuccess(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: SENDER,
        pass: APP_PASSWORD,
      },
    });

    const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;

    const info = await transporter.sendMail({
      from: {
        name: "Arham",
        address: SENDER,
      },
      to: email,
      subject: "Password reseted successfully",
      html: htmlContent,
    });
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.log(`Error senidng email: ${error}`);
  }
}
