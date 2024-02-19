const express = require("express");

const authController = require("../controller/auth");
const router = express.Router();

router.get("/login", authController.getlogin);

router.get("/signup", authController.getsignup);

router.post("/signup", authController.postsignup);

router.post("/login", authController.postlogin);

module.exports = router;