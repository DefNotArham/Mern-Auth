import User from "../model/user.model.js";
import { sendVerificationSuccess } from "../mail/nodemailer.js";

const verifyEmailController = async (req, res) => {
  const { code } = req.body;
  try {
    if (!code)
      return res.status(400).json({
        success: false,
        message:
          "Please enter the verification code that was sent to your email",
      });

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Verification code is not valid or expired.",
      });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();
    await sendVerificationSuccess(user.email);

    res.status(200).json({
      success: true,
      message: "Verified successfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

export default verifyEmailController;
