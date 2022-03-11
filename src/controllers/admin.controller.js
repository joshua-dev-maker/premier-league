//  Require dependencies
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sendMail } = require("../db/sendMail");

//  creating  Admin
const createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    // validating phoneNumber
    const phoneNumberExist = await Admin.findOne({ phoneNumber });
    if (phoneNumberExist) {
      return res.status(401).json({
        message: "phoneNumber exists, please login",
      });
    }
    // validating email
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(401).json({
        message: "Email exists, please login",
      });
    }
    // writing a condition to ensure password is solid
    if (password.length < 8)
    {return res.status(400).json({
      message: "password must be at least 8 characters"
    })}
    if (phoneNumber.length < 10 || phoneNumber.length >13) {
      return res.status(400).json({
        message: "phoneNumber invalid",
      });
    }
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res.status(400).json({
        message: "please fill in the required details",
      });
    }
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // create  a new Admin
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
    });

    let mailOptions = {
      to: newAdmin.email,
      subject: "Verify Mail",
      text: "pls verify your email address",
    };
    await sendMail(mailOptions);
    return res.status(201).json({
      message: "Admin  created",
      newAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//  login for Admin
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await Admin.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
        message: "Email does not exist, please create an account",
      });
    }
    let isPasswordExist = await bcrypt.compare(password, emailExist.password);
    if (!isPasswordExist) {
      return res.status(401).json({
        message: "incorrect password",
      });
    }

    const payload = {
      id: emailExist._id,
      email: emailExist.email,
      role: emailExist.role,
    };

    const token = await jwt.sign(payload, process.env.TOKEN, {
      expiresIn: "2h",
    });
    return res.status(200).json({
      success: true,
      message: "Admin login successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//   exporting modules
module.exports = { createAdmin, adminLogin };
