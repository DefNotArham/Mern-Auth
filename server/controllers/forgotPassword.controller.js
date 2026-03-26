import User from "../model/user.model.js";
import crypto from "crypto";
import { sendForgotPassword } from "../mail/resend.js";
import checkEmailFormat from "../utils/checkEmailFormat.js";

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!checkEmailFormat(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

    await user.save();
    await sendForgotPassword(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`,
    );

    res.status(200).json({
      success: true,
      message: "Check your email to reset your password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default forgotPasswordController;
