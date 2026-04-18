const express = require("express");
const Router = express.Router();
const controller = require("../controllers/Voucher.controller");

Router.delete("/delete-voucher/:id",controller.deletevouchers);
Router.post("/create-voucher",controller.createVoucher);
Router.get("/get-voucher",controller.vouchers);

module.exports = Router;