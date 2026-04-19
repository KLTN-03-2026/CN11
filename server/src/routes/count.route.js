const express = require("express")
const controller = require("../controllers/Count.controller");
const router = express.Router();

router.get("/order-today",controller.orderTodayCount);
router.get("/accounts",controller.accounts);
router.get("/table-blank",controller.tableBlankCount);
router.get("/foods",controller.foodsCount);
router.get("/role-no-verify",controller.getRolesNoVerify);
router.get("/accounts-staff",controller.accountsStaff);
router.get("/accounts-chef",controller.accountsChef);
router.get("/accounts-customer",controller.accountsCustomer);

module.exports = router;