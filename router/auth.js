const express = require("express");
const { body } = require("express-validator");
const authController = require("../controller/auth");
const router = express.Router();

router.get("/login", authController.getlogin);

router.get("/signup", authController.getsignup);

router.post("/signup",[body('name').isLength({min:3})] ,authController.postsignup);

router.post("/login", authController.postlogin);

router.get("/logout", authController.logout);
module.exports = router;