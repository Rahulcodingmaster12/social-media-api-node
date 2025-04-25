
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { OtpRepository } from './otp.repository.js';
import UserRepository from '../user/user.repository.js';
import dotenv from 'dotenv';
dotenv.config();
// configure nodemailer
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

// GENERATE 6 DIGIT OTP
const generateOtp = ()=> crypto.randomInt(100000, 999999).toString();

export class OtpController{

   // 📌 1️⃣ **Send OTP for Password Reset**
async sendOtp(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).send({ message: "Email is required" });

  const user = await UserRepository.findByEmail(email);
  if (!user) return res.status(404).send({ message: "User not found" });

  const otp = generateOtp();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await OtpRepository.saveOtp(email, otp);
    res.send({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error sending OTP", error });
  }
};
 
// 📌 2️⃣ **Verify OTP**
 async verifyOtp(req, res) {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).send({ message: "Email and OTP are required" });
  
    const storedOTP = await OtpRepository.getOtp(email);
    if (!storedOTP) return res.status(400).send({ message: "OTP expired or not found" });
  
    if (storedOTP.otp === otp) {
      await OtpRepository.deleteOtp(email);
      res.send({ message: "OTP verified successfully" });
    } else {
      res.status(400).send({ message: "Invalid OTP" });
    }
  };
  
  // 📌 3️⃣ **Reset Password**
async resetPassword(req, res) {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return res.status(400).send({ message: "Email and new password are required" });
  
    const user = await UserRepository.findByEmail(email);
    if (!user) return res.status(404).send({ message: "User not found" });
  
    await UserRepository.updatePassword(email, newPassword);
    res.send({ message: "Password updated successfully" });
  };
}