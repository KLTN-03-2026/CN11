const express = require("express");
const router = express.Router();
const controller = require("../controllers/Bell.controller");

router.put("/update-bell/:id/:codebell",controller.updateBell);
router.delete("/delete-bell/:id",controller.deleteBells);
router.get("/get-bell/:id",controller.bells);
router.get("/get-bell-to-user/:id",controller.bellsToUser);
router.post("/create-bell",controller.createBell);
router.get("/get-bell-types",controller.belltypes);

module.exports = router;