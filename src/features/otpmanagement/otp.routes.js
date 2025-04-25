

import express from 'express';
// const { sendOTP, verifyOTP, resetPassword } = require("../controllers/authController");
import { OtpController } from './otp.controller.js';
const otpcontroller = new OtpController();
const otpRouter = express.Router();

otpRouter.post("/send", otpcontroller.sendOtp);
otpRouter.post("/verify", otpcontroller.verifyOtp);
otpRouter.post("/reset-password", otpcontroller.resetPassword);

export default otpRouter;