import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
export const register = async (req, res) => {
  const { name, email, password ,otp} = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "mising Details" });
  }
  try {
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.json({ success: false, message: "user already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel({ name, email, password: hashedPassword });
    await user.save();
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prodection",
      sameSite: process.env.NODE_ENV === "prodection" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // send Email
    const mailOption = {
      from: process.env.SENDER_EMAIl,
      to: email,
      subject: "Welcome To loginPortal",
      text: `Welcome To loginPortal website.your account has been created with email id:${email}`,
    };
    await transporter.sendMail(mailOption);
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "email and password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "invalid your email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid password " });
    }
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prodection",
      sameSite: process.env.NODE_ENV === "prodection" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({
      error: error.message ? error.message : message,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prodection",
      sameSite: process.env.NODE_ENV === "prodection" ? "none" : "strict",
    });
    return res.json({ success: true, message: "logout success" });
  } catch (error) {
    return res.json({ success: false, messageg: error.message });
  }
};
export const sendVerifyOtp=async (req,res)=>{
  try { 
    const {userId}=req.body ;
    const user = await userModel.findById(userId);
    if(user.isAccountVerified){
      return res.json({ success: false, message: 'Account Alreeady Verified' });
    }
  const otp=String(Math.floor(10000+Math.random()*900000))
  user.verifyOtp=otp;
  user.verifyOtpExpireAt=Date.now()+24*60*60*1000;
  await user.save()
  const mailOption = {
    from: process.env.SENDER_EMAIl,
    to: user.email,
    subject: "Account Verification Otp",
    text: `Your Otp is ${otp}.varify Your Account Using This Otp`,
  };
  await transporter.sendMail(mailOption)
  return res.json({success:true, message:"Verifycation Otp Send Your Email"})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const verifyEmail= async (req,res)=>{
  const {userId,otp}=req.body  ||{}
  if(!userId || !otp){
    return res.json({success:false, message:"Missing This Details"})
  }
  try {
    const user = await userModel.findById(userId);
    if(!user){
      return res.json({success:false, message:"user Not Found"})
    }
    if(user.verifyOtp===''|| user.verifyOtp!==otp){
      return res.json({success:false, message:"Invalid Otp"})
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success:false, message:"otp Expired "})
    }
    user.isAccountVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0;
    await user.save();
    return res.json({success:true, message:"Email Verify Successfully "})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
export  const isAuthenticated=async (req,res)=>{
  try {   

    return res.json({ success: true, });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
// send Reset Otp
export const sendResetOtp=async (req,res)=>{
  const {email}=req.body
  if(!email){
    return res.json({ success: false,message:"Email is required" });
  }
  try {
    const user=await userModel.findOne({email})
    if(!user){
      return res.json({ success: false,message:"User Not Found" });
    }
    const otp=String(Math.floor(10000+Math.random()*900000))
  user.resetOtp=otp;
  user.resetOtpExpireAt=Date.now()+15*60*1000;

  await user.save()
  const mailOption = {
    from: process.env.SENDER_EMAIl,
    to: user.email,
    subject: "Password Reset Otp",
    text: `Your Otp for reseting  is ${otp}.Use this Otp`,
  };
  await transporter.sendMail(mailOption)
  return res.json({ success: true, message:"otp send Your  Email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
// reset user password
export const resetPassword=async(req,res)=>{
const {email,otp,newPassword}=req.body;
if(!email || !otp || !newPassword){
  return res.json({ success: true,message:"Email ,Otp And newPassword required" });
}
try {
  const user=await userModel.findOne({email})
  if(!user){
    return res.json({ success: false,message:"User Not Found" });
  }
  if(user.resetOtp==='' || user.resetOtp !=otp){
    return res.json({ success: false,message:"invalid otp" });
  }
  if(user.resetOtpExpireAt<Date.now()){
    return res.json({ success: false, message:" otp Expired" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password=hashedPassword;
  user.resetOtp='';
  user.resetOtpExpireAt=0;
  await user.save()
  return res.json({ success: false,message:"password has been reset Successfully",data:user });
} catch (error) {
  return res.json({ success: false, message: error.message });
}
}