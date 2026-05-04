const express = require("express")
const { createPayment } = require("../controllers/Vnpay.controller")

const router = express.Router()

router.post("/create-payment", createPayment)




module.exports = router