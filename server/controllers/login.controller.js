import bcrypt from "bcryptjs";
import generateCookieAndToken from "../utils/generateCookieAndToken.js";
import User from "../model/user.model.js";
import checkEmailFormat from "../utils/checkEmailFormat.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!checkEmailFormat(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    const matchingPassword = await bcrypt.compare(password, user.password);

    if (!matchingPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateCookieAndToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default loginController;
