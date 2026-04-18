const express = require("express");
const controller = require("../controllers/Bank.controller");
const router = express.Router();

router.put("/put-bank/:id",controller.updateBanks);
router.post("/create-bank",controller.createBank);
router.get("/get-bank-revue-chart",controller.getBanksRevueChart);
router.get("/get-bank",controller.getBanks);

module.exports = router;