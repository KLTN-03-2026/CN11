const express = require("express");
const Router = express.Router();
const controller = require("../controllers/Food.controller");

Router.delete("/delete-food/:id", controller.deleteFood);
Router.put("/update-food/:id", controller.updateFood);
Router.post("/create-food", controller.createFood);
Router.get("/get-foods", controller.getFoods);

module.exports = Router;