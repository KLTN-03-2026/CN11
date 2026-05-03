const express = require("express");
const controller = require("../controllers/Cook.controller");
const router = express.Router();

router.put("/update-cooks-status",controller.updateFoodStatus);
router.get("/cooks",controller.cooks);

module.exports = router;