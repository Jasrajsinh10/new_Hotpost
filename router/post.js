const express = require("express");

const postController = require("../controller/post");
const router = express.Router();

router.get("/postcreate", postController.getpostcreate);
router.get("/home", postController.gethome);

router.post("/postpostcreate", postController.postpostcreate);

router.get("/Myposts", postController.getMyposts);

router.post("/like/:_id", postController.postlike);


module.exports = router;