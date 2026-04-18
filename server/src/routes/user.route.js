const express = require("express");
const Router = express.Router();
const controller = require("../controllers/User.controller");

Router.put("/accept-email/:id", controller.updateVerify);
Router.put("/update-account/:id", controller.updateAccount);
Router.put("/upload-avatar/:id", controller.updateAvatar);
Router.put("/set-role/:id", controller.setRole);
Router.delete("/delete-contact/:id", controller.deleteContact);
Router.delete("/deletes-contact", controller.deletesContact);
Router.post("/add-contact", controller.addContact);
Router.get("/gets-contact", controller.getsContact);
Router.get("/users", controller.getUsers);

module.exports = Router;