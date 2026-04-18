const express = require("express");
const Router = express.Router();
const controller = require("../controllers/Email.controller");

Router.post("/sendEmailMessage/:id", controller.sendEmailMessage)
Router.post("/sendOtp-ResetPassword", controller.sendOTPResetPass)
Router.post("/verify-email", controller.sendVerifyEmail)
Router.post("/sendEmailOrder", controller.sendEmailOrder)
Router.post("/sendEmailRecieve", controller.sendEmailRecieve)
Router.post("/sendOtpEmail", controller.sendOTPEmail)

module.exports = Router;