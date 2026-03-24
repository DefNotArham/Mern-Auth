import express from "express";
import signupController from "../controllers/signup.controller.js";
import loginController from "../controllers/login.controller.js";
import verifyEmailController from "../controllers/verifyEmail.controller.js";
import logoutController from "../controllers/logout.controller.js";
import forgotPasswordController from "../controllers/forgotPassword.controller.js";
import resetPasswordController from "../controllers/resetPassword.controller.js";
import checkAuthController from "../controllers/checkAuth.controller.js";
import checkAuth from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/verify-email", verifyEmailController);
router.post("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
router.get("/check-auth", checkAuth, checkAuthController);

export default router;
