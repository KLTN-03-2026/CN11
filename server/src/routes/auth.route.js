const express = require("express")
const controller = require("../controllers/Auth.controller");
const { verify } = require("../helpers/verify");

const router = express.Router()

router.get("/get-user-to-role/:rolecode", controller.getUserToRoleCode);
// router.post("/create-user-recieve-bell/:codeuser", controller.createUserRecieveBell);
router.get("/get-user", verify, controller.getUser);
router.get("/get-role", controller.getRoles);
router.put("/update-pass", controller.updatePass);
router.put("/update-email", controller.updateEmail);
router.put("/update-avatar", controller.updateAvatar);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/get-note-waiters", controller.getNoteWaiters);
router.post("/create-note-waiter", controller.createNoteWaiters);

module.exports = router