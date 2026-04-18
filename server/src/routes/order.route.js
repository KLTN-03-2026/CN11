const express = require("express");
const Router = express.Router();
const controller = require("../controllers/Order.controller");

Router.put("/update-order-table-status/:id/:codehour/:codefloor",controller.updateOrdersTableHour);
Router.put("/update-order-table/:id",controller.updateOrderTable);
Router.delete("/delete-order-table/:id",controller.deleteOrderTable);
Router.get("/order-table-hour/:id",controller.getOrdersTableHour);
Router.post("/create-order",controller.createOrder);
Router.post("/create-order-table",controller.createOrderTable);
Router.get("/get-order-table",controller.getOrdersTable);
Router.get("/get-orders",controller.getOrders);


module.exports = Router;