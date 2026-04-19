const express = require("express");
const Router = express.Router();
const controller = require("../controllers/Log.controller");

Router.get("/floors-table/:id/:codehour",controller.getFloorsTable);
Router.get("/floors-table/:id",controller.getFloorsTableData);
Router.get("/logs",controller.getLogs);
Router.get("/hours",controller.getHours);
Router.get("/floors",controller.getFloors);

module.exports = Router;