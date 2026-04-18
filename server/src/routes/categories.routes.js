const express = require("express");
const router = express.Router();
const controller = require("../controllers/Categories.controller");

router.delete("/delete-categories/:id", controller.deleteCategories);
router.get("/get-categories", controller.getCategories);
router.post("/create-categories", controller.createCategories);

module.exports = router;