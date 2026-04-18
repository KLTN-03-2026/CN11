const express = require("express");
const controller = require("../controllers/Condition.controller");
const router = express.Router();

router.delete("/delete-condition/:id",controller.deleteCondition);
router.post("/create-condition",controller.createCondition);
router.get("/get-condition",controller.conditions);

module.exports = router;